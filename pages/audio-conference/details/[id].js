import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';
import Router from 'next/router';
import { message } from 'antd';
import NewConferenceRoom from '../../../components/tier2-screens/conference-room/NewConferenceRoom';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';
import { baseLanguage } from '../../../scripts/MainInfoData';
import API from '../../../API/API';
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

    const api = new API(user.token, user.userId);
    const resConference = await api.GET('/Conferences/' + query.id);
    const currentConference = resConference.statusCode == 200 ? resConference.response : undefined;

    console.log('currentConference', currentConference)
    const ConferenceForm = {
      generalOptions: {
        type: 'vertical', //horizontal, vertical, inline
        formClassName: 'test-form',
        submit: {
          className: 'primary-button-style',
          text: 'Save',
        },
        reset: {
          className: 'primary-button-style',
          text: 'Clear',
        },
      },
      formInitialValues: currentConference,
      formValidations: (values) => {
        const errors = {};
        // if (!values.name) {
        //   errors.name = 'Meeting name required';
        // }
        // if (!values.startTime) {
        //   errors.startTime = 'Start date required';
        // }
        // if (!values.participants || values.participants.length === 0) {
        //   errors.participants = 'At least 1 destination required';
        // } else {
        //   const validParticipants = [];
        //   for (const participant of values.participants) {
        //     if (IsAValidEmail(participant.email[0])) {
        //       validParticipants.push(participant);
        //     }
        //   }
        //   if (validParticipants.length === 0) {
        //     errors.participants = 'At least 1 destination required';
        //   }
        // }
        return errors;
      },
      formSubmit: async (
        values,
        { setSubmitting, setFieldError, resetForm }
      ) => {
        setSubmitting(true);
  
        console.log(values)
  
        // const paticipants = values.participants.reduce(
        //   (returnArray, currentParticipant) => {
        //     returnArray.push({
        //       email: currentParticipant.email[0],
        //       sendSMS: false,
        //     });
        //     return returnArray;
        //   },
        //   []
        // );
          values.Emails = '';
          try{
            const api = new API(user.token, user.userId);
          const putResponse = await api.PUT('/Conferences', values);
          console.log(putResponse)
        
          if(putResponse.statusCode == 200 || putResponse.statusCode == 201)
          {
            message.success('Conference updated successfully!');
            //props.router.push('/audio-conference');
          }
          else
          {
            message.error(putResponse.response.message);
          }
        }
        catch(error){
          message.error(error);
        }
          setSubmitting(false);
      },
      formInputsRows: [
        {
          inputs: [
            {
              name: 'Description',
              label: 'Description',
              placeholder: '',
              type: 'text',
              required: true,
              disabled: false,
            },
            {
              name: 'AccessCode',
              label: 'Access Code',
              placeholder: '',
              type: 'text',
              required: true,
              disabled: false,
            },
            {
              name: 'MaxParticipants',
              label: 'Max. Participants',
              placeholder: '',
              type: 'text',
              required: false,
              disabled: false,
            },
          ],
        },
        {
          inputs: [
            {
              name: 'StartDateTime',
              label: 'Start Date Time',
              type: 'datePicker',
              disabledDate: (current) => {
                return moment() >= current;
              },
              showTime: {
                format: 'HH:mm',
                defaultValue: moment().startOf('day'),
              },
              format: 'MM-DD-YYYY LT',
              required: true,
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 }
            } 
          ],
        },
        {
          inputs: [
            {
              name: 'Duration',
              label: 'Duration',
              placeholder: '',
              type: 'text',
              required: false,
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 }
            },
            {
              name: 'ModeratorRequired',
              label: 'Required Moderator',
              placeholder: '',
              type: 'switch',
              required: false,
            },
          ],
        },
        {
          inputs: [
            {
              name: 'Password',
              label: 'Password (Optional)',
              placeholder: '',
              type: 'text',
              required: false,
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 }
            },
            {
              name: 'PasswordModerator',
              label: 'Moderator Password',
              placeholder: '',
              type: 'text',
              required: false,
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 }
            },
            {
              name: 'Enabled',
              label: 'Enabled',
              placeholder: '',
              type: 'switch',
              required: false,
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 }
            },
          ],
        },
      ],
    };

    return {
      currentLanguage,
      user,
      currentConference,
      ConferenceForm
     // autoAttendantTableContent,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = '';
  }
  componentDidMount() {
    //systemLog.log(this.props);
  }
  render() {
    const { currentConference, ConferenceForm } = this.props;

    return (
      <BaseLayout>
        <NewConferenceRoom 
        currentConference = {currentConference}
        ConferenceForm={ConferenceForm} />
      </BaseLayout>
    );
  }
}
