import { Component } from 'react';
import Router from 'next/router';

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
        case 'EndUser':
          if (res) {
            res.writeHead(302, {
              Location: '/user-dashboard',
            });
            res.end();
            return {};
          } else {
            Router.push('/user-dashboard');
            return {};
          }
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
    const adminDashboardContent = [
      {
        id: 1,
        title: 'Manage Users',
        count: '9 Users',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View all Users',
        route: '/manage-users',
      },
      {
        id: 2,
        title: 'Queues',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View Queues',
        route: '/queues',
      },
      {
        id: 3,
        title: 'Auto attendant',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View Auto attendant',
        route: '/auto-attendant',
      },
      {
        id: 4,
        title: 'Call Records',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View Call Records',
        route: '/telephony-features/call-recordings',
      },
      // {
      //   id: 5,
      //   title: "Call Reporting",
      //   count: "",
      //   desc:
      //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      //   buttonTitle: "View Calls Reporting",
      //   route: "/telephony-features/call-reporting",
      // },
      /*
      {
        id: 6,
        title: "Meeting",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Mettings",
        route: "/meetings",
      },
      */
      {
        id: 7,
        title: 'Ring Groups',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View Ring Groups',
        route: '/auto-attendant/ring-group',
      },
      {
        id: 8,
        title: 'Audio Conference Room',
        count: '',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        buttonTitle: 'View More',
        route: '/audio-conference',
      },
    ];

    return {
      user,
      adminDashboardContent,
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
    const { adminDashboardContent } = this.props;

    return (
      <BaseLayout>
        <MainDashboard mainDashboardContent={adminDashboardContent} />
      </BaseLayout>
    );
  }
}
