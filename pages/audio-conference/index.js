import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/min/moment-with-locales.js';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import API from '../../API/API';
import AudioConference from '../../components/tier2-screens/conference-room/AudioConference';
import { BaseLayout } from '../../layouts/BaseLayout';
//import { systemLog } from '../../scripts/General';

 const AudioConferencePage = ({user, conferences}) => {
    return (
       <BaseLayout>
          <AudioConference audioConferenceContent={conferences}
            getConferences = {()=>getConferences(user)}
          />
        </BaseLayout>
    );
  };

  const getConferences= async (user)=>{ 
    const api = new API(user.token, user.userId);
    const response = await api.GET('/conferences/account');

    console.log('response', response)
    if(response.statusCode == 200)
    {
      return response.response.map((item, index)=>{
        return {
          ConferenceReservedId: item.CONFERENCE_RESERVED_ID,
          Description: item.DESCRIPTION,
          Account: item.ACCOUNT,
          AccessCode:item.ACCESS_CODE,
          Password: item.PASSWORD,
          Enabled: item.ENABLED,
          MaxParticipants: item.MAX_PARTICIPANTS,
          StartDateTime: item.START_DATE_TIME ? moment(item.START_DATE_TIME, 'YYYY-MM-DD hh:mm:ss').toString() : '',
          Duration: item.DURATION,
          OnHoldPrompt: item.ON_HOLD_PROMPT,
          FullDuplix: item.FULL_DUPLEX,
          ModeratorRequired: item.MODERATOR_REQUIRED,
          PasswordModerator: item.PASSWORD_MODERATOR
        }
    })
    }
    else
      return [];
  }


  AudioConferencePage.getInitialProps = async ({ res, query, user }) => {
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
    let conferences = await getConferences(user);

  
    return{
      user,
      conferences
    };
  }


  export default AudioConferencePage;