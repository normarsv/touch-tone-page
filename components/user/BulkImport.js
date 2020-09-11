import React from "react";
import PropTypes from "prop-types";
import { message, Row, Space } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";

const BulkImport = ({}) => {
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />
        <Row>
          <h1 className="title-style">Bulk Import</h1>
        </Row>
        <Row type="flex" justify="space-between">
          <Search placeholder="Search..." enterButton style={{ width: 300 }} />
          <h2 className="title-style">
            Help <FontAwesomeIcon icon={faQuestionCircle} />
          </h2>
        </Row>
        <Row type="flex" justify="center">
          <Dragger {...props}>
            <Space size="middle" direction="vertical" style={{ width: "80%" }}>
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
      </Space>
    </div>
  );
};

BulkImport.propTypes = {
  someData: PropTypes.string,
};

export default BulkImport;
