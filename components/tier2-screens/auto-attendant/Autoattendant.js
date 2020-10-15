import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Row, Space, Switch, Table } from "antd";
import ContentInnerHeader from "../../misc/ContentInnerHeader";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AutoAttendant = ({ autoAttendantTableContent }) => {
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
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 593,
    },
    {
      title: "DID",
      dataIndex: "did",
      width: 200,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 100,
      render: (actions) => (
        <Space>
          <motion.div
            onClick={() => router.push("/auto-attendant/details/" + actions)}
            whileHover={hoverAnimation}
          >
            Details
          </motion.div>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader />

        <Row>
          <h1 className="title-style">Auto Attendant</h1>
        </Row>

        <Search placeholder="Search..." enterButton style={{ width: 300 }} />
        <Row type="flex" justify="space-between">
          <Space></Space>
          <Space size="small">
            <Button
              className="primary-button-style alternate-button-style"
              type="primary"
            >
              <Space>
                New Auto Attendant <FontAwesomeIcon icon={faPlusCircle} />
              </Space>
            </Button>
          </Space>
        </Row>

        <Table
          // rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={autoAttendantTableContent}
          footer={() =>
            "Showing " +
            autoAttendantTableContent.length +
            " of " +
            autoAttendantTableContent.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

AutoAttendant.propTypes = {
  someData: PropTypes.string,
};

export default AutoAttendant;
