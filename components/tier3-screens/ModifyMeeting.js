import React from "react";
import PropTypes from "prop-types";
import { Space } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import FormGenerator from "../../components-base/FormGenerator";

const ModifyMeeting = ({ createMeetingForm }) => {
  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <h1 className="title-style">Create Meeting</h1>

        <FormGenerator FormOptions={createMeetingForm} />
      </Space>
    </div>
  );
};

ModifyMeeting.propTypes = {
  someData: PropTypes.string,
};

export default ModifyMeeting;
