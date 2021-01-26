import moment from 'moment/min/moment-with-locales.js';
import Router from 'next/router';
import { Component, useState } from 'react';

import API from '../../API/API';
import VoiceMail from '../../components/tier3-screens/VoiceMail';
import { BaseLayout } from '../../layouts/BaseLayout';

function VoiceMailPage(props) {
  const { voiceMailContent, user, voiceMails } = props;
  const [currentVoiceMailContent, setCurrentVoiceMailContent] = useState(
    voiceMailContent
  );
  console.log(voiceMailContent);

  const getVoiceMailContent = async () => {
    const voiceMailContent = [];
    const api = new API(user.token, user.userId);
    const resVoiceMail = await api.GET('/Services/voicemails');
    const voiceMails = resVoiceMail.response;

    console.log(voiceMails);

    // for (const voiceMail of voiceMails) {
    //   const createMeeting = {
    //     id: voiceMail.id,
    //     name: voiceMail.name,
    //     date: moment(voiceMail.validSince).format('L'),
    //     startTime: moment(voiceMail.validSince).format('LT'),
    //     endTime: moment(voiceMail.validUntil).format('LT'),
    //     url: voiceMail.url,
    //     ddi: voiceMail.ddi,
    //   };
    //   voiceMailContent.push(createMeeting);
    // }
    setCurrentVoiceMailContent(voiceMailContent);
  };

  return (
    <BaseLayout>
      <VoiceMail
        voiceMailTableData={currentVoiceMailContent}
        getVoiceMailContent={getVoiceMailContent}
      />
    </BaseLayout>
  );
}

VoiceMailPage.getInitialProps = async ({ res, query, user }) => {
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

  const voiceMailContent = [];

  const api = new API(user.token, user.userId);
  const resVoiceMail = await api.GET('/Services/voicemails');
  const voiceMails = resVoiceMail.response;
  for (const voiceMail of voiceMails) {
    const addVoiceMail = {
      // id: voiceMail.id,
      date: moment(voiceMail.date).format('LLL'),
      fileName: voiceMail.filE_NAME,
      duration: voiceMail.duration,
    };
    voiceMailContent.push(addVoiceMail);
  }

  return {
    user,
    voiceMails,
    voiceMailContent,
    resVoiceMail,
  };
};

export default VoiceMailPage;
