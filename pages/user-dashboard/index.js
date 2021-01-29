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

    const endUserDashboardContent = [
      {
        id: 1,
        title: 'Meeting',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View All Meetings',
        route: '/meetings',
      },
      {
        id: 2,
        title: 'Voice Mail',
        count: '9 New Voice Mails',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View all Voice Mails',
        route: '/voice-mail',
      },
      {
        id: 3,
        title: 'My Find Me',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View My Find Me',
        route: '/telephony-features/my-findme',
      },
      {
        id: 4,
        title: 'Account Details',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View Account Details',
        route: '/account-details',
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

    if (user.userType === 1 && user.role === 'EndUser') {
      endUserDashboardContent.splice(0, 1);
    }

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
