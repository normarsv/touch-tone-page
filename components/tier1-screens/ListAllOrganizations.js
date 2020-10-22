import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Row, Space, Switch, Table } from "antd";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const ListAllOrganizations = ({ organizationsTableList }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const onEditOrg = (orgName) => {
    Router.push("/list-organizations/edit/organizationName");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      fixed: "left",
      width: "8rem",
    },
    {
      title: "Billing ID in Rev.io",
      dataIndex: "billingId",
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
      render: (actions) => (
        <Space className="flex-center">
          <motion.div
            onClick={() =>
              router.push("/list-organizations/details/" + actions)
            }
            whileHover={hoverAnimation}
          >
            Details
          </motion.div>
          |
          <motion.div
            onClick={() => router.push("/list-organizations/edit/" + actions)}
            whileHover={hoverAnimation}
          >
            Edit
          </motion.div>
        </Space>
      ),
    },
    {
      title: "Active / Deactivate",
      dataIndex: "status",
      render: (status) => (
        <div className="flex-center">
          <Switch
            checked={status}
            checkedChildren="ON"
            unCheckedChildren="OFF"
          />
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
        <ContentInnerHeader />

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
          dataSource={organizationsTableList}
        />
      </Space>
    </div>
  );
};

ListAllOrganizations.propTypes = {
  someData: PropTypes.string,
};

export default ListAllOrganizations;
