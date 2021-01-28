import { message } from 'antd';
import moment from 'moment/min/moment-with-locales.js';
import { withRouter } from 'next/dist/client/router';
import Router from 'next/router';
import { Component } from 'react';

import API from '../../../API/API';
import ModifyMeeting from '../../../components/tier3-screens/ModifyMeeting';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { IsAValidEmail, systemLog } from '../../../scripts/General';

class CreateMeetings extends Component {
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

    const api = new API();
    const resManageUsers = await api.GET('/Users/orgId/' + user.organizationId);
    return {
      user,
      orgUsers: resManageUsers.response,
    };
  }
  constructor(props) {
    super(props);
    console.log(props);
    const emailsParticipants = props.orgUsers.reduce(
      (returnEmails, currentUser) => {
        const objectToReduce = {
          email: currentUser.authUser.email,
        };
        returnEmails.push(objectToReduce);
        return returnEmails;
      },
      []
    );
    this.userinfo = '';
    this.state = { emailsToSend: '' };

    this.createMeetingForm = {
      generalOptions: {
        type: 'vertical', //horizontal, vertical, inline
        formClassName: 'test-form',
        submit: {
          className: 'primary-button-style',
          text: 'Create Meeting',
        },
        reset: {
          className: 'primary-button-style',
          text: 'Clear',
        },
      },
      formInitialValues: {
        name: '',
        startTime: '',
        endTime: '',
        participants: [],
      },
      formValidations: (values) => {
        console.log(values);
        const errors = {};
        if (!values.name) {
          errors.name = 'Meeting name required';
        }
        if (!values.startTime) {
          errors.startTime = 'Start date required';
        }
        if (!values.participants || values.participants.length === 0) {
          errors.participants = 'At least 1 destination required';
        } else {
          const validParticipants = [];
          for (const participant of values.participants) {
            if (IsAValidEmail(participant.email[0])) {
              validParticipants.push(participant);
            }
          }
          if (validParticipants.length === 0) {
            errors.participants = 'At least 1 destination required';
          }
        }
        return errors;
      },
      formSubmit: async (
        values,
        { setSubmitting, setFieldError, resetForm }
      ) => {
        setSubmitting(true);
        const paticipants = values.participants.reduce(
          (returnArray, currentParticipant) => {
            if (IsAValidEmail(currentParticipant.email[0])) {
              returnArray.push({
                email: currentParticipant.email[0],
                sendSMS: false,
              });
            }
            return returnArray;
          },
          []
        );

        const timeStampStartTime = moment(values.startTime).valueOf();
        const timeStampEndTime = moment(values.endTime).valueOf();

        const bodyMeeting = {
          name: values.name,
          participants: paticipants,
          language: 'es',
          validSince: timeStampStartTime,
          validUntil: timeStampEndTime,
        };

        const api = new API(props.user.token, props.user.userId);
        try {
          await api.POST('/Meetings', bodyMeeting);
          message.success('Meeting created successfully!');
          props.router.push('/meetings');
        } catch (error) {
          console.log(error);
          setSubmitting(false);
          message.error('There was an error creating the metting');
        }
        //setSubmitting(false);
      },
      formInputsRows: [
        {
          inputs: [
            {
              name: 'name',
              label: 'Meeting Name',
              placeholder: 'Meeting name...',
              type: 'text',
              required: true,
            },
            {
              name: 'startTime',
              label: 'Start Date',
              type: 'datePicker',
              disabledDate: (current) => {
                return moment() >= current;
              },
              showTime: {
                format: 'HH:mm',
                defaultValue: moment().startOf('day'),
              },
              format: 'YYYY-MM-DD HH:mm',
              required: true,
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                let inputEndTimeForm = formOptions.formInputsRows[0].inputs.find(
                  (input) => {
                    return input.name === 'endTime';
                  }
                );
                if (inputEndTimeForm) {
                  const hourDisable = [];
                  const getHour = moment(newVal).hour();
                  for (let index = 0; index < 24; index++) {
                    if (index < getHour) {
                      hourDisable.push(index);
                    }
                  }
                  inputEndTimeForm.disabledHours = () => hourDisable;
                }
                formikData.setFieldValue('endTime', '');
              },
            },
            {
              name: 'endTime',
              label: 'End Time',
              type: 'timePicker',
              disabledDate: (current) => {
                return moment() >= current;
              },
              showTime: {
                format: 'HH:mm',
                defaultValue: moment().startOf('day'),
              },
              format: 'HH:mm',
              required: true,
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                const time = newVal;
                const [hours, minutes] = time.split(':');
                const momentNewVal = moment(formikData.startTime)
                  .set('hour', hours)
                  .set('minutes', minutes)
                  .format('YYYY-MM-DD HH:mm');

                const startTimeHour = moment(formikData.startTime).hour();
                const startTimeMinutes = moment(formikData.startTime).minutes();
                const currentHour = moment(momentNewVal).hour();
                const currentMinutes = moment(momentNewVal).minutes();

                let inputEndTimeForm = formOptions.formInputsRows[0].inputs.find(
                  (input) => {
                    return input.name === 'endTime';
                  }
                );
                if (startTimeHour === currentHour) {
                  const minutesToDisable = [];
                  for (let index = 0; index < 60; index++) {
                    if (index < startTimeMinutes) {
                      minutesToDisable.push(index);
                    }
                  }
                  inputEndTimeForm.disableMinutes = () => minutesToDisable;
                  if (currentMinutes < startTimeMinutes) {
                    const newMoment = moment(momentNewVal)
                      .set('minute', startTimeMinutes)
                      .format('HH:mm');
                    setTimeout(() => {
                      formikData.setFieldValue('endTime', newMoment);
                    }, 500);
                  }
                }
              },
            },
          ],
        },
        {
          inputs: [
            {
              name: 'participants',
              label: 'Participants',
              placeholder: 'Select Participant',
              type: 'list',
              required: true,
              listFields: [
                {
                  name: 'email',
                  label: 'Destination',
                  placeholder: 'Select Destination',
                  type: 'select',
                  mode: 'tags',
                  customOnChange: async (
                    newVal,
                    formOptions,
                    formikData,
                    indexArray
                  ) => {
                    const curretValues = [...formikData.values.participants];
                    const reduceGetOnlyNew = newVal.reduce(
                      (returnData, currentEmail) => {
                        if (
                          curretValues.find((email) => {
                            return email === currentEmail;
                          }) === undefined
                        ) {
                          if (IsAValidEmail(currentEmail) === true) {
                            returnData = [currentEmail];
                          }
                        }
                        return returnData;
                      },
                      []
                    );
                    curretValues[indexArray].email = reduceGetOnlyNew;
                    formikData.setFieldValue(
                      'participants',
                      curretValues,
                      false
                    );
                  },
                  required: true,
                  options: emailsParticipants,
                  optionValue: 'email',
                  optionLabel: 'email',
                },
              ],
            },
          ],
        },
      ],
    };
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    return (
      <BaseLayout>
        <ModifyMeeting createMeetingForm={this.createMeetingForm} />
      </BaseLayout>
    );
  }
}
export default withRouter(CreateMeetings);
