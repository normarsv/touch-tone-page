import {
  faDownload,
  faEnvelope,
  faSync,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Select, Space, Table, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import useWindowDimensions from '../../hooks/useWindowDimensions';
const { Option } = Select;

const CallRecordings = ({ callRecordingsTableData }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [audioProgress, setAudioProgress] = useState();
  const [tablePageSize, setTablePageSize] = useState({ pageSize: 10 });
  const windowDimension = useWindowDimensions();
  const onChangeTablePageSize = (value) => {
    setTablePageSize({ pageSize: value });
  };

  const onSelectChange = (selectedRowKeys) => {
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
      fixed: windowDimension.width < 900 ? "none" :"left",
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
            <Select defaultValue="10" onChange={onChangeTablePageSize}>
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

CallRecordings.propTypes = {
  callRecordingsTableData: PropTypes.array,
};

export default CallRecordings;
