import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Space, Switch } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import DialAssignerComponent from "./DialAssignerComponent";
import FormGenerator from "../../components-base/FormGenerator";

const SpeedDials = ({ speedDialsForm }) => {
  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Speed Dials</h1>
        </Row>

        <FormGenerator FormOptions={speedDialsForm} />
      </Space>
    </div>
  );
};

SpeedDials.propTypes = {
  speedDialsForm: PropTypes.object,
};

export default SpeedDials;
