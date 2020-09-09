import { useState, useRef, useContext } from "react";
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
import { UserContext } from "../components/authentication/UserContext";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export const BaseLayout = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const bodyRef = useRef(null);

  const { userInfo } = useContext(UserContext);

  return (
    <Layout>
      <Header className="menu-header-layout">
        <HeaderMenu mainBodyRef={bodyRef} />
      </Header>
      <Layout className="sider-main-layout">
        {userInfo.name && (
          <Sider
            collapsible
            collapsed={openSideMenu}
            onCollapse={() => setOpenSideMenu(!openSideMenu)}
            className="sider-style show-only-desktop"
            width="250px"
          >
            <SiderOptions openSideMenu={openSideMenu} />
          </Sider>
        )}

        <Layout className="content-main-layout" ref={bodyRef}>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

BaseLayout.propTypes = {
  // someData: PropTypes.string,
};
