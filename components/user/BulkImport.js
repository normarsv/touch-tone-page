import { FileOutlined, InboxOutlined } from '@ant-design/icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, message, Row, Space, Table, Tooltip } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { useRouter } from 'next/dist/client/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import API from '../../API/API';
import ContentInnerHeader from '../misc/ContentInnerHeader';

const key = 'updatable';

const BulkImport = ({ user }) => {
  const [resBulkList, setResBulkList] = useState();
  const [renderList, setRenderList] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [rawCsv, setRawCsv] = useState();
  const [fileInfo, setFileInfo] = useState({});
  const windowDimension = useWindowDimensions();
  const router = useRouter();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: windowDimension.width < 900 ? "none" :"left",
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '25%',
    },
    {
      title: 'Organization',
      dataIndex: 'org',
      width: '25%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '10%',
    },
  ];

  const api = new API(user.token, user.userId);

  const props = {
    name: 'file',
    multiple: false,
    async onChange(info) {
      console.log(info);
      const { status } = info.file;
      console.log(status);
      if (status === 'done') {
        var formDataUpload = new FormData();
        formDataUpload.append('file', info.file.originFileObj);

        const apiResBulkUpload = await api.doVerifyUserBulkImport(
          formDataUpload
        );
        console.log(apiResBulkUpload);
        if (apiResBulkUpload.message !== undefined) {
          message.error(apiResBulkUpload.message);
        } else if (apiResBulkUpload.length === 0) {
          message.error(`Did not found users in ${info.file.name} `);
        } else {
          setFileInfo(info.file);
          setRawCsv(info.file.originFileObj);
          const finalUserList = [];
          for (let i = 0; i < apiResBulkUpload.length; i++) {
            const currentUser = apiResBulkUpload[i];
            finalUserList.push({
              name: currentUser.first_name + ' ' + currentUser.last_name,
              email: currentUser.email,
              org: currentUser.organizationName,
              role: 'End User',
            });
          }
          setResBulkList(finalUserList);
          console.log(apiResBulkUpload);
          message.success(`${info.file.name} file uploaded successfully.`);
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  function revertImport() {
    setResBulkList(undefined);
    setRenderList(false);
    setFileInfo({});
  }

  async function uploadCsv() {
    message.loading({ content: 'Loading...', key });
    var formDataUpload = new FormData();
    formDataUpload.append('file', rawCsv);

    const apiUploadFinalList = await api.doUploadUserBulkImport(formDataUpload);
    console.log(apiUploadFinalList);
    if (apiUploadFinalList.message !== undefined) {
      message.error({
        content: apiUploadFinalList.message,
        key,
        duration: 5,
      });
    } else {
      message.success({
        content: 'Csv uploaded correctly, Redirecting to User List...',
        key,
        duration: 2,
      });
      router.replace('/list-users');
    }
  }

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  const tooltipDraggerText = (
    <p>Drag or Upload a correctly formated CSV file on the dragger field</p>
  );
  const renderedListTest = (
    <p>Verify the content of the CSV displayed on the table</p>
  );

  return (
    <div>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        <ContentInnerHeader setBackOption />
        <Row>
          <h1 className='title-style'>Bulk Import</h1>
        </Row>
        <Row type='flex' justify='space-between'>
          <div />
          <Tooltip
            placement='left'
            title={!renderList ? tooltipDraggerText : renderedListTest}
          >
            <h2 className='title-style'>
              Help <FontAwesomeIcon icon={faQuestionCircle} />
            </h2>
          </Tooltip>
        </Row>

        {!renderList ? (
          //Render file uploader
          <>
            <Row type='flex' justify='center'>
              <Dragger
                style={{ width: '100%' }}
                showUploadList={false}
                {...props}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess('ok');
                  }, 0);
                }}
              >
                <Space
                  size='middle'
                  direction='vertical'
                  style={{ width: '80%' }}
                >
                  <p className='ant-upload-drag-icon'>
                    {fileInfo.name ? (
                      <Space className='flex center'>
                        <FileOutlined /> <h1>{fileInfo.name}</h1>
                      </Space>
                    ) : (
                      <InboxOutlined />
                    )}
                  </p>
                  <p className='ant-upload-text'>
                    Click or drag file to this area to{' '}
                    {fileInfo.name
                      ? 'replace the actual file'
                      : 'upload a csv file'}
                  </p>
                  <p className='ant-upload-hint'>
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Space>
              </Dragger>
            </Row>
            <Row type='flex' justify='center'>
              <h3>
                Download Example CSV{' '}
                <a href={'/Test-CSV.csv'} className='title-style'>
                  here
                </a>
              </h3>
            </Row>
            <Row type='flex' justify='center'>
              <Button
                disabled={!resBulkList}
                type='primary'
                className='primary-button-style'
                onClick={() => setRenderList(true)}
              >
                Continue{' '}
              </Button>
            </Row>{' '}
          </>
        ) : (
          //Render bulk table
          <>
            {console.log(rawCsv, 'rawcsv')}
            <Row type='flex' justify='end'>
              <div>
                <Space direction='horizontal'>
                  <Button
                    className='primary-button-style cancel'
                    onClick={() => revertImport()}
                  >
                    Revert
                  </Button>
                  <Button
                    onClick={() => uploadCsv()}
                    type='primary'
                    className='primary-button-style'
                  >
                    Confirm
                  </Button>
                </Space>
              </div>
            </Row>
            <Table
              // rowSelection={rowSelection}
              bordered
              scroll={{ x: 1000 }}
              columns={columns}
              dataSource={resBulkList}
            />
          </>
        )}
      </Space>
    </div>
  );
};

BulkImport.propTypes = {
  someData: PropTypes.string,
};

export default BulkImport;
