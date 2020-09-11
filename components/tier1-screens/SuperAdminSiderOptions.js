import React from "react";
import { Divider, Menu, Space } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  AppstoreFilled,
  OrderedListOutlined,
  PlusCircleFilled,
  SearchOutlined,
  IdcardFilled,
  UnorderedListOutlined,
  ProfileFilled,
} from "@ant-design/icons";
import UserInfo from "../user/UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faSquarespace } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/dist/client/router";

const SuperAdminSiderOptions = ({ openSideMenu }) => {
  const router = useRouter();

  const divider = (margin) => {
    return (
      <div
        id="divider"
        style={{
          width: "85%",
          borderBottom: "1px solid #dadada",
          margin: margin,
        }}
      />
    );
  };

  return (
    <div className="sider-style">
      <div>
        <UserInfo openSideMenu={openSideMenu} />
      </div>
      {!openSideMenu && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Space className="flex-center">
            <AppstoreFilled /> <h4>Super Admin Controls</h4>
          </Space>
          <div
            id="divider"
            style={{
              width: "85%",
              borderBottom: "1px solid #dadada",
              margin: "0.5rem 0",
            }}
          />
        </div>
      )}
      <Menu
        mode="inline"
        style={{
          backgroundColor: "#ededed",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Menu.Item
          onClick={() => router.push("/list-organizations")}
          icon={<UnorderedListOutlined />}
          key="1"
        >
          List all Organizations
        </Menu.Item>
        {divider("0.1 0")}
        <Menu.Item
          // onClick={() => router.push("/list-organizations")}
          icon={<UnorderedListOutlined />}
          key="2"
        >
          List all Roles
        </Menu.Item>
        {divider("0.1 0")}

        <Menu.Item
          onClick={() => router.push("/list-users")}
          icon={<UnorderedListOutlined />}
          key="3"
        >
          List all Users
        </Menu.Item>
        {divider("0.1 0")}
      </Menu>
    </div>
  );
};

SuperAdminSiderOptions.propTypes = {
  // someData: PropTypes.string
};

export default SuperAdminSiderOptions;
