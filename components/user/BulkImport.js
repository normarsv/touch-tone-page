import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, message, Row, Space, Table } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import API from "../../API/API";
import { useRouter } from "next/dist/client/router";

const key = "updatable";

const BulkImport = ({}) => {
  const [resBulkList, setResBulkList] = useState();
  const [renderList, setRenderList] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [rawCsv, setRawCsv] = useState();
  const [fileInfo, setFileInfo] = useState({});

  const router = useRouter();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "Organization",
      dataIndex: "org",
      width: "25%",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "10%",
    },
  ];

  const api = new API("", {
    "Content-Type": 'multipart/form-data;boundary="boundary"',
    "Access-Control-Allow-Origin": "*",
  });

  const props = {
    name: "file",
    multiple: false,
    action: "",
    async onChange(info) {
      console.log(info);
      const { status } = info.file;
      console.log(status);

      if (status !== "uploading") {
        var formDataUpload = new FormData();
        formDataUpload.append("file", info.file.originFileObj);

        const apiResBulkUpload = await api.doVerifyUserBulkImport(
          formDataUpload
        );

        console.log(apiResBulkUpload);

        const finalUserList = [];
        for (let i = 0; i < apiResBulkUpload.length; i++) {
          const currentUser = apiResBulkUpload[i];

          finalUserList.push({
            name: currentUser.firstName + " " + currentUser.lastName,
            email: currentUser.email,
            org: currentUser.organizationName,
            role: "End User",
          });
        }

        setResBulkList(finalUserList);

        console.log(apiResBulkUpload);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setRawCsv(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  function revertImport() {
    setResBulkList(undefined);
    setRenderList(false);
  }

  async function uploadCsv() {
    // rawCsv;
    var formDataUpload = new FormData();
    formDataUpload.append("file", rawCsv);

    const apiUploadFinalList = await api.doUploadUserBulkImport(formDataUpload);

    message.loading({ content: "Loading...", key });
    setTimeout(() => {
      message.success({
        content: "Csv uploaded correctly, Redirecting to User List...",
        key,
        duration: 2,
      });
      router.replace("/list-users");
    }, 2000);

    console.log(apiUploadFinalList, "response");
  }

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />
        <Row>
          <h1 className="title-style">Bulk Import</h1>
        </Row>
        <Row type="flex" justify="space-between">
          {renderList ? (
            <Search
              placeholder="Search..."
              enterButton
              style={{ width: 300 }}
            />
          ) : (
            <div />
          )}
          <h2 className="title-style">
            Help <FontAwesomeIcon icon={faQuestionCircle} />
          </h2>
        </Row>

        {!renderList ? (
          //Render file uploader
          <>
            <Row type="flex" justify="center">
              {fileInfo && <h1>{fileInfo.name}</h1>}
              <Dragger
                style={{ width: "100%" }}
                showUploadList={false}
                {...props}
              >
                <Space
                  size="middle"
                  direction="vertical"
                  style={{ width: "80%" }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Space>
              </Dragger>
            </Row>
            <Row type="flex" justify="center">
              <Button
                disabled={!resBulkList}
                type="primary"
                className="primary-button-style"
                onClick={() => setRenderList(true)}
              >
                Continue{" "}
              </Button>
            </Row>{" "}
          </>
        ) : (
          //Render bulk table
          <>
            {console.log(rawCsv, "rawcsv")}
            <Row type="flex" justify="end">
              <div>
                <Space direction="horizontal">
                  <Button
                    className="primary-button-style cancel"
                    onClick={() => revertImport()}
                  >
                    Revert
                  </Button>
                  <Button
                    onClick={() => uploadCsv()}
                    type="primary"
                    className="primary-button-style"
                  >
                    Confirm
                  </Button>
                </Space>
              </div>
            </Row>
            <Table
              rowSelection={rowSelection}
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
