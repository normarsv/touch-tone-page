import React, { useState } from "react";
import PropTypes from "prop-types";
import { Space, Table } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";

const DidsDetailList = ({ data }) => {
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
      title: "Organization Name",
      dataIndex: "nameOrg",
      fixed: "left",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Type",
      dataIndex: "type",
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
        <h1 className="title-style">List of DIDs</h1>
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

DidsDetailList.propTypes = {
  // someData: PropTypes.string
};

export default DidsDetailList;
