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
  Tooltip,
} from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEnvelope,
  faEraser,
  faPlay,
  faPlusCircle,
  faSync,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const VoiceMail = ({ voiceMailTableData }) => {
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
      render: (date) => {
        return (
          <Space direction="horizontal">
            {date.map((item, index) => {
              return (
                <Space direction="horizontal">
                  <FontAwesomeIcon className="title-style" icon={item.icon} />{" "}
                  {item.date}{" "}
                </Space>
              );
            })}
          </Space>
        );
      },
      fixed: "left",
      filterMultiple: false,
      onFilter: (value, record) => record.date.indexOf(value) === 0,
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sender",
      dataIndex: "sender",
      filterMultiple: false,
      onFilter: (value, record) => record.sender.indexOf(value) === 0,
      sorter: (a, b) => a.sender.length - b.sender.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Duration",
      dataIndex: "totalTalkTime",
      filterMultiple: false,
      onFilter: (value, record) => record.totalTalkTime.indexOf(value) === 0,
      sorter: (a, b) => a.totalTalkTime.length - b.totalTalkTime.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (linkDetails, edit) => (
        <Row type="flex" justify="center" align="middle">
          <Space>
            <Tooltip title="Download file">
              <Button
                type="primary"
                style={{ borderRadius: "2rem", width: "1rem" }}
                className="flex center primary-button-style alternate"
              >
                <FontAwesomeIcon icon={faDownload} />
              </Button>
            </Tooltip>
            <Tooltip title="Send File by Email">
              <Button
                type="primary"
                style={{ borderRadius: "2rem", width: "1rem" }}
                className="flex center primary-button-style alternate"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </Button>
            </Tooltip>
          </Space>
        </Row>
      ),
    },
    {
      title: "Delete Records",
      dataIndex: "delete",
      width: "10%",
      render: () => (
        <Row type="flex" justify="center" align="middle">
          <FontAwesomeIcon icon={faTrash} />
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Voice Mail</h1>
        </Row>

        <Search
          placeholder="Search user..."
          enterButton
          style={{ width: 300 }}
        />

        <Space size="large" className="spaced-between">
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
            <Button type="primary">
              <FontAwesomeIcon icon={faSync} />
            </Button>
          </Space>
          <Button
            disabled={selectedRow.length === 0}
            className="primary-button-style cancel"
          >
            Delete Selected Records
          </Button>
        </Space>

        <Table
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={voiceMailTableData}
          footer={(currentData) =>
            "Showing " +
            currentData.length +
            " of " +
            voiceMailTableData.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

VoiceMail.propTypes = {
  someData: PropTypes.string,
};

export default VoiceMail;
