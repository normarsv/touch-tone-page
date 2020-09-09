import React, { useState } from "react";
import PropTypes from "prop-types";
import { Space, Row, Checkbox, Button, Table, Switch } from "antd";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Router from "next/dist/client/router";

const ListAllOrganizations = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      fixed: "left",
    },
    {
      title: "Billing ID in Rev.io",
      dataIndex: "billing",
    },
    {
      title: "Organization Distribuitor",
      dataIndex: "orgDist",
    },
    {
      title: "Count of DIDs",
      dataIndex: "didsCount",
    },
    {
      title: "Count of Users",
      dataIndex: "users",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (linkDetails, edit) => (
        <Space className="flex-center">
          <label>Details</label> |{" "}
          <label
            onClick={() =>
              Router.push("/list-organizations/edit/testOrganization")
            }
          >
            Edit
          </label>
        </Space>
      ),
    },
    {
      title: "Active / Deactivate",
      dataIndex: "status",
      render: () => (
        <div className="flex-center">
          <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <Row>
          <h1 className="title-style">List All Organizations</h1>
        </Row>

        <Row type="flex" justify="space-between">
          <Space size="middle">
            <Checkbox onChange={() => rowSelection}>Select all</Checkbox> |{" "}
            <FontAwesomeIcon icon={faEraser} />
          </Space>
          <Row>
            <Search
              placeholder="Search..."
              enterButton
              style={{ width: 300 }}
            />
          </Row>
        </Row>

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

ListAllOrganizations.propTypes = {
  someData: PropTypes.string,
};

export default ListAllOrganizations;
