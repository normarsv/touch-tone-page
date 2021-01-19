import {
  AppstoreFilled,
  LogoutOutlined,
  PhoneOutlined,
  SettingFilled,
  StarFilled,
} from "@ant-design/icons";
import { Menu, Space } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";

import { removeAppUser } from "../../scripts/General";
import { siderLinks } from "../../scripts/MainInfoData";
import { UserContext } from "../authentication/UserContext";
import UserInfo from "../user/UserInfo";

const SiderOptions = ({ openSideMenu, role }) => {
  const { userInfo } = useContext(UserContext);
  const router = useRouter();
  const linksArray = siderLinks(role);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [selectedSubmenuItem, setSelectedSubmenuItem] = useState([""]);

  let siderTitle = "";
  switch (role) {
    case "BusinessSupport":
      siderTitle = "Business Support Controls";
      break;
    case "SuperAdmin":
      siderTitle = "Super Admin Controls";
      break;
    case "CorporateService":
      siderTitle = "Corporate Service";
      break;
    case "OrganizationAdmin":
      siderTitle = "Organization Admin";
      break;
    case "EndUser":
      siderTitle = "End User";
      break;
  }

  useEffect(() => {
    if (router.route) {
      setSelectedMenuItem(router.route.replace(/[/-]+/g, ""));
      if ((router.route.match(/\//g) || []).length > 1) {
        setSelectedSubmenuItem([
          router.route.split("/")[1].replace(/[/-]+/g, "") + "submenu",
        ]);
      }
    }
  }, []);

  const onOpenChange = (openKeys) => {
    // console.log("this is openkeys", openKeys);
    const latestOpenKey = openKeys.find((key) => {
      return selectedSubmenuItem.indexOf(key) === -1;
    });
    setSelectedSubmenuItem(latestOpenKey ? [latestOpenKey] : [""]);
  };

  const renderMenuOptions = (menuToDisplay) => {
    // console.log(menuToDisplay);
    let finalOptions = menuToDisplay;
    if (userInfo.userType === 1 && userInfo.role === "EndUser") {
      finalOptions = menuToDisplay.splice(1, 1);
    }

    return finalOptions.map((section, index) => {
      return (
        <Menu.ItemGroup key={index} title={section.sectionTitle}>
          {section.links &&
            section.links.map((menuItem, index) => {
              // console.log(menuItem);
              if (menuItem.submenu && menuItem.submenu.length > 0) {
                // Is submenu
                // console.log('this is submenu render key',menuItem.submenu[0].url.split('/')[1].replace(/[/-]+/g,'')+"submenu")
                return (
                  <SubMenu
                    key={
                      menuItem.submenu[0].url
                        .split("/")[1]
                        .replace(/[/-]+/g, "") + "submenu"
                    }
                    icon={menuItem.icon}
                    title={menuItem.label}
                    // className="side-menu-submenu-style"
                  >
                    {menuItem.submenu.map((submenuItem) => {
                      // console.log('this is render key',submenuItem.url.replace(/[/-]+/g,''))

                      return (
                        <Menu.Item
                          key={submenuItem.url.replace(/[/-]+/g, "")}
                          onClick={() => router.push(submenuItem.url)}
                        >
                          {submenuItem.label}
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item
                  onClick={() => router.push(menuItem.url)}
                  icon={menuItem.icon}
                  key={menuItem.url.replace(/[/-]+/g, "")}
                >
                  {menuItem.label}
                </Menu.Item>
              );
            })}
          <Menu.Divider style={{ margin: "0.1rem 0" }} />
        </Menu.ItemGroup>
      );
    });
  };

  return (
    <>
      <UserInfo openSideMenu={openSideMenu} />
      <Menu
        mode="inline"
        selectedKeys={[selectedMenuItem]}
        openKeys={selectedSubmenuItem}
        onOpenChange={onOpenChange}
        className="side-menu-options-parent-div"
        forceSubMenuRender={true}
      >
        <Menu.ItemGroup
          title={
            <h4>
              <AppstoreFilled /> {siderTitle}
            </h4>
          }
        />
        <Menu.Divider />

        {/* Menu options function */}
        {renderMenuOptions(linksArray)}

        {/* Static options by role */}
        {role === "EndUser" && (
          <Menu.Item
            onClick={() => {
              router.push("/frequent-numbers");
            }}
            icon={<StarFilled />}
            key="frequentnumbers"
          >
            Frequent Numbers
          </Menu.Item>
        )}
        {role === "EndUser" && <Menu.Divider style={{ margin: "0.1rem 0" }} />}

        {/* Account details for all roles */}
        <Menu.Item
          onClick={() => {
            router.push("/account-details");
          }}
          icon={<SettingFilled />}
          key="accountdetails"
        >
          Account Details
        </Menu.Item>

        <Menu.Divider
          className="logout-menu-item"
          style={{ margin: "0.1rem 0" }}
        />

        {role === "EndUser" && (
          <Menu.Item
            onClick={() => {
              console.log("use phone");
            }}
            icon={<PhoneOutlined />}
            key="use-phone"
            className="logout-menu-item"
          >
            Use Phone
          </Menu.Item>
        )}
        {role === "EndUser" && (
          <Menu.Divider
            className="logout-menu-item"
            style={{ margin: "0.1rem 0" }}
          />
        )}

        <Menu.Item
          onClick={() => {
            removeAppUser();
            router.replace("/");
          }}
          icon={<LogoutOutlined />}
          key="logout"
          className="logout-menu-item"
        >
          Log out
        </Menu.Item>
        <Menu.Divider
          className="logout-menu-item"
          style={{ margin: "0.1rem 0" }}
        />
      </Menu>
      {!openSideMenu && (
        <>
          <Space direction="vertical" id="Need help?" className="info-wrapper">
            <h5 className="title-style"> Need help? </h5>
            <a href="tel:">Call 800 900 5474</a>
          </Space>
          <div className="slogan">
            <p className="inner-p">TouchTone Communications Control Center</p>
          </div>
        </>
      )}
    </>
  );
};

SiderOptions.propTypes = {
  openSideMenu: PropTypes.bool,
  role: PropTypes.string,
};

export default SiderOptions;
