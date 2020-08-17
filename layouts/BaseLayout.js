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
import SiderOptions from "../components/base/SiderOptions";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const BaseLayout = (props) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <Layout>
      <Header className="menu-header-layout">
        <HeaderMenu />
      </Header>
      <Layout className="sider-main-layout">
        <Sider
          collapsible
          collapsed={openSideMenu}
          onCollapse={() => setOpenSideMenu(!openSideMenu)}
          className="sider-style"
          width="250px"
        >
          <SiderOptions openSideMenu={openSideMenu} />
        </Sider>
        <Layout className="content-main-layout">
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
