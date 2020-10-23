import { faEraser, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Row, Select, Space, Switch, Table } from "antd";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const { Option } = Select;

const ListAllUsers = ({ userTableList }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const onEditOrg = (orgName) => {
    router.push("/list-users/edit/organizationName");
  };

  async function searchByOrg(input) {
    const api = new API();
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "DID",
      dataIndex: "did",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (actions) => (
        <Space className="flex-center">
          <motion.div
            onClick={() => router.push("/list-users/details/" + actions)}
            whileHover={hoverAnimation}
          >
            Details
          </motion.div>
          |
          <motion.div
            onClick={() => router.push("/list-users/edit/" + actions)}
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
          <h1 className="title-style">List All Users</h1>
        </Row>

        <Search
          placeholder="Search organization..."
          enterButton
          onSearch={(input) => searchByOrg(input)}
          style={{ width: 300 }}
        />

        <Row type="flex" justify="space-between">
          <Space size="large">
            <Space size="small">
              <Checkbox onChange={() => rowSelection}>Select all</Checkbox> |{" "}
              <FontAwesomeIcon icon={faEraser} />
            </Space>
            <Space size="small" className="spaced">
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
          </Space>
          <Row>
            <Space>
              <Search
                placeholder="Search users..."
                enterButton
                style={{ width: 300 }}
              />
              <Space>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                  onClick={() => router.push("/list-users/bulk-import")}
                >
                  <Space>
                    Bulk Import
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Space>
                </Button>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                  onClick={() => router.push("/list-users/new-user")}
                >
                  <Space>
                    New User
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Space>
                </Button>
              </Space>
            </Space>
          </Row>
        </Row>

        <Table
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={userTableList}
        />
      </Space>
    </div>
  );
};

ListAllUsers.propTypes = {
  // someData: PropTypes.string,
};

export default ListAllUsers;
