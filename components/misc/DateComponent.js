import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales.js";
import { Space, Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";

export const DateComponent = ({}) => {
  const [time, setTime] = useState(moment().format("LT"));
  const [weather, setWeather] = useState();
  const [locationState, setLocation] = useState();

  useEffect(() => {
    let second = setInterval(() => tick(), 1000);

    if (locationState === undefined) {
      navigator.geolocation.getCurrentPosition(success);
      function success(pos) {
        setLocation(pos.coords);
      }
    } else {
      if (weather === undefined) {
        const getWeather = async () => {
          const API_URL =
            `https://api.openweathermap.org/data/2.5/weather?lat=` +
            locationState.latitude +
            `&lon=` +
            locationState.longitude +
            `&APPID=ec1d35db46c5beab50a6a160c544078c&units=imperial`;
          const response = await fetch(API_URL);
          const data = await response.json();

          setWeather(data.main.temp);
        };

        getWeather();
      }
    }

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
        { weather &&
        <>
        <Divider type="vertical" />
        <Space>
          <FontAwesomeIcon className="title-style" icon={faCloud} />{" "}
          <label>{Math.round(weather,1) + ' °F'}</label>
        </Space>
        </>
        }
      </Space>
    </div>
  );
};

DateComponent.propTypes = {
  // someData: PropTypes.string,
};
