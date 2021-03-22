import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';
import Router from 'next/router';
import {message} from 'antd';
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

    const ConferenceForm = {
      generalOptions: {
        type: 'vertical', //horizontal, vertical, inline
        formClassName: 'test-form',
        submit: {
          className: 'primary-button-style',
          text: 'Create',
        },
        reset: {
          className: 'primary-button-style',
          text: 'Clear',
        },
      },
      formInitialValues:{
        ConferenceReservedId: 0,
        Description: '',
        Account: '',
        AccessCode: '',
        Password: '',
        Enabled: true,
        MaxParticipants: 0,
        StartDateTime: '',
        Duration: 0,
        OnHoldPrompt: '',
        FullDuplix: false,
        ModeratorRequired: false,
        PasswordModerator: '',
        Emails: ''
      },
      formValidations: (values) => {
        const errors = {};
        if (!values.Description) {
          errors.Description = 'Conference description required';
        }
        if (!values.MaxParticipants || values.MaxParticipants.length === 0 || values.MaxParticipants <= 0) {
          errors.MaxParticipants = 'At least 1 participant required';
        } 
        
        return errors;
      },
      formSubmit: async (
        values,
        { setSubmitting, setFieldError, resetForm }
      ) => {
        setSubmitting(true);
  
        console.log(values)
        values.Emails = '';
 
          const api = new API(user.token, user.userId);
          const putResponse = await api.POST('/Conferences', {...values, StartDateTime:moment(values.StartDateTime).format('YYYY-MM-DD HH:mm:ss') });
          console.log(putResponse)
      
        if(putResponse.statusCode == 200 || putResponse.statusCode == 201)
        {
          message.success('Conference created successfully!');
          Router.push('/audio-conference');
        }
        else
        {
          message.error(putResponse.response.message);
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
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              tooltip:'Enter 0 if there is no fixed'
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
      ConferenceForm
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
    const { ConferenceForm } = this.props;

    return (
      <BaseLayout>
        <NewConferenceRoom ConferenceForm={ConferenceForm}/>
      </BaseLayout>
    );
  }
}
