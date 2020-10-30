import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/dist/client/router";
import { Button, Row, Select, Space, Switch, Table } from "antd";
import { motion } from "framer-motion";
import ContentInnerHeader from "../../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const Queues = ({ queueTableContent }) => {
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
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 400,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 100,
      render: (actions) => (
        <Space>
          <motion.div
            onClick={() => router.push("/queues/details/" + actions)}
            whileHover={hoverAnimation}
          >
            Details
          </motion.div>
        </Space>
      ),
    },
    {
      title: "Enable",
      dataIndex: "enable",
      width: 100,
      render: (enable) => (
        <div>
          <Switch
            checked={enable}
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
          <h1 className="title-style">Queues</h1>
        </Row>

        <Row type="flex" justify="space-between">
          <Row>
            <Search
              placeholder="Search..."
              enterButton
              style={{ width: 300 }}
            />
          </Row>
          <Space size="small" className="spaced-between">
            <Button className="primary-button-style alternate" type="primary">
              <Space className="flex center">
                Create Queue <FontAwesomeIcon icon={faPlusCircle} />
              </Space>
            </Button>
          </Space>
        </Row>

        <Table
          // rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={queueTableContent}
          footer={() =>
            "Showing " +
            queueTableContent.length +
            " of " +
            queueTableContent.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

Queues.propTypes = {
  someData: PropTypes.string,
};

export default Queues;
