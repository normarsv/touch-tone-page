import { faEraser, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const { Option } = Select;

const ListAllUsers = ({ query, userTableList }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [titleToDisplay, setTitleToDisplay] = useState("");

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRow(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
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
        <Space className="flex center">
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
      render: (status, record) => (
        <div className="flex center">
          <Popconfirm
            placement="left"
            title="Are you sure you want to change the status of this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={(e) => console.log(record)}
          >
            <Switch
              checked={status}
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // console.log(query);

  useEffect(() => {
    if (
      userTableList.length > 0 &&
      userTableList[0].organization !== undefined
    ) {
      setTitleToDisplay(userTableList[0].organization);
    } else {
      setTitleToDisplay("");
    }
  }, []);

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader />

        <h1 className="title-style">
          List All Users {titleToDisplay ? "of " + titleToDisplay : ""}
        </h1>
        <Search placeholder="Search..." enterButton style={{ width: 300 }} />

        <Row type="flex" justify="space-between">
          <Space size="large" className="spaced-between">
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
          rowSelection={{ ...rowSelection }}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={userTableList}
          footer={(currentData) =>
            "Showing " +
            currentData.length +
            " of " +
            userTableList.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

ListAllUsers.propTypes = {
  // someData: PropTypes.string,
};

export default ListAllUsers;
