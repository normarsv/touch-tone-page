import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Row, Select, Space, Table, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import React from "react";

import ContentInnerHeader from "../misc/ContentInnerHeader";

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
      render: (action, row) => {
        return (
          <Space className="flex center">
            <Tooltip placement="top" title={row.url}>
              <motion.div
                onClick={() => {
                  const el = document.createElement("textarea");
                  el.value = row.url;
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand("copy");
                  document.body.removeChild(el);
                  message.success("URL Copied!");
                }}
                whileHover={hoverAnimation}
              >
                URL
              </motion.div>
            </Tooltip>
            |
            <motion.div
              onClick={() => router.push("/meetings/edit/" + row.id)}
              whileHover={hoverAnimation}
            >
              Edit
            </motion.div>
          </Space>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: () => (
        <div className="flex center">
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
              onClick={() => router.push("/meetings/create-meetings")}
              type="primary"
              className="primary-button-style alternate"
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
          footer={(currentData) =>
            "Showing " +
            currentData.length +
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
