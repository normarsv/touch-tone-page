import { faChevronDown, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Dropdown, Menu, Row } from 'antd';
import { motion, useCycle } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useRef, useState } from 'react';

import { removeAppUser } from '../../scripts/General';
import { UserContext } from '../authentication/UserContext';
import { MenuToggle } from './MenuToggle';
import SiderOptions from './SiderOptions';

const menuDiv = {
  open: {
    zIndex: 10,
    opacity: 1,
    x: '0',
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
  closed: {
    zIndex: 0,
    opacity: 0,
    x: '100%',
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
};

const HeaderMenu = ({ mainBodyRef, openSideMenu }) => {
  const [isOpen, setOpenMenu] = useCycle(false, true);
  const { userInfo } = useContext(UserContext);
  const [routeToGo, setRouteToGo] = useState();
  const router = useRouter();

  let finalRoute;

  // function menuToRender(userInfo) {
  //   switch (userInfo.group) {
  //     case 'BusinessSupport':
  //     case "SuperAdmin":
  //       return <SuperAdminSiderOptions openSideMenu={openSideMenu} />;
  //       break;

  //     case "OrganizationAdmin":
  //       return <OrganizationAdminSiderOptions openSideMenu={openSideMenu} />;
  //       break;

  //     case "EndUser":
  //       return <EndUserSiderOptions openSideMenu={openSideMenu} />;
  //       break;

  //     default:
  //       return <SiderOptions openSideMenu={openSideMenu} />;
  //       break;
  //   }
  // }

  useEffect(() => {
    switch (userInfo.group) {
      case 'BusinessSupport':
      case 'SuperAdmin':
        setRouteToGo('list-organizations');
        break;

      case 'OrganizationAdmin':
        setRouteToGo('admin-dashboard');
        break;

      case 'EndUser':
        setRouteToGo('user-dashboard');
        break;
      default:
        break;
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <a
          onClick={() => {
            router.replace('/reset-password');
          }}
        >
          Reset Password
        </a>
      </Menu.Item>
      <Menu.Item key='1'>
        <a
          onClick={() => {
            removeAppUser();
            router.replace('/');
          }}
        >
          Log out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row className='menu-main-div'>
      <Col flex='50%' className='page-side-menu-logo-container'>
        <a
          onClick={() => {
            router.replace('/' + routeToGo);
          }}
          id='menu-header-logo'
        >
          <img className='page-side-menu-logo' src={'/logo.jpg'} />
        </a>
      </Col>
      <Col flex='50%'>
        <Row type='flex' align='middle' justify='end'>
          {userInfo.role === 'EndUser' ? (
            <Button type='primary' className='account-avatar'>
              <FontAwesomeIcon
                icon={faPhone}
                style={{ marginRight: '0.5rem' }}
              />{' '}
              Use Phone
            </Button>
          ) : userInfo.name === undefined ? (
            <Col className='header-menu-need-help'>
              <span>
                Need help? <a href='#'>Call 800 900 5464</a>
              </span>
            </Col>
          ) : (
            <div />
          )}
          {userInfo.name ? (
            <Dropdown overlay={menu} className='account-avatar'>
              <div className='menu-top-right-options logged-in'>
                <FontAwesomeIcon
                  icon={faUser}
                  className='menu-user-status logged-in'
                />
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Dropdown>
          ) : null}
          {userInfo.name ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className='burger-icon'
            >
              <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
                <MenuToggle
                  animate={isOpen ? 'open' : 'closed'}
                  toggle={() => setOpenMenu()}
                />
              </motion.nav>
            </div>
          ) : null}
        </Row>
      </Col>

      {userInfo.name && (
        <motion.div
          initial={false}
          variants={menuDiv}
          animate={isOpen ? 'open' : 'closed'}
          className='mobile-hamburger-menu'
        >
          {/* {menuToRender(userInfo)} */}
          <SiderOptions openSideMenu={openSideMenu} role={userInfo.group} />
        </motion.div>
      )}
    </Row>
  );
};

HeaderMenu.propTypes = {
  // someData: PropTypes.string
};

export default HeaderMenu;
