import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const DialAssignerComponent = ({}) => {
  return (
    <div>
      <Space direction="vertical">
        <Row type="flex" justify="end" style={{ width: "100%" }}>
          <Button
            type="primary"
            className="primary-button-style alternate flex-center"
          >
            <Space>
              {" "}
              Assign a Dial Key <FontAwesomeIcon icon={faPlusCircle} />{" "}
            </Space>
          </Button>
        </Row>
      </Space>
    </div>
  );
};

DialAssignerComponent.propTypes = {
  someData: PropTypes.string,
};

export default DialAssignerComponent;
