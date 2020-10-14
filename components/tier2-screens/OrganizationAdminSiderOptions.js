import {
  AppstoreFilled,
  UnorderedListOutlined,
  UserOutlined,
  IdcardOutlined,
  PlusCircleFilled,
  ReconciliationOutlined,
  ProfileOutlined,
  CustomerServiceFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  faFileAudio,
  faMapMarker,
  faMicrophone,
  faPhone,
  faTty,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Menu, Space } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import UserInfo from "../user/UserInfo";

const OrganizationAdminSiderOptions = ({ openSideMenu }) => {
  const [menuItem, setSelectedMenuItem] = useState("admin");

  const router = useRouter();

  console.log(router.route.includes("organizations"));

  useEffect(() => {
    if (router.route.includes("organizations")) {
      setSelectedMenuItem("organizations");
    } else if (router.route.includes("list-users")) {
      if (router.route.includes("list-users") && router.route.includes("new")) {
        setSelectedMenuItem("newUser");
      } else if (
        router.route.includes("list-users") &&
        router.route.includes("bulk")
      ) {
        setSelectedMenuItem("bulkImport");
      } else {
        setSelectedMenuItem("users");
      }
    }
  }, []);

  const organizationAdminMenu = {
    organizationAdminOptions: [
      {
        id: 1,
        key: "manageUsers",
        title: "Manage Users",
        icon: <UnorderedListOutlined />,
        route: "manage-users",
        subOptions: [],
      },
      {
        id: 2,
        key: "orgDetails",
        title: "Organization Details",
        icon: <ReconciliationOutlined />,
        route: "organization-details",
        subOptions: [],
      },
      {
        id: 3,
        key: "services",
        title: "Services",
        icon: <ProfileOutlined />,
        route: "organization-details",
        subOptions: [],
      },
      {
        id: 4,
        key: "audioConference",
        title: "Audio Conference Room",
        icon: <CustomerServiceFilled />,
        route: "audio-conference",
        subOptions: [],
      },
      {
        id: 5,
        key: "rtcMeeting",
        title: "Web RTC Meeting",
        icon: <UsergroupAddOutlined />,
        route: "meetings",
        subOptions: [],
      },
      {
        id: 6,
        key: "autoAttendant",
        title: "Auto - Attendant",
        icon: <UserOutlined />,
        route: "web-rtc-meeting",
        subOptions: [
          {
            id: 1,
            key: "autoAttendant",
            title: "Auto - Attendant",
            route: "auto-attendant",
          },
          {
            id: 2,
            key: "contactCenter",
            title: "Inbound Contact Center",
            route: "contact-center",
          },
          { id: 3, key: "ringGroup", title: "Ring Group", route: "ring-group" },
          { id: 4, key: "queue", title: "Queue", route: "queues" },
        ],
      },
    ],
    telephonyFeaturesOptions: [
      {
        id: 1,
        key: "callForwarding",
        title: "Call Forwarding",
        icon: faPhone,
        route: "/telephony-features/call-forwarding",
      },
      {
        id: 2,
        key: "myFindme",
        title: "My Find Me",
        icon: faMapMarker,
        route: "/telephony-features/my-findme",
      },
      {
        id: 3,
        key: "speedDials",
        title: "Speed Dials",
        icon: faTty,
        route: "/telephony-features/speed-dials",
      },
      {
        id: 4,
        key: "callRecordings",
        title: "Call Recordings",
        icon: faMicrophone,
        route: "/telephony-features/call-recordings",
      },
      {
        id: 5,
        key: "callReporting",
        title: "Call Reporting",
        icon: faFileAudio,
        route: "/telephony-features/call-reporting",
      },
    ],
  };

  return (
    <div className="sider-style">
      <div>
        <UserInfo openSideMenu={openSideMenu} />
      </div>
      {!openSideMenu && (
        <div className="side-menu-title-div">
          <Space className="flex-center">
            <AppstoreFilled /> <h4>Organization Admin</h4>
          </Space>
          <Divider style={{ margin: "0.5rem 0" }} />
        </div>
      )}
      <Menu
        mode="inline"
        selectedKeys={menuItem}
        className="side-menu-options-parent-div"
        id="Menu div"
      >
        {organizationAdminMenu.organizationAdminOptions.map((item, index) => {
          if (item.subOptions.length !== 0) {
            return (
              <SubMenu
                key={item.key}
                icon={item.icon}
                title={item.title}
                className="side-menu-submenu-style"
              >
                {item.subOptions.map((subItem, subIndex) => {
                  return (
                    <Menu.Item
                      key={subItem.key}
                      onClick={() =>
                        router.push("/auto-attendant/" + subItem.route)
                      }
                    >
                      {subItem.title}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item
                onClick={() => router.push(item.route)}
                icon={item.icon}
                key={item.key}
                style={{ margin: 0 }}
              >
                {item.title}
              </Menu.Item>
            );
          }
        })}
        <Divider style={{ margin: "0.1rem 0" }} />
        {organizationAdminMenu.telephonyFeaturesOptions.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => router.push(item.route)}
              key={item.key}
              icon={
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{
                    marginRight: !openSideMenu && "0.5rem",
                    width: "1rem",
                  }}
                />
              }
              title={item.title}
              style={{ margin: 0 }}
            >
              {!openSideMenu && item.title}
            </Menu.Item>
          );
        })}
      </Menu>
      <Menu
        mode="inline"
        selectedKeys={menuItem}
        className="side-menu-options-parent-div"
        id="Menu div"
      >
        <Divider style={{ margin: "0.1rem 0" }} />
      </Menu>

      {!openSideMenu && (
        <>
          <Space
            style={{ padding: "1rem 1.5rem" }}
            direction="vertical"
            id="Need help?"
          >
            <h5 className="title-style"> Need help? </h5>
            <a href="tel:">Call 800 900 5464</a>
          </Space>
          {/* <Space className="side-menu-bottom-text " id="Need help?">
              <p>TouchTone Communications Control Center</p>
            </Space> */}
        </>
      )}
    </div>
  );
};

OrganizationAdminSiderOptions.propTypes = {
  // someData: PropTypes.string
};

export default OrganizationAdminSiderOptions;
