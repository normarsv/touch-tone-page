import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';
import Router from 'next/router';

import AudioConference from '../../components/tier2-screens/conference-room/AudioConference';
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
    const audioConferenceContent = [
      {
        id: 1,
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
        desc: 'Organization Welcome Message',
        accessCode: '123123456456',
        actions: ['01'],
        enable: true,
      },
      {
        id: 2,
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
        desc: 'Charge in tech support',
        accessCode: '123123456456',
        actions: ['02'],
        enable: true,
      },
      {
        id: 3,
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
        desc: 'Organization Welcome Message 2',
        accessCode: '123123456456',
        actions: ['03'],
        enable: false,
      },
      {
        id: 4,
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
        desc: 'Organization Welcome Message 3',
        accessCode: '123123456456',
        actions: ['04'],
        enable: true,
      },
      {
        id: 5,
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
        desc: 'Organization Welcome Message 4',
        accessCode: '123123456456',
        actions: ['05'],
        enable: false,
      },
      {
        id: 6,
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
        desc: 'Organization Welcome Message 5',
        accessCode: '123123456456',
        actions: ['06'],
        enable: false,
      },
      {
        id: 7,
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
        desc: 'Organization Welcome Message 6',
        accessCode: '123123456456',
        actions: ['07'],
        enable: false,
      },
      {
        id: 8,
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
        desc: 'Organization Welcome Message 7',
        accessCode: '123123456456',
        actions: ['08'],
        enable: true,
      },
    ];

    return {
      user,
      audioConferenceContent,
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
    const { audioConferenceContent } = this.props;

    return (
      <BaseLayout>
        <AudioConference audioConferenceContent={audioConferenceContent} />
      </BaseLayout>
    );
  }
}
