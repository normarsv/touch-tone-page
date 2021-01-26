import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales.js';
import Router from 'next/router';
import { Component } from 'react';

import HistoryLog from '../../../../components/details-screens/HistoryLog';
import { BaseLayout } from '../../../../layouts/BaseLayout';
import { systemLog } from '../../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (user.group) {
      switch (user.group) {
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

    let data = new Array(10).fill({
      key: '1',
      user: 'Gregory Sanders',
      previous: 'Walmart',
      current: 'Walmart México',
      date: [
        {
          id: 1,
          date: moment().format('L'),
          icon: faCalendarAlt,
        },
        {
          id: 2,
          date: moment().format('LT'),
          icon: faClock,
        },
      ],
    });

    const historyLogDataTable = [
      {
        key: 1,
        user: 'Gregory Sanders',
        previous: 'Walmart',
        current: 'Walmart México',
        date: [
          {
            id: 1,
            date: moment().format('L'),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format('LT'),
            icon: faClock,
          },
        ],
      },
      {
        key: 2,
        user: 'Gregory Sanders 2',
        previous: 'Walmart',
        current: 'Walmart México',
        date: [
          {
            id: 1,
            date: moment().format('L'),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format('LT'),
            icon: faClock,
          },
        ],
      },
      {
        key: 3,
        user: 'Guao',
        previous: 'Walmart',
        current: 'Walmart México',
        date: [
          {
            id: 1,
            date: moment().format('L'),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format('LT'),
            icon: faClock,
          },
        ],
      },
    ];

    return {
      user,
      data,
      historyLogDataTable,
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
    const { historyLogDataTable } = this.props;
    return (
      <BaseLayout>
        <HistoryLog historyLogDataTable={historyLogDataTable} />
      </BaseLayout>
    );
  }
}
