import React from "react";
import { Menu, Col } from "antd";

const HeaderMenu = ({}) => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Col style={{ height: "100%" }}>
        <div className="page-side-menu-logo-container">
          <img className="page-side-menu-logo" src={"/logo.jpg"} />
        </div>
      </Col>
      <Col>
        <Menu mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Col>
    </div>
  );
};

HeaderMenu.propTypes = {
  // someData: PropTypes.string
};

export default HeaderMenu;
