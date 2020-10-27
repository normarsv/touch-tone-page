import { Affix, Layout, Menu } from "antd";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../components/authentication/UserContext";
import HeaderMenu from "../components/base/HeaderMenu";
import SiderOptions from "../components/base/SiderOptions";
import SuperAdminSiderOptions from "../components/tier1-screens/SuperAdminSiderOptions";
import OrganizationAdminSiderOptions from "../components/tier2-screens/OrganizationAdminSiderOptions";
import EndUserSiderOptions from "../components/tier3-screens/EndUserSiderOptions";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export const BaseLayout = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const bodyRef = useRef(null);

  const { userInfo } = useContext(UserContext);

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

  return (
    <Layout>
      <Header className="menu-header-layout">
        <HeaderMenu openSideMenu={openSideMenu} mainBodyRef={bodyRef} />
      </Header>
      <Layout className="sider-main-layout">
        {userInfo.name && (
          <Affix offsetTop={0}>
            <Sider
              collapsible
              collapsed={openSideMenu}
              onCollapse={() => setOpenSideMenu(!openSideMenu)}
              className="sider-style show-only-desktop"
              width="250px"
            >
              {menuToRender(userInfo)}
            </Sider>
          </Affix>
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
