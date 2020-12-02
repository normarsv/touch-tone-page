import React, { useContext, useEffect } from "react";
import { Space } from "antd";
import { motion } from "framer-motion";
import { UserContext } from "../authentication/UserContext";

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

  const { userInfo } = useContext(UserContext);

  if (userInfo.name !== undefined) {
    const normalName = userInfo.name;
    const separador = " ";
    const reducedName = normalName.split(separador);
    let splittedName = [];

    for (let x = 0; x < reducedName.length; x++) {
      const subCadena = reducedName[x].substring(0, 1);
      splittedName.push(subCadena);
    }

    return (
      <Space size="small" className="user-menu-info-main-div">
        <div className="user-menu-name-identifier">
          {splittedName[0] + splittedName[1]}
        </div>
        <motion.div
          animate={openSideMenu ? "closed" : "open"}
          variants={showItems}
        >
          <h4>{userInfo.name}</h4>
          <h5 className="title-style">{userInfo.role}</h5>
        </motion.div>
      </Space>
    );
  } else {
    return <div />;
  }
};

UserInfo.propTypes = {
  //   someData: PropTypes.string,
};

export default UserInfo;
