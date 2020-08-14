import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import HeaderMenu from "../components/base/HeaderMenu";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const BaseLayout = (props) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "0px 6px 15px 1px rgba(0,0,0,0.10)",
        }}
      >
        <HeaderMenu />
      </Header>
      <Layout
        style={{ minHeight: "100vh", width: "100%", position: "relative" }}
      >
        <Sider
          collapsible
          collapsed={openSideMenu}
          onCollapse={() => setOpenSideMenu(!openSideMenu)}
          style={{
            marginTop: 64,
            backgroundColor: "#ededed",
            position: "relative",
          }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{
              position: "sticky",
              top: 64,
              backgroundColor: "#ededed",
              width: "100%",
            }}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} />
          </Menu>
        </Sider>
        <Layout style={{ margin: "64px 0 0 0", overflow: "initial" }}>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

BaseLayout.propTypes = {
  // someData: PropTypes.string,
};

export default BaseLayout;
