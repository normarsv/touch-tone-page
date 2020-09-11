import {
  AppstoreFilled,
  UnorderedListOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Menu, Space } from "antd";
import { useRouter } from "next/dist/client/router";
import React from "react";
import UserInfo from "../user/UserInfo";

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
          icon={<IdcardOutlined />}
          key="2"
        >
          List all Roles
        </Menu.Item>
        {divider("0.1 0")}

        <Menu.Item
          onClick={() => router.push("/list-users")}
          icon={<UserOutlined />}
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
