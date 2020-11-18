import {
  faDownload,
  faEnvelope,
  faPlusCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Select, Space, Table, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const { Option } = Select;

const FrequentNumbers = ({ frequentNumbersTableData }) => {
  const [tablePageSize, setTablePageSize] = useState({ pageSize: 10 });

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const onChangeTablePageSize = (value) => {
    setTablePageSize({ pageSize: value });
  };

  const columns = [
    {
      title: "Alias",
      dataIndex: "alias",
      fixed: "left",
      onFilter: (value, record) => record.alias.indexOf(value) === 0,
      sorter: (a, b) => a.alias.length - b.alias.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (linkDetails, edit) => (
        <motion.div
          // onClick={() => handleVisible(record)}
          whileHover={hoverAnimation}
          className="flex center"
        >
          Edit
        </motion.div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      width: "10%",
      render: (linkDetails, edit) => (
        <motion.div
          // onClick={() => handleVisible(record)}
          whileHover={hoverAnimation}
          className="flex center"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </motion.div>
      ),
    },
  ];

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Frequent Number</h1>
        </Row>

        <Search
          placeholder="Search user..."
          enterButton
          style={{ width: 300 }}
        />

        <Space size="large" className="flex space-between">
          <Space size="small">
            <label>Show</label>
            <Select defaultValue="10" onChange={onChangeTablePageSize}>
              <Option value="10">10</Option>
              <Option value="20">20</Option>
            </Select>
            <label>entries</label>
          </Space>
          <Button type="primary" className="primary-button-style alternate">
            <Space className="flex center">
              New Number <FontAwesomeIcon icon={faPlusCircle} />
            </Space>
          </Button>
        </Space>

        <Table
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          pagination={tablePageSize}
          dataSource={frequentNumbersTableData}
          footer={(currentData) =>
            "Showing " +
            currentData.length +
            " of " +
            frequentNumbersTableData.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

FrequentNumbers.propTypes = {
  frequentNumbersTableData: PropTypes.array,
};

export default FrequentNumbers;
