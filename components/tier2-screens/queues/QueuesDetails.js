import { Row, Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
import FormGenerator from "../../../components-base/FormGenerator";
import ContentInnerHeader from "../../misc/ContentInnerHeader";

const QueuesDetails = ({ queuesDetailsForm }) => {
  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Queues Detail</h1>
        </Row>

        <FormGenerator FormOptions={queuesDetailsForm} />
      </Space>
    </div>
  );
};

QueuesDetails.propTypes = {
  someData: PropTypes.string,
};

export default QueuesDetails;
