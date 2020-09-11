import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales.js";
import { Space, Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

export const DateComponent = ({}) => {
  const [time, setTime] = useState(moment().format("LTS"));

  useEffect(() => {
    let second = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(second);
    };
  });

  const tick = () => {
    setTime(moment().format("LT"));
  };

  return (
    <div className="date-component-div">
      <Space>
        <Space>
          <FontAwesomeIcon className="title-style" icon={faCalendarAlt} />{" "}
          {moment().format("L")}{" "}
        </Space>
        <Divider type="vertical" />
        <Space>
          <FontAwesomeIcon className="title-style" icon={faClock} /> {time}{" "}
        </Space>
      </Space>
    </div>
  );
};

DateComponent.propTypes = {
  // someData: PropTypes.string,
};
