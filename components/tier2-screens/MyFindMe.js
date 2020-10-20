import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  message,
  Row,
  Space,
  Switch,
  Transfer,
  Upload,
} from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../authentication/UserContext";

const { RangePicker } = DatePicker;

const MyFindMe = ({}) => {
  const { userInfo } = useContext(UserContext);
  const [mockData, setMockData] = useState();
  const [targetKeys, setTargetKeys] = useState();
  const [titleByRole, setTitleByRole] = useState();

  function TitleByRole(userInfo) {
    switch (userInfo.group) {
      case "OrganizationAdmin":
        setTitleByRole("Ring Groups");
        break;

      case "EndUser":
        setTitleByRole("My Find Me");
        break;

      default:
        break;
    }
  }

  const props = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const dayRange = [
    { id: 1, day: "Monday" },
    { id: 2, day: "Tuesday" },
    { id: 3, day: "Wednesday" },
    { id: 4, day: "Thursday" },
    { id: 5, day: "Friday" },
  ];

  const getMock = () => {
    const targetKeys = [];
    const mockData = [
      { key: 1, title: "Juan Perez ", description: "" },
      { key: 2, title: "User Queue ", description: "" },
      { key: 3, title: "Ring Group ", description: "" },
      { key: 4, title: "Auto attendant ", description: "" },
      { key: 5, title: "External Number 2 ", description: "" },
      { key: 6, title: "External Number 3 ", description: "" },
    ];

    setMockData(mockData);
    setTargetKeys(targetKeys);
  };

  useEffect(() => {
    getMock();
    TitleByRole(userInfo);
  }, []);

  const handleChange = (targetKeys) => {
    setTargetKeys(targetKeys);
  };

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">{titleByRole}</h1>
        </Row>

        <Space direction="horizontal" size="middle">
          <Space direction="vertical">
            <h4>Name</h4>
            <Input style={{ width: 300 }} />
          </Space>
          <Space direction="vertical">
            <h4>Descriptions</h4>
            <Input style={{ width: 300 }} />
          </Space>
        </Space>

        <Space direction="horizontal" size="large">
          <Space direction="vertical">
            <h4>Hold Time</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
          <Space direction="vertical">
            <h4>Hold Continue</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
          <Space direction="vertical">
            <h4>No Answer Prompt</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
        </Space>

        <Space direction="horizontal" size="large">
          <Space direction="vertical">
            <h4>On Hold Prompt</h4>
            <Upload {...props}>
              <Button
                className="primary-button-style alternate-button-style"
                type="primary"
              >
                <Space>
                  <FontAwesomeIcon icon={faUpload} /> Upload
                </Space>
              </Button>
            </Upload>
          </Space>
          <Space direction="vertical">
            <h4>Anounce Prompt</h4>
            <Upload style={{ display: "flex" }} {...props}>
              <Button
                className="primary-button-style alternate-button-style"
                type="primary"
              >
                <Space>
                  <FontAwesomeIcon icon={faUpload} /> Upload
                </Space>
              </Button>
            </Upload>
          </Space>
        </Space>

        <Space direction="vertical" size="large" style={{ marginTop: "2rem" }}>
          <h2>Schedule</h2>
          <Space
            direction="horizontal"
            size="large"
            style={{ display: "flex" }}
          >
            <Space direction="vertical">
              <h4>Description</h4>
              <Input style={{ width: 300 }} />
            </Space>
            <Space direction="vertical">
              <h4>Mailbox</h4>
              <Input style={{ width: 300 }} />
            </Space>
            <Space direction="vertical">
              <h4>Enable</h4>
              <Switch checkedChildren="ON" unCheckedChildren="OFF" />
            </Space>
            <Space direction="vertical">
              <h4>Priority</h4>
              <Input style={{ width: 300 }} />
            </Space>
          </Space>
          <Space direction="vertical">
            <h4>Start and End Date & Time</h4>
            <RangePicker />
          </Space>
        </Space>

        <Space direction="vertical" size="large" style={{ marginTop: "2rem" }}>
          <h2>Day Range</h2>

          <Space direction="horizontal" size="large">
            {dayRange.map((item, index) => {
              return <Checkbox>{item.day}</Checkbox>;
            })}
          </Space>
        </Space>

        <Space
          direction="vertical"
          size="large"
          style={{ margin: "2rem 0", width: "100%" }}
        >
          <h2>Ringing Group</h2>

          <Space direction="horizontal" size="large">
            <h4>Ring at the same time</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Space>
          <div style={{ marginTop: "2rem", width: "100%" }}>
            <Transfer
              dataSource={mockData}
              showSearch
              listStyle={{
                width: "100%",
                height: "30rem",
              }}
              operations={["to right", "to left"]}
              targetKeys={targetKeys}
              onChange={handleChange}
              render={(item) => `${item.title}-${item.description}`}
            />
          </div>
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

MyFindMe.propTypes = {
  // someData: PropTypes.string
};

export default MyFindMe;
