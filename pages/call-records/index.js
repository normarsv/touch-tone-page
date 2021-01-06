import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';

import CallRecords from '../../components/tier3-screens/CallRecords';
import { BaseLayout } from '../../layouts/BaseLayout';
import { systemLog } from '../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case 'BusinessSupport':
          case 'SuperAdmin':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();

            break;

          case 'Distributor':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();

            break;

          case 'OrganizationAdmin':
            res.writeHead(302, {
              Location: '/admin-dashboard',
            });
            res.end();

            break;

          default:
            break;
        }
      } else {
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
      }
    }

    const callRecordsTableData = [
      {
        key: '1',
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
        userName: 'Peter Lock',
        type: 'Inbound Call',
        totalTalkTime: '00:02:10',
      },
      {
        key: '2',
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
        userName: 'Anna Frias',
        type: 'Inbound Call',
        totalTalkTime: '00:02:00',
      },
      {
        key: '3',
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
        userName: 'Samuel Harlock',
        type: 'Inbound Call',
        totalTalkTime: '00:01:34',
      },
      {
        key: '4',
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
        userName: 'Sebastian Bones',
        type: 'Inbound Call',
        totalTalkTime: '00:02:40',
      },
    ];

    return {
      callRecordsTableData,
      user,
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
    const { callRecordsTableData } = this.props;

    return (
      <BaseLayout>
        <CallRecords callRecordsTableData={callRecordsTableData} />
      </BaseLayout>
    );
  }
}
