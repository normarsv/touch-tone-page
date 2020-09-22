import {
  AppstoreFilled,
  UnorderedListOutlined,
  UserOutlined,
  IdcardOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Divider, Menu, Space } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
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

  return (
    <div className="sider-style">
      <div>
        <UserInfo openSideMenu={openSideMenu} />
      </div>
      {!openSideMenu && (
        <div className="side-menu-title-div">
          <Space className="flex-center">
            <AppstoreFilled /> <h4>Super Admin Controls</h4>
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
        {!openSideMenu && (
          <div className="side-menu-options-title">
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

        {!openSideMenu && (
          <div className="side-menu-options-title">
            <h4>Users</h4>
          </div>
        )}

        <Menu.Item
          onClick={() => router.push("/list-users")}
          icon={<UserOutlined />}
          key="users"
        >
          List all Users
        </Menu.Item>
        <SubMenu
          key="newUser"
          icon={<PlusCircleFilled />}
          title="New User"
          className="side-menu-submenu-style"
        >
          <Menu.Item
            key="newUser"
            onClick={() => router.push("/list-users/new-user")}
          >
            Add User
          </Menu.Item>
          <Menu.Item
            key="bulkImport"
            onClick={() => router.push("/list-users/bulk-import")}
          >
            Add by Bulk
          </Menu.Item>
        </SubMenu>
        <Divider style={{ margin: "0.1rem 0" }} />
      </Menu>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {!openSideMenu && (
          <>
            <Space style={{ padding: "1rem 1.5rem" }} id="Need help?">
              <h5 className="title-style"> Need help? </h5>
              <a href="tel:">Call 800 900 5464</a>
            </Space>
            <Space className="side-menu-bottom-text " id="Need help?">
              <p>TouchTone Communications Control Center</p>
            </Space>
          </>
        )}
      </div>
    </div>
  );
};

SuperAdminSiderOptions.propTypes = {
  // someData: PropTypes.string
};

export default SuperAdminSiderOptions;
