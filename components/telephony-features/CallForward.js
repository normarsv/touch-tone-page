import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Space, Switch } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import FormGenerator from "../../components-base/FormGenerator";

const CallForward = ({ callForwardFormContent }) => {
  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Space size="middle">
          <h1 className="title-style">Call Forward</h1>
          <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        </Space>

        {/* <FormGenerator FormOptions={callForwardFormContent} /> */}
      </Space>
    </div>
  );
};

CallForward.propTypes = {
  someData: PropTypes.string,
};

export default CallForward;
