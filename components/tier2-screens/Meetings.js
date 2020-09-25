import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Select, Space, Switch, Table } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const Meetings = ({ meetingsContent }) => {
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
      width: "",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (meetingId) => (
        <Space>
          <motion.div
            onClick={() => router.push("/meetings/view/" + meetingId)}
            whileHover={hoverAnimation}
          >
            View
          </motion.div>
          |
          <motion.div
            onClick={() => router.push("/meetings/edit/" + meetingId)}
            whileHover={hoverAnimation}
          >
            Edit
          </motion.div>
        </Space>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: () => (
        <div className="flex-center">
          <FontAwesomeIcon icon={faTrash} className="title-style" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader />

        <Row>
          <h1 className="title-style">Meetings</h1>
        </Row>

        <Row type="flex" justify="end">
          <Row>
            <Button
              type="primary"
              className="primary-button-style alternate-button-style"
            >
              <Space>
                Create Meeting <FontAwesomeIcon icon={faPlusCircle} />
              </Space>
            </Button>
          </Row>
        </Row>

        <Table
          // rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={meetingsContent}
          footer={() =>
            "Showing " +
            meetingsContent.length +
            " of " +
            meetingsContent.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

Meetings.propTypes = {
  meetingsContent: PropTypes.array,
};

export default Meetings;
