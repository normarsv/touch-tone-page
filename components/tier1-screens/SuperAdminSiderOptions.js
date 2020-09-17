import {
  AppstoreFilled,
  UnorderedListOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Space } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import UserInfo from "../user/UserInfo";

const SuperAdminSiderOptions = ({ openSideMenu }) => {
  const [menuItem, setSelectedMenuItem] = useState("organizations");

  const router = useRouter();

  console.log(router.route.includes("organizations"));

  useEffect(() => {
    if (router.route.includes("organizations")) {
      setSelectedMenuItem("organizations");
    } else if (router.route.includes("users")) {
      setSelectedMenuItem("users");
    }
  }, []);

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
        selectedKeys={[menuItem]}
        style={{
          backgroundColor: "#ededed",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!openSideMenu && (
          <div style={{ width: "82%" }}>
            <h4>Organizations</h4>
          </div>
        )}

        <Menu.Item
          onClick={() => router.push("/list-organizations")}
          icon={<UnorderedListOutlined />}
          key="organizations"
        >
          List all Organizations
        </Menu.Item>
        <Divider style={{ margin: "0.1rem 0" }} />
        <Menu.Item
          // onClick={() => router.push("/list-organizations")}
          icon={<IdcardOutlined />}
          key="2"
        >
          List all Roles
        </Menu.Item>
        <Divider style={{ margin: "0.1rem 0" }} />

        <Menu.Item
          onClick={() => router.push("/list-users")}
          icon={<UserOutlined />}
          key="users"
        >
          List all Users
        </Menu.Item>
        <Divider style={{ margin: "0.1rem 0" }} />
      </Menu>
    </div>
  );
};

SuperAdminSiderOptions.propTypes = {
  // someData: PropTypes.string
};

export default SuperAdminSiderOptions;
