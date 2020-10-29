import {
  faChevronDown,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Dropdown, Menu, Row } from "antd";
import { motion, useCycle } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useRef, useState } from "react";

import { removeAppUser } from "../../scripts/General";
import { UserContext } from "../authentication/UserContext";
import SuperAdminSiderOptions from "../tier1-screens/SuperAdminSiderOptions";
import OrganizationAdminSiderOptions from "../tier2-screens/OrganizationAdminSiderOptions";
import EndUserSiderOptions from "../tier3-screens/EndUserSiderOptions";
import { MenuToggle } from "./MenuToggle";
import SiderOptions from "./SiderOptions";

const menuDiv = {
  open: {
    zIndex: 10,
    opacity: 1,
    x: "0",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  closed: {
    zIndex: 0,
    opacity: 0,
    x: "100%",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

const HeaderMenu = ({ mainBodyRef, openSideMenu }) => {
  const [isOpen, setOpenMenu] = useCycle(false, true);
  const { userInfo } = useContext(UserContext);
  const [routeToGo, setRouteToGo] = useState();
  const router = useRouter();

  let finalRoute;

  function menuToRender(userInfo) {
    switch (userInfo.group) {
      case "SuperAdmin":
        return <SuperAdminSiderOptions openSideMenu={openSideMenu} />;
        break;

      case "OrganizationAdmin":
        return <OrganizationAdminSiderOptions openSideMenu={openSideMenu} />;
        break;

      case "EndUser":
        return <EndUserSiderOptions openSideMenu={openSideMenu} />;
        break;

      default:
        return <SiderOptions openSideMenu={openSideMenu} />;
        break;
    }
  }

  useEffect(() => {
    switch (userInfo.group) {
      case "SuperAdmin":
        setRouteToGo("list-organizations");
        break;

      case "OrganizationAdmin":
        setRouteToGo("admin-dashboard");
        break;

      case "EndUser":
        setRouteToGo("user-dashboard");
        break;

      default:
        break;
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a
          onClick={() => {
            removeAppUser();
            router.replace("/");
          }}
        >
          Log out
        </a>
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
        <a
          onClick={() => {
            router.replace("/" + routeToGo);
          }}
          id="menu-header-logo"
        >
          <div className="page-side-menu-logo-container">
            <img className="page-side-menu-logo" src={"/logo.jpg"} />
          </div>
        </a>
      </Col>
      <Col xxl={4} xl={5} lg={8} md={2} sm={2} xs={2}>
        <Row
          type="flex"
          align="middle"
          justify="space-between"
          className="account-avatar"
        >
          {userInfo.role === "Organization Admin" ||
          userInfo.role === "End User" ? (
            <Button type="primary">
              <FontAwesomeIcon
                icon={faPhone}
                style={{ marginRight: "0.5rem" }}
              />{" "}
              Use Phone
            </Button>
          ) : userInfo.name === undefined ? (
            <label>
              Need help? <a>Call 800 900 5464</a>
            </label>
          ) : (
            <div />
          )}

          {userInfo.name ? (
            <Dropdown overlay={menu} trigger={["hover"]}>
              <div className="menu-top-right-options logged-in">
                <FontAwesomeIcon
                  icon={faUser}
                  className="menu-user-status logged-in"
                />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Dropdown>
          ) : null}
        </Row>

        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="burger-icon"
        >
          <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
            <MenuToggle
              animate={isOpen ? "open" : "closed"}
              toggle={() => setOpenMenu()}
            />
          </motion.nav>
        </div>
      </Col>

      <motion.div
        initial={false}
        variants={menuDiv}
        animate={isOpen ? "open" : "closed"}
        className="mobile-hamburger-menu"
      >
        {menuToRender(userInfo)}
      </motion.div>
    </div>
  );
};

HeaderMenu.propTypes = {
  // someData: PropTypes.string
};

export default HeaderMenu;
