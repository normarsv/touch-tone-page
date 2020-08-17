import React from "react";
import { Menu, Col, Dropdown, Button, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronDown,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const HeaderMenu = ({}) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a>1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>2nd menu item</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="menu-main-div">
      <Col
        style={{ height: "100%" }}
        xxl={3}
        xl={4}
        lg={5}
        md={6}
        sm={6}
        xs={6}
      >
        <div className="page-side-menu-logo-container">
          <img className="page-side-menu-logo" src={"/logo.jpg"} />
        </div>
      </Col>
      <Col xxl={4} xl={5} lg={8} md={10} sm={6} xs={6}>
        <Row type="flex" align="middle" justify="space-between">
          <Button type="primary">
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "0.5rem" }} />{" "}
            Use Phone
          </Button>
          <Dropdown overlay={menu} trigger={["hover"]}>
            <div className="menu-top-right-options">
              <FontAwesomeIcon icon={faUser} />
              <label>Log off</label>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </Dropdown>
        </Row>
      </Col>
    </div>
  );
};

HeaderMenu.propTypes = {
  // someData: PropTypes.string
};

export default HeaderMenu;
