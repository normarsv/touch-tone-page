import React, { useRef } from "react";
import { Menu, Col, Dropdown, Button, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronDown,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useCycle, motion } from "framer-motion";
import { MenuToggle } from "./MenuToggle";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 20px 20px)`,
    transition: {
      type: "spring",
      stiffness: 2000,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    zIndex: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const HeaderMenu = ({ mainBodyRef }) => {
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

  const [isOpen, setOpenMenu] = useCycle(false, true);
  const containerRef = useRef(mainBodyRef);

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
      <Col xxl={4} xl={5} lg={8} md={2} sm={2} xs={2}>
        <Row
          type="flex"
          align="middle"
          justify="space-between"
          className="show-only-desktop"
        >
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
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
            <MenuToggle
              animate={isOpen ? "open" : "closed"}
              toggle={() => setOpenMenu()}
            />
          </motion.nav>
        </div>
      </Col>
    </div>
  );
};

HeaderMenu.propTypes = {
  // someData: PropTypes.string
};

export default HeaderMenu;
