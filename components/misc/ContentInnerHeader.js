import React from "react";
import PropTypes from "prop-types";
import { Space, Row } from "antd";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { DateComponent } from "../base/DateComponent";
import { useRouter } from "next/dist/client/router";

const ContentInnerHeader = ({ setBackOption }) => {
  const router = useRouter();

  const hoverAnimation = {
    x: -2,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  return (
    <>
      <Row
        type="flex"
        justify={setBackOption ? "space-between" : "end"}
        align="middle"
      >
        {setBackOption && (
          <motion.div whileHover={hoverAnimation}>
            <Space onClick={() => router.back()}>
              <FontAwesomeIcon icon={faChevronLeft} /> Back
            </Space>
          </motion.div>
        )}
        <div>
          <DateComponent />
        </div>
      </Row>
    </>
  );
};

ContentInnerHeader.propTypes = {
  setBackOption: PropTypes.bool,
};

export default ContentInnerHeader;
