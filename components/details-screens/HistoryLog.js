import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popconfirm, Row, Space, Table } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const HistoryLog = ({ data }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);

  const hoverAnimation = {
    scale: 1.01,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
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
    },
    {
      title: "User",
      dataIndex: "user",
    },
    {
      title: "Previous",
      dataIndex: "previous",
    },
    {
      title: "Current",
      dataIndex: "current",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (linkDetails, edit) => (
        <Row type="flex" justify="space-between" align="middle">
          <Space className="flex center">
            <motion.div onClick={() => {}} whileHover={hoverAnimation}>
              <Popconfirm
                title="Are you sure to revert this log?"
                okText="Yes"
                cancelText="No"
              >
                Revert
              </Popconfirm>
            </motion.div>
            |
            <motion.div onClick={() => {}} whileHover={hoverAnimation}>
              Full History
            </motion.div>
          </Space>
          <FontAwesomeIcon icon={faExclamationCircle} className="title-style" />
        </Row>
      ),
    },
  ];

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
        <h1 className="title-style">History Log</h1>
        <Table
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={data}
        />
      </Space>
    </div>
  );
};

HistoryLog.propTypes = {
  // someData: PropTypes.string
};

export default HistoryLog;
