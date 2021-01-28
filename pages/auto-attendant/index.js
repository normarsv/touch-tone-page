import Router from 'next/router';
import { Component } from 'react';

import AutoAttendant from '../../components/tier2-screens/auto-attendant/Autoattendant';
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

    const autoAttendantTableContent = [
      {
        id: 1,
        name: 'Welcome GS',
        description: 'Organization Welcome Message',
        did: '33278779099',
        actions: 'welcomeGS',
      },
      {
        id: 2,
        name: 'Tech Support',
        description: 'Tech Support',
        did: '33278779099',
        actions: 'tech-support',
      },
      {
        id: 3,
        name: 'Auto attendant',
        description: 'Auto attendant',
        did: '33278779099',
        actions: 'auto-attendant',
      },
      {
        id: 4,
        name: 'Welcome GS',
        description: 'Organization Welcome Message',
        did: '33278779099',
        actions: 'welcomeGS',
      },
      {
        id: 5,
        name: 'Tech Support',
        description: 'Tech Support',
        did: '33278779099',
        actions: 'tech-support',
      },
      {
        id: 6,
        name: 'Auto attendant',
        description: 'Auto attendant',
        did: '33278779099',
        actions: 'auto-attendant',
      },
    ];

    return {
      user,
      autoAttendantTableContent,
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
    const { autoAttendantTableContent } = this.props;

    return (
      <BaseLayout>
        <AutoAttendant autoAttendantTableContent={autoAttendantTableContent} />
      </BaseLayout>
    );
  }
}
