import React, { useEffect, useState } from "react";
import { Divider, Menu, Space } from "antd";
import {useRouter} from "next/dist/client/router";
import SubMenu from "antd/lib/menu/SubMenu";
import UserInfo from "../user/UserInfo";
import { siderLinks } from "../../scripts/MainInfoData";
import { removeAppUser } from "../../scripts/General";
import { AppstoreFilled, LogoutOutlined } from "@ant-design/icons";

const SiderOptions = ({ openSideMenu, role }) => {
  const router = useRouter();
  const linksArray = siderLinks(role);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [selectedSubmenuItem, setSelectedSubmenuItem] = useState([""]);

  let siderTitle = "";
  switch (role){
    case "SuperAdmin":
      siderTitle = "Super Admin Controls"
      break;
    case "OrganizationAdmin":
      siderTitle = "Organization Admin"
      break;
    case "EndUser":
      siderTitle = "End User"
      break;
  }
  // console.log(router.route.includes("organizations"));
  // console.log('this is router',router.route)
  useEffect(() => {
    if (router.route) {
      setSelectedMenuItem(router.route.replace(/[/-]+/g,''));
      if((router.route.match(/\//g) || []).length > 1){
        setSelectedSubmenuItem([router.route.split('/')[1].replace(/[/-]+/g,'')+"submenu"])
      }
    }
  }, []);
  
  const onOpenChange = openKeys =>{
    console.log('this is openkeys',openKeys)
    const latestOpenKey = openKeys.find( (key) => {
      // console.log('key',key)
      // console.log('selectedSubmenuItem',selectedSubmenuItem)
      return selectedSubmenuItem.indexOf(key) === -1
    });
    // if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //   setSelectedSubmenuItem(selectedSubmenuItem);
    // } else {
      // console.log('this is latest open key',latestOpenKey)
      setSelectedSubmenuItem(
        latestOpenKey ? [latestOpenKey] : [""],
      );
    // }
  }
  // console.log('this is array', linksArray)
  // console.log('this is selected',selectedMenuItem)
  // console.log('this is selected submenu',selectedSubmenuItem)
  return (
    <>
      <UserInfo openSideMenu={openSideMenu}/>
      <Menu
        mode="inline"
        selectedKeys={[selectedMenuItem]}
        openKeys={selectedSubmenuItem}
        onOpenChange={onOpenChange}
        className="side-menu-options-parent-div"
        forceSubMenuRender={true}
      >
        <Menu.ItemGroup title={<h4><AppstoreFilled/> {siderTitle}</h4>}/>
        <Menu.Divider/>
        {linksArray.map((section,index) => {
          // console.log('this is section',section)
          return ( 
            <Menu.ItemGroup
              key={index}
              title={section.sectionTitle}
            >
              {section.links && section.links.map((menuItem,index)=>{
                if(menuItem.submenu && menuItem.submenu.length > 0){
                  // Is submenu
                  // console.log('this is submenu render key',menuItem.submenu[0].url.split('/')[1].replace(/[/-]+/g,'')+"submenu")
                  return (
                    <SubMenu
                      key={menuItem.submenu[0].url.split('/')[1].replace(/[/-]+/g,'')+"submenu"}
                      icon={menuItem.icon}
                      title={menuItem.label}
                      // className="side-menu-submenu-style"
                    >
                      {menuItem.submenu.map((submenuItem)=>{
                        // console.log('this is render key',submenuItem.url.replace(/[/-]+/g,''))
                        
                        return (
                          <Menu.Item
                            key={submenuItem.url.replace(/[/-]+/g,'')}
                            onClick={() => router.push(submenuItem.url)}
                          >
                            {submenuItem.label}
                          </Menu.Item>
                        )
                      })}
                    </SubMenu>
                  )
                }
                // console.log('this is render key',menuItem.url.replace(/[/-]+/g,''))
                return (
                  <Menu.Item
                    onClick={() => router.push(menuItem.url)}
                    icon={menuItem.icon}
                    key={menuItem.url.replace(/[/-]+/g,'')}
                  >
                    {menuItem.label}
                  </Menu.Item>
                )
              })}
              <Menu.Divider style={{margin: "0.1rem 0"}}/>
            </Menu.ItemGroup>
          )
        })}
        <Menu.Item
          onClick={() => {removeAppUser(); router.replace("/");}}
          icon={<LogoutOutlined />}
          key="logout"
          className="logout-menu-item"
        >
          Log out
        </Menu.Item>
        <Menu.Divider className="logout-menu-item" style={{margin: "0.1rem 0"}}/>
      </Menu>
      {!openSideMenu && (
        <>
          <Space direction="vertical" id="Need help?" className="info-wrapper">
            <h5 className="title-style"> Need help? </h5>
            <a href="tel:">Call 800 900 5474</a>
          </Space>
          {/* <Space className="side-menu-bottom-text " id="Need help?">
              <p>TouchTone Communications Control Center</p>
            </Space> */}
        </>
      )}
    </>
  );
};

SiderOptions.propTypes = {
  // someData: PropTypes.string
};

export default SiderOptions;
