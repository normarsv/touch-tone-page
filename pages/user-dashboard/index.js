import Router from 'next/router';
import { Component } from 'react';

import MainDashboard from '../../components/base/MainDashboard';
import { BaseLayout } from '../../layouts/BaseLayout';
import { systemLog } from '../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (user.group) {
      switch (user.group) {
        case 'BusinessSupport':
        case 'SuperAdmin':
          if (res) {
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();
            return {};
          } else {
            Router.push('/list-organizations');
            return {};
          }
        case 'Distributor':
          if (res) {
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();
            return {};
          } else {
            Router.push('/list-organizations');
            return {};
          }
        case 'CorporateService':
        case 'OrganizationAdmin':
          if (res) {
            res.writeHead(302, {
              Location: '/admin-dashboard',
            });
            res.end();
            return {};
          } else {
            Router.push('/admin-dashboard');
            return {};
          }
          break;
        default:
          break;
      }
    } else {
      if (res) {
        res.writeHead(302, {
          Location: '/not-valid-token',
        });
        res.end();
        return {};
      } else {
        Router.push('/not-valid-token');
        return {};
      }
    }

    let endUserDashboardContent = [
      user.role === 'EndUser' && user.userType !== 1
        ? {
            id: 1,
            title: 'Personal Meeting Room',
            count: '',
            desc:
              'Mange your meetings. This virtual meeting room is reserved for your personal use. Start an instant meeting, or schedule one for a later date.',
            buttonTitle: 'View All Meetings',
            route: '/meetings',
          }
        : undefined,
      {
        id: 2,
        title: 'Voicemail',
        count: '9 New Voicemails',
        desc:
          'Manage your voicemail messages. Play, delete and save voicemail messages. Voicemails are synced between your desktop client and mobile app.',
        buttonTitle: 'View All Voicemails',
        route: '/voice-mail',
      },
      {
        id: 3,
        title: 'Find Me Follow Me',
        count: '',
        desc:
          `Manage how and where you receive your calls. Direct calls made to your extension to
          another extension, another number (like a cell phone), a call queue, or a
          voicemail box. Calls can be configured to ring multiple phones simultaneously
          or in a specific order.`,
        buttonTitle: 'View Find Me Follow Me',
        route: '/telephony-features/my-findme',
      },
      // {
      //   id: 4,
      //   title: 'Find Me Follow Me',
      //   count: '',
      //   desc:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      //   buttonTitle: 'View My Find Me',
      //   route: '/telephony-features/my-findme',
      // },
      {
        id: 5,
        title: 'Speed Dials',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View Speed Dials',
        route: '/telephony-features/speed-dials',
      },
      /*
      {
        id: 4,
        title: 'Call Records',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View Call Records',
        route: '/call-records',
      },
      */
      /*
      {
        id: 5,
        title: 'Conference Room',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View All Conference Room',
        route: '/audio-conference',
      },
      */
    ];
    endUserDashboardContent = endUserDashboardContent.filter(function (x) {
      return x !== undefined;
    });

    return {
      user,
      endUserDashboardContent,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = '';
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    const { endUserDashboardContent } = this.props;

    return (
      <BaseLayout>
        <MainDashboard mainDashboardContent={endUserDashboardContent} />
      </BaseLayout>
    );
  }
}
