import React from "react";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  AppstoreFilled,
  OrderedListOutlined,
  PlusCircleFilled,
  SearchOutlined,
  IdcardFilled,
} from "@ant-design/icons";
import UserInfo from "../user/UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const SiderOptions = ({ openSideMenu }) => {
  return (
    <div className="sider-style">
      <div>
        <UserInfo openSideMenu={openSideMenu} />
      </div>
      <Menu mode="inline" style={{ backgroundColor: "#ededed" }}>
        <SubMenu
          key="sub1"
          icon={<AppstoreFilled />}
          title="Super Admin Controls"
        >
          <Menu.Item icon={<OrderedListOutlined />} key="1">
            List all Organizations
          </Menu.Item>
          <Menu.Item icon={<IdcardFilled />} key="2">
            Organization Distributor
          </Menu.Item>
          <Menu.Item icon={<SearchOutlined />} key="3">
            Organization Details
          </Menu.Item>
          <Menu.Item icon={<PlusCircleFilled />} key="4">
            New Organization
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub2" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />} />
      </Menu>
    </div>
  );
};

SiderOptions.propTypes = {
  // someData: PropTypes.string
};

export default SiderOptions;
