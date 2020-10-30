import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  Divider,
  Progress,
  Row,
  Select,
  Slider,
  Space,
  Table,
} from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEraser,
  faPlay,
  faPlusCircle,
  faSync,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const CallRecordingsOA = ({ callRecordingsTableData }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [audioProgress, setAudioProgress] = useState();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) =>
        date.map((item, index) => {
          return (
            <Space>
              <FontAwesomeIcon className="title-style" icon={item.icon} />{" "}
              {item.date}{" "}
            </Space>
          );
        }),
      fixed: "left",
      filterMultiple: false,
      onFilter: (value, record) => record.date.indexOf(value) === 0,
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "User Name",
      dataIndex: "userName",
      filterMultiple: false,
      onFilter: (value, record) => record.userName.indexOf(value) === 0,
      sorter: (a, b) => a.userName.length - b.userName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Type",
      dataIndex: "type",
      filterMultiple: false,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Talk time",
      dataIndex: "totalTalkTime",
      filterMultiple: false,
      onFilter: (value, record) => record.totalTalkTime.indexOf(value) === 0,
      sorter: (a, b) => a.totalTalkTime.length - b.totalTalkTime.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 400,
      render: (linkDetails, edit) => (
        <Row type="flex" justify="center" align="middle">
          <Space>
            <Button
              type="primary"
              style={{ borderRadius: "2rem", width: "1rem" }}
              className="flex center"
            >
              <FontAwesomeIcon icon={faPlay} />
            </Button>
            <div
              style={{
                padding: "0.5rem",
                backgroundColor: "#ffffff",
                borderRadius: 4,
                border: "1px solid #dadada",
                width: 250,
                position: "relative",
              }}
            >
              <Slider defaultValue={30} />
              <label
                style={{
                  fontSize: 10,
                  position: "absolute",
                  bottom: 0,
                  left: 15,
                }}
              >
                00:34
              </label>
            </div>
            <Button
              type="primary"
              style={{ borderRadius: "2rem", width: "1rem" }}
              className="flex center primary-button-style alternate"
            >
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </Space>
        </Row>
      ),
    },
    {
      title: "Delete Records",
      dataIndex: "delete",
      width: 100,
      render: () => (
        <Row type="flex" justify="center" align="middle">
          <FontAwesomeIcon icon={faTrash} />
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Call Recordings</h1>
        </Row>

        <Search
          placeholder="Search user..."
          enterButton
          style={{ width: 300 }}
        />

        <Space size="large">
          <Space size="small">
            <Button
              disabled={selectedRow.length === 0}
              className="primary-button-style alternate"
              type="primary"
            >
              Export
            </Button>
          </Space>
          |
          <FontAwesomeIcon icon={faTrash} />
          <Space size="small">
            <label>Show</label>
            <Select
              defaultValue="10"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="10">10</Option>
              <Option value="20">20</Option>
            </Select>
            <label>entries</label>
          </Space>
          <Button type="primary">
            <FontAwesomeIcon icon={faSync} />
          </Button>
        </Space>

        <Table
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={callRecordingsTableData}
          footer={() =>
            "Showing " +
            callRecordingsTableData.length +
            " of " +
            callRecordingsTableData.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

CallRecordingsOA.propTypes = {
  someData: PropTypes.string,
};

export default CallRecordingsOA;
