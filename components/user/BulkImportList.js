import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Space, Table } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import useWindowDimensions from '../../hooks/useWindowDimensions';
const BulkImportList = ({ bulkUserList }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const windowDimension = useWindowDimensions();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: windowDimension.width < 900 ? "none" :"left",
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "Organization",
      dataIndex: "org",
      width: "25%",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "10%",
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
        <ContentInnerHeader />

        <h1 className="title-style">Bulk Import</h1>

        <h4>Make sure you selected the correct Organization</h4>

        <Row type="flex" justify="end">
          <div>
            <Space direction="horizontal">
              <Button className="primary-button-style cancel">Revert</Button>
              <Button type="primary" className="primary-button-style">
                Confirm
              </Button>
            </Space>
          </div>
        </Row>

        <Table
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={bulkUserList}
        />
      </Space>
    </div>
  );
};

BulkImportList.propTypes = {
  bulkUserList: PropTypes.array,
};

export default BulkImportList;
