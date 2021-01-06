import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';

import VoiceMail from '../../components/tier3-screens/VoiceMail';
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

    const voiceMailTableData = [
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
        sender: 'Peter Lock',
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
        sender: 'Anna Frias',
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
        sender: 'Samuel Harlock',
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
        sender: 'Sebastian Bones',
        totalTalkTime: '00:02:40',
      },
    ];

    return {
      voiceMailTableData,
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
    const { voiceMailTableData } = this.props;

    return (
      <BaseLayout>
        <VoiceMail voiceMailTableData={voiceMailTableData} />
      </BaseLayout>
    );
  }
}
