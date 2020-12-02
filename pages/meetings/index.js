import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';

import API from '../../API/API';
import Meetings from '../../components/tier2-screens/Meetings';
import { BaseLayout } from '../../layouts/BaseLayout';
import { systemLog } from '../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case 'SuperAdmin':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();

            break;

          case 'BusinessSuport':
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

    const meetingsContent = [];

    const api = new API(user.token);
    const resMeetings = await api.GET('/Meetings');
    const meetings = resMeetings.response;

    for (const meeting of meetings) {
      const createMeeting = {
        id: meeting.id,
        name: meeting.name,
        date: moment(meeting.validSince).format('L'),
        startTime: moment(meeting.validSince).format('LT'),
        endTime: moment(meeting.validUntil).format('LT'),
        url: meeting.url,
      };
      meetingsContent.push(createMeeting);
    }

    return {
      user,
      meetingsContent,
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
    const { meetingsContent } = this.props;

    return (
      <BaseLayout>
        <Meetings meetingsContent={meetingsContent} />
      </BaseLayout>
    );
  }
}
