import React from "react";
import PropTypes from "prop-types";
import { Button, Input, message, Row, Space, Switch, Upload } from "antd";
import ContentInnerHeader from "../../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const QueuesDetails = ({}) => {
  const props = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Queues Detail</h1>
        </Row>

        <Space direction="horizontal" size="large" className="flex-wrap ">
          <Space direction="vertical">
            <h4>Name</h4>
            <Input style={{ minWidth: 300 }} />
          </Space>
          <Space direction="vertical">
            <h4>Enable</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
          <Space direction="vertical">
            <h4>Descriptions</h4>
            <Input style={{ minWidth: 300 }} />
          </Space>
          <Space direction="vertical">
            <h4>Max Callers</h4>
            <Input style={{ minWidth: 300 }} />
          </Space>
        </Space>

        <Space direction="horizontal" size="large" className="flex-wrap ">
          <Space direction="vertical">
            <h4>Queue Prompt</h4>
            <Space
              direction="horizontal"
              size="large"
              className="upload-info-style"
            >
              <Upload {...props}>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                >
                  <Space>
                    <FontAwesomeIcon icon={faUpload} /> Upload{" "}
                  </Space>
                </Button>
              </Upload>
            </Space>
          </Space>
          <Space direction="vertical">
            <h4>Conecting Prompt</h4>
            <Space
              direction="horizontal"
              size="large"
              className="upload-info-style"
            >
              <Upload {...props}>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                >
                  <Space>
                    <FontAwesomeIcon icon={faUpload} /> Upload{" "}
                  </Space>
                </Button>
              </Upload>
            </Space>
          </Space>
        </Space>

        {/* Botones para subir archivos */}
        <Space direction="horizontal" size="large" className="flex-wrap ">
          <Space direction="vertical">
            <h4>On Hold Prompt</h4>
            <Space
              direction="horizontal"
              size="large"
              className="upload-info-style"
            >
              <Upload {...props}>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                >
                  <Space>
                    <FontAwesomeIcon icon={faUpload} /> Upload{" "}
                  </Space>
                </Button>
              </Upload>
            </Space>
          </Space>
          <Space direction="vertical">
            <h4>On Hold Continue Prompt</h4>
            <Space
              direction="horizontal"
              size="large"
              className="upload-info-style"
            >
              <Upload {...props}>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                >
                  <Space>
                    <FontAwesomeIcon icon={faUpload} /> Upload{" "}
                  </Space>
                </Button>
              </Upload>
            </Space>
          </Space>
        </Space>

        <Space direction="horizontal" size="large" className="flex-wrap ">
          <Space direction="vertical">
            <h4>Origin</h4>
            <Input style={{ minWidth: 300 }} />
          </Space>
          <Space direction="vertical">
            <h4>Announce Hold Time</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
          <Space direction="vertical">
            <h4>Announce Caller Position</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
          <Space direction="vertical">
            <h4>Prompt Hold </h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
          <Space direction="vertical">
            <h4>Provide Callback Option</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
        </Space>
        <Row type="flex" justify="end">
          <Button className="primary-button-style" type="primary">
            SAVE
          </Button>
        </Row>
      </Space>
    </div>
  );
};

QueuesDetails.propTypes = {
  someData: PropTypes.string,
};

export default QueuesDetails;
