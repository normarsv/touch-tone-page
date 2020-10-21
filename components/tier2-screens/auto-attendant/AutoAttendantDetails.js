import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  Dropdown,
  Input,
  Menu,
  message,
  Row,
  Select,
  Space,
  Transfer,
  Upload,
} from "antd";
import ContentInnerHeader from "../../misc/ContentInnerHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import SubMenu from "antd/lib/menu/SubMenu";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const AutoAttendantDetails = ({}) => {
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

  const [mockData, setMockData] = useState();
  const [targetKeys, setTargetKeys] = useState();

  useEffect(() => {
    getMock();
  }, []);

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
    // for (let i = 0; i < 1; i++) {
    //   const data = {
    //     key: i.toString(),
    //     title: `content ${i + 1}`,
    //   };
    //   if (data.chosen) {
    //     targetKeys.push(data.key);
    //   }
    //   mockData.push(data);
    // }
    setMockData(mockData);
    setTargetKeys(targetKeys);
  };

  const handleChange = (targetKeys) => {
    setTargetKeys(targetKeys);
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Group title">
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
      </Menu.ItemGroup>
      <SubMenu title="sub menu">
        <Menu.Item>3rd menu item</Menu.Item>
        <Menu.Item>4th menu item</Menu.Item>
      </SubMenu>
      <SubMenu title="disabled sub menu" disabled>
        <Menu.Item>5d menu item</Menu.Item>
        <Menu.Item>6th menu item</Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Auto Attendant Details</h1>
        </Row>

        <Space direction="horizontal" size="large" className="flex-wrap ">
          <Space direction="vertical">
            <h4>Name</h4>
            <Input style={{ minWidth: 300 }} />
          </Space>
          <Space direction="vertical">
            <h4>DID</h4>
            <Input style={{ minWidth: 300 }} />
          </Space>
          <Space direction="vertical">
            <h4>Descriptions</h4>
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

        <Space direction="vertical" style={{ width: "100%" }}>
          <h4>Description</h4>
          <TextArea rows={4} style={{ width: "100%" }} />
        </Space>

        <div className="transfer-main-div">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <h4>Destination</h4>
            <Select
              placeholder="Select destination"
              className="select-arrow-boxes"
            ></Select>
            <Transfer
              dataSource={mockData}
              showSearch
              titles={[<h4></h4>, <h4>Destination Users</h4>]}
              listStyle={{
                width: "100%",
                height: "30rem",
              }}
              operations={["To right", "To left"]}
              targetKeys={targetKeys}
              onChange={handleChange}
              render={(item) => `${item.title}`}
            />
          </Space>
        </div>

        <Row type="flex" justify="end">
          <Button className="primary-button-style" type="primary">
            SAVE
          </Button>
        </Row>
      </Space>
    </div>
  );
};

AutoAttendantDetails.propTypes = {
  someData: PropTypes.string,
};

export default AutoAttendantDetails;
