import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, message, Popconfirm, Row, Select, Space, Table } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import API from '../../API/API';
import ContentInnerHeader from '../misc/ContentInnerHeader';

const { Option } = Select;

const Meetings = ({ meetingsContent, user, getMeetingsContent }) => {
  const [loadingTable, setLoadingTable] = useState(false);
  const deleteMeetings = async (meetingID) => {
    setLoadingTable(true);
    const api = new API(user.token);
    const resMeetings = await api.DELETE('/Meetings/' + meetingID);
    message.success('Meeting deleted successfully!');
    getMeetingsContent();
  };

  useEffect(() => {
    setLoadingTable(false);
  }, [meetingsContent]);
  const router = useRouter();

  const hoverAnimation = {
    scale: 1.02,
    cursor: 'pointer',
    color: 'red',
    transition: { duration: 0.5 },
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: '',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (action, row) => {
        return (
          <Space className='flex center'>
            <Popconfirm
              title={
                <div>
                  <h4>URL</h4>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <label style={{ fontWeight: 'normal' }}>{row.url}</label>
                  </div>
                </div>
              }
              onConfirm={() => {
                const el = document.createElement('textarea');
                el.value = row.url;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                message.success('URL Copied!');
              }}
              okText='COPY'
              cancelText='OK'
            >
              <motion.div whileHover={hoverAnimation}>URL</motion.div>
            </Popconfirm>
            |
            <Popconfirm
              title={
                <div>
                  <h4>DDI</h4>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <label style={{ fontWeight: 'bold' }}>
                      {'EXT: '}
                      <label style={{ fontWeight: 'normal' }}>
                        {row.ddi.extension}
                      </label>
                    </label>
                    <label style={{ fontWeight: 'bold' }}>
                      {'PIN: '}
                      <label style={{ fontWeight: 'normal' }}>
                        {row.ddi.pin}
                      </label>
                    </label>
                  </div>
                </div>
              }
              okText='OK'
              cancelText=' '
              cancelButtonProps={{
                style: { width: 0, padding: 0, margin: 0, border: '0' },
              }}
            >
              <motion.div whileHover={hoverAnimation}>DDI</motion.div>
            </Popconfirm>
            |
            <motion.div
              onClick={() => router.push('/meetings/edit/' + row.id)}
              whileHover={hoverAnimation}
            >
              Edit
            </motion.div>
          </Space>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (action, row) => (
        <div className='flex center'>
          <Popconfirm
            title='Are you sure want to deleted?'
            onConfirm={() => {
              deleteMeetings(row.id);
            }}
            okText='Yes'
            cancelText='No'
          >
            <motion.div whileHover={hoverAnimation}>
              <FontAwesomeIcon icon={faTrash} className='title-style' />
            </motion.div>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        <ContentInnerHeader />

        <Row>
          <h1 className='title-style'>Meetings</h1>
        </Row>

        <Row type='flex' justify='end'>
          <Row>
            <Button
              onClick={() => router.push('/meetings/create-meetings')}
              type='primary'
              className='primary-button-style alternate'
            >
              <Space>
                Create Meeting <FontAwesomeIcon icon={faPlusCircle} />
              </Space>
            </Button>
          </Row>
        </Row>
        <Table
          loading={loadingTable}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={meetingsContent}
          footer={(currentData) =>
            'Showing ' +
            currentData.length +
            ' of ' +
            meetingsContent.length +
            ' entries'
          }
        />
      </Space>
    </div>
  );
};

Meetings.propTypes = {
  meetingsContent: PropTypes.array,
};

export default Meetings;
