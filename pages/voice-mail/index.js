import moment from 'moment/min/moment-with-locales.js';
import { Component, useState } from 'react';

import API from '../../API/API';
import VoiceMail from '../../components/tier3-screens/VoiceMail';
import { BaseLayout } from '../../layouts/BaseLayout';
// import 'react-h5-audio-player/lib/styles.css';

function VoiceMailPage(props) {
  const { voiceMailContent, user, voiceMails } = props;
  const [currentVoiceMailContent, setCurrentVoiceMailContent] = useState(
    voiceMailContent
  );

  const getVoiceMailContent = async () => {
    const voiceMailContent = [];
    const api = new API(user.token);
    const resVoiceMail = await api.GET('/Services/voicemails');
    const voiceMails = resVoiceMail.response;

    for (const voiceMail of voiceMails) {
      const addVoiceMail = {
        // id: voiceMail,
        date: moment(voiceMail.date).format('LLL'),
        fileName: voiceMail.filE_NAME,
        duration: voiceMail.duration,
        actions: voiceMail.filE_NAME,
      };
      voiceMailContent.push(addVoiceMail);
    }
    setCurrentVoiceMailContent(voiceMailContent);
  };

  return (
    <BaseLayout>
      <VoiceMail
        voiceMailTableData={currentVoiceMailContent}
        getVoiceMailContent={() => getVoiceMailContent()}
      />
    </BaseLayout>
  );
}

VoiceMailPage.getInitialProps = async ({ res, query, user }) => {
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

        case 'CorporateService':
        case 'OrganizationAdmin':
          res.writeHead(302, {
            Location: '/admin-dashboard',
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

  const voiceMailContent = [];

  const api = new API(user.token);
  const resVoiceMail = await api.GET('/Services/voicemails');
  const voiceMails = resVoiceMail.response;
  for (const voiceMail of voiceMails) {
    const addVoiceMail = {
      // id: voiceMail,
      date: moment(voiceMail.date).format('LLL'),
      fileName: voiceMail.filE_NAME,
      duration: voiceMail.duration,
      actions: voiceMail.filE_NAME,
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
