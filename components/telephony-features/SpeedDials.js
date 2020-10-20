import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Space, Switch } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const SpeedDials = ({}) => {
  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Speed Dials</h1>
        </Row>

        <div />

        <Row type="flex" justify="end">
          <Button className="primary-button-style" type="primary">
            SAVE
          </Button>
        </Row>
      </Space>
    </div>
  );
};

SpeedDials.propTypes = {
  someData: PropTypes.string,
};

export default SpeedDials;
