import React from "react";
import PropTypes from "prop-types";
import { Row, Select, Space, Switch, Table } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";

const { Option } = Select;

const ManageUsers = ({ manageUsersContent }) => {
  const router = useRouter();

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: "7rem",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Dids",
      dataIndex: "did",
      width: "15%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (actions) => (
        <Space>
          <motion.div
            onClick={() => router.push("/manage-users/details/" + actions)}
            whileHover={hoverAnimation}
          >
            Details
          </motion.div>
        </Space>
      ),
    },
    {
      title: "User Status",
      dataIndex: "active",
      width: "10%",
      render: (active) => (
        <div>
          <Switch
            checked={active}
            checkedChildren="ON"
            unCheckedChildren="OFF"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader />

        <Row>
          <h1 className="title-style">Manage Users</h1>
        </Row>

        <Row type="flex" justify="space-between">
          <Row>
            <Search
              placeholder="Search..."
              enterButton
              style={{ width: 300 }}
            />
          </Row>
        </Row>

        <Space size="small">
          <label>Show</label>
          <Select
            defaultValue="10"
            style={{ width: 120 }}
            // onChange={handleChange}
          >
            <Option value="10">10</Option>
            <Option value="20">20</Option>
          </Select>
          <label>entries</label>
        </Space>

        <Table
          // rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={manageUsersContent}
          footer={(currentData) =>
            "Showing " +
            currentData.length +
            " of " +
            manageUsersContent.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

ManageUsers.propTypes = {
  manageUsersContent: PropTypes.array,
};

export default ManageUsers;
