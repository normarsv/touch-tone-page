import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Select, Space, Switch, Table } from "antd";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ContentInnerHeader from "../../misc/ContentInnerHeader";

const { Option } = Select;

const AudioConference = ({ audioConferenceContent }) => {
  const router = useRouter();

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) =>
        date.map((item, index) => {
          return (
            <Space size="small" style={{ marginRight: "0.5rem" }}>
              <FontAwesomeIcon className="title-style" icon={item.icon} />{" "}
              {item.date}{" "}
            </Space>
          );
        }),
      fixed: "left",
    },
    {
      title: "Description",
      dataIndex: "desc",
      width: "25rem",
    },
    {
      title: "Access Code",
      dataIndex: "accessCode",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (conferenceId) => (
        <Space className="flex center action">
          <motion.div
            onClick={() =>
              router.push("/audio-conference/details/" + conferenceId)
            }
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
      render: (enable) => (
        <div className="flex center">
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
          <h1 className="title-style">Audio Conference Room</h1>
        </Row>

        <Row type="flex" justify="space-between">
          <Row>
            <Search
              placeholder="Search..."
              enterButton
              style={{ width: 300 }}
            />
          </Row>
          <Row>
            <Button
              type="primary"
              className="primary-button-style alternate"
              onClick={() => router.push("/audio-conference/new-conference")}
            >
              <Space>
                New Conference <FontAwesomeIcon icon={faPlusCircle} />
              </Space>
            </Button>
          </Row>
        </Row>

        <Table
          // rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={audioConferenceContent}
          footer={() =>
            "Showing " +
            audioConferenceContent.length +
            " of " +
            audioConferenceContent.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

AudioConference.propTypes = {
  audioConferenceContent: PropTypes.array,
};

export default AudioConference;
