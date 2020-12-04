import moment from 'moment/min/moment-with-locales.js';
import { Component, useState } from 'react';

import API from '../../API/API';
import Meetings from '../../components/tier2-screens/Meetings';
import { BaseLayout } from '../../layouts/BaseLayout';

function MeetingsPage(props) {
  const { meetingsContent, user } = props;
  const [currentMeetingsContent, setCurrentMeetingsContent] = useState(
    meetingsContent
  );

  const getMeetingsContent = async () => {
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
        ddi: meeting.ddi,
      };
      meetingsContent.push(createMeeting);
    }
    setCurrentMeetingsContent(meetingsContent);
  };

  return (
    <BaseLayout>
      <Meetings
        meetingsContent={currentMeetingsContent}
        getMeetingsContent={getMeetingsContent}
        user={user}
      />
    </BaseLayout>
  );
}
MeetingsPage.getInitialProps = async ({ res, query, user }) => {
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
      ddi: meeting.ddi,
    };
    meetingsContent.push(createMeeting);
  }

  return {
    user,
    meetings,
    meetingsContent,
    resMeetings,
  };
};

export default MeetingsPage;
