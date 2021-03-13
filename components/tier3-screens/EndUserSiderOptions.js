import { AppstoreFilled } from '@ant-design/icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faHeadphones,
  faListAlt,
  faMapMarker,
  faMicrophone,
  faPhone,
  faPhoneVolume,
  faTh,
  faThList,
  faTty,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Menu, Space } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

import UserInfo from '../user/UserInfo';

const EndUserSiderOptions = ({ openSideMenu }) => {
  const [menuItem, setSelectedMenuItem] = useState('admin');

  const router = useRouter();

  console.log(router.route.includes('organizations'));

  useEffect(() => {
    if (router.route.includes('organizations')) {
      setSelectedMenuItem('organizations');
    } else if (router.route.includes('list-users')) {
      if (router.route.includes('list-users') && router.route.includes('new')) {
        setSelectedMenuItem('newUser');
      } else if (
        router.route.includes('list-users') &&
        router.route.includes('bulk')
      ) {
        setSelectedMenuItem('bulkImport');
      } else {
        setSelectedMenuItem('users');
      }
    }
  }, []);

  const endUserMenuContent = {
    endUserOptions: [
      {
        id: 1,
        key: 'voiceMail',
        title: 'Voicemail',
        icon: faEnvelope,
        route: 'voice-mail',
        subOptions: [],
      },
      {
        id: 1,
        key: 'meeting',
        title: 'Personal Meeting Room',
        icon: faUsers,
        route: 'meetings',
        subOptions: [],
      },
      {
        id: 2,
        key: 'callRecords',
        title: 'Call Records',
        icon: faListAlt,
        route: 'call-records',
        subOptions: [],
      },
      {
        id: 3,
        key: 'conferenceRoom',
        title: 'Conference Room',
        icon: faHeadphones,
        route: 'audio-conference',
        subOptions: [],
      },
      {
        id: 4,
        key: 'terminationEntries',
        title: 'Termination Entries',
        icon: faTh,
        route: 'web-rtc-meeting',
      },
      {
        id: 5,
        key: 'queues',
        title: 'Queues',
        icon: faThList,
        route: 'queues',
      },
    ],
    telephonyFeaturesOptions: [
      {
        id: 1,
        key: 'callForwarding',
        title: 'Call Forwarding',
        icon: faPhone,
        route: '/telephony-features/call-forwarding',
      },
      {
        id: 2,
        key: 'callForwardSelective',
        title: 'Call Forward Selective',
        icon: faPhoneVolume,
        route: '/telephony-features/call-forward-selective',
      },
      {
        id: 3,
        key: 'myFindMe',
        title: 'Find Me Follow Me',
        icon: faMapMarker,
        route: '/telephony-features/ring-groups',
      },
      {
        id: 4,
        key: 'speedDials',
        title: 'Speed Dials',
        icon: faTty,
        route: '/telephony-features/speed-dials',
      },
      {
        id: 5,
        key: 'callRecordings',
        title: 'Call Recordings',
        icon: faMicrophone,
        route: '/telephony-features/call-recordings',
      },
    ],
  };

  return (
    <div className='sider-style'>
      <div>
        <UserInfo openSideMenu={openSideMenu} />
      </div>
      {!openSideMenu && (
        <div className='side-menu-title-div left'>
          <Space className='padding-title'>
            <AppstoreFilled /> <h4>End User</h4>
          </Space>
          <Divider style={{ margin: '0.5rem 0' }} />
        </div>
      )}
      <Menu
        mode='inline'
        selectedKeys={menuItem}
        className='side-menu-options-parent-div'
        id='Menu div'
      >
        {endUserMenuContent.endUserOptions.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => router.push(item.route)}
              key={item.key}
              icon={
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{
                    marginRight: !openSideMenu && '0.5rem',
                    width: '1rem',
                  }}
                />
              }
              title={item.title}
              style={{ margin: 0 }}
            >
              {!openSideMenu && item.title}
            </Menu.Item>
          );
        })}

        <Divider style={{ margin: '0.1rem 0' }} />
        {!openSideMenu && (
          <div className='side-menu-title-div leftsecondary '>
            <Space className='padding-title'>
              <h4>Features</h4>
            </Space>
          </div>
        )}

        {endUserMenuContent.telephonyFeaturesOptions.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => router.push(item.route)}
              key={item.key}
              icon={
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{
                    marginRight: !openSideMenu && '0.5rem',
                    width: '1rem',
                  }}
                />
              }
              title={item.title}
              style={{ margin: 0 }}
            >
              {!openSideMenu && item.title}
            </Menu.Item>
          );
        })}
      </Menu>
      <Menu
        mode='inline'
        selectedKeys={menuItem}
        className='side-menu-options-parent-div'
        id='Menu div'
      >
        <Divider style={{ margin: '0.1rem 0' }} />
      </Menu>

      {!openSideMenu && (
        <>
          <Space
            style={{ padding: '1rem 1.5rem' }}
            direction='vertical'
            id='Need help?'
          >
            <h5 className='title-style'> Need help? </h5>
            <a href='tel:'>Call 800 900 5474</a>
          </Space>
          {/* <Space className="side-menu-bottom-text " id="Need help?">
              <p>TouchTone Communications Control Center</p>
            </Space> */}
        </>
      )}
    </div>
  );
};

EndUserSiderOptions.propTypes = {
  // someData: PropTypes.string
};

export default EndUserSiderOptions;
