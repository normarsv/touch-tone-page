import moment from 'moment/min/moment-with-locales.js';
import Router from 'next/router';
import { Component } from 'react';

import AutoAttendantDetails from '../../../components/tier2-screens/auto-attendant/AutoAttendantDetails';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';
import { baseLanguage } from '../../../scripts/MainInfoData';

export default class extends Component {
  static async getInitialProps({ query, user, res }) {
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

    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

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
      currentLanguage,
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
        <AutoAttendantDetails />
      </BaseLayout>
    );
  }
}
