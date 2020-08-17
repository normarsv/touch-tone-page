import React from "react";
import { Space } from "antd";
import { motion } from "framer-motion";

const UserInfo = ({ openSideMenu }) => {
  const showItems = {
    open: {
      opacity: 1,
      x: 0,
      minWidth: "100%",
      width: "100%",
      transition: {
        type: "tween",
        duration: 0.1,
        delay: 0.1,
      },
    },
    closed: {
      opacity: 0,
      x: -100,
      minWidth: 0,
      width: 0,
      transition: {
        type: "tween",
        duration: 0.1,
        delay: 0,
      },
    },
  };

  return (
    <div>
      <Space
        size="small"
        style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}
      >
        <div
          style={{
            height: "2rem",
            width: "2rem",
            backgroundColor: "#e4002b",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#ffffff",
          }}
        >
          EC
        </div>

        <motion.div
          animate={openSideMenu ? "closed" : "open"}
          variants={showItems}
        >
          <h4>James Tylor</h4>
          <h5 style={{ color: "#e4002b" }}>Account administrator</h5>
        </motion.div>
        {/* {!openSideMenu && <div></div>} */}
      </Space>
    </div>
  );
};

UserInfo.propTypes = {
  //   someData: PropTypes.string,
};

export default UserInfo;
