import React from "react";
import PropTypes from "prop-types";
import { Input, Row, Space } from "antd";
import ContentInnerHeader from "../../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";

const QueuesDetails = ({}) => {
  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">User Details</h1>
        </Row>
        <Search placeholder="Search..." enterButton style={{ width: 300 }} />

        <Space direction="horizontal" size="middle" className="flex-end">
          <Space direction="vertical">
            <h4>Name</h4>
            <Input style={{ width: 300 }} disabled={true} />
          </Space>
          <Space direction="vertical">
            <h4>DID</h4>
            <Input style={{ width: 300 }} disabled={true} />
          </Space>
          <Space direction="vertical">
            <h4>Email</h4>
            <Input style={{ width: 300 }} disabled={true} />
          </Space>
          <Space direction="vertical">
            <h4>Personal URL</h4>
            <Input style={{ width: 300 }} disabled={true} />
          </Space>
        </Space>
      </Space>
    </div>
  );
};

QueuesDetails.propTypes = {
  someData: PropTypes.string,
};

export default QueuesDetails;
