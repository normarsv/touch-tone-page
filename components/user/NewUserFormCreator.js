import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, Space, Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const NewUserFormCreator = ({ title, type, extraMsg, icon }) => {
  const renderElement = (type, title, extraMsg, icon) => {
    switch (type) {
      case "input":
        return (
          <>
            <h4>{title}</h4>
            <Input style={{ width: 300 }} />
            {extraMsg && <label className="small-text">{extraMsg}</label>}
          </>
        );
        break;
      case "select":
        return (
          <>
            <h4>{title}</h4>
            <Select
              placeholder="Select..."
              style={{ width: 300 }}
              suffixIcon={() => (
                <div style={{ width: "100%" }}>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              )}
            />
          </>
        );
        break;
      case "switch":
        return (
          <>
            <h4>{title}</h4>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </>
        );
        break;
      case "button":
        return (
          <>
            <Button className="primary-button-style alternate" type="primary">
              <Space>
                <FontAwesomeIcon icon={icon} /> {title}
              </Space>
            </Button>
          </>
        );
        break;

      default:
        break;
    }
  };

  return (
    <Space direction="vertical" size="small">
      {renderElement(type, title, extraMsg, icon)}
    </Space>
  );
};

NewUserFormCreator.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  extraMsg: PropTypes.string,
  icon: PropTypes.any,
};

export default NewUserFormCreator;
