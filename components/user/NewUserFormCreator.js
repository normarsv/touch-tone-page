import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Select, Space, Switch } from "antd";
import PropTypes from "prop-types";
import React from "react";

const { Option } = Select;

const NewUserFormCreator = ({
  onChange,
  fieldValue,
  title,
  type,
  extraMsg,
  icon,
  selectSubOptions,
  selectSubOptionsKey,
}) => {
  const renderElement = (type, title, extraMsg, icon) => {
    switch (type) {
      case "input":
        return (
          <>
            <h4>{title}</h4>
            <Input
              onChange={(e) => onChange(e.target.value)}
              value={fieldValue}
              style={{ width: 300 }}
            />
            {extraMsg && <label className="small-text">{extraMsg}</label>}
          </>
        );

      case "select":
        return (
          <>
            <h4>{title}</h4>
            <Select
              placeholder="Select..."
              value={fieldValue}
              onChange={(value) => onChange(value)}
              style={{ width: 300 }}
              suffixIcon={() => (
                <div style={{ width: "100%" }}>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              )}
            >
              {selectSubOptions.map((item, index) => {
                return (
                  <Option value={item[selectSubOptionsKey]}>
                    {item.prefixName}
                  </Option>
                );
              })}
            </Select>
          </>
        );

      case "switch":
        return (
          <>
            <h4>{title}</h4>
            <Switch
              value={fieldValue}
              onChange={(value) => onChange(value)}
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
          </>
        );

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
