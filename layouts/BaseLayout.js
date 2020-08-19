import React, { useState, useRef } from "react";
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
  const bodyRef = useRef(null);

  return (
    <Layout>
      <Header className="menu-header-layout">
        <HeaderMenu mainBodyRef={bodyRef} />
      </Header>
      <Layout className="sider-main-layout s">
        <Sider
          collapsible
          collapsed={openSideMenu}
          onCollapse={() => setOpenSideMenu(!openSideMenu)}
          className="sider-style show-only-desktop"
          width="250px"
        >
          <SiderOptions openSideMenu={openSideMenu} />
        </Sider>
        <Layout className="content-main-layout" ref={bodyRef}>
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
