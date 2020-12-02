import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';

import API from '../../../API/API';
import ModifyMeeting from '../../../components/tier3-screens/ModifyMeeting';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { IsAValidEmail, systemLog } from '../../../scripts/General';

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

    const api = new API(user.token);
    const resManageUsers = await api.GET('/Users/orgId/' + user.organizationId);
    const resMeeting = await api.GET('/Meetings/' + query.id);
    const currentMeeting = resMeeting.response;
    return {
      user,
      orgUsers: resManageUsers.response,
      currentMeeting,
    };
  }
  constructor(props) {
    console.log(props);
    const emailsParticipants = props.orgUsers.reduce(
      (returnEmails, currentUser) => {
        const objectToReduce = {
          destinationNumber: currentUser.authUser.email,
          destinationId: currentUser.authUser.email,
        };
        returnEmails.push(objectToReduce);
        return returnEmails;
      },
      []
    );
    super(props);
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
        name: props.currentMeeting.name,
        findeMeScheduleDescription: '',
        startTime: moment(props.currentMeeting.validSince).format(
          'YYYY-MM-DD HH:mm'
        ),
        endTime: moment(props.currentMeeting.validUntil).format(
          'YYYY-MM-DD HH:mm'
        ),
        participants: props.currentMeeting.participants.reduce(
          (returnParticipants, currentParticipant) => {
            const participantAdd = {
              findMeScheduleItemId: [currentParticipant.email],
            };
            returnParticipants.push(participantAdd);
            return returnParticipants;
          },
          []
        ),
      },
      formValidations: (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Meeting name required';
        }
        if (!values.startTime) {
          errors.startTime = 'Start date required';
        }
        if (!values.participants || values.participants.length === 0) {
          errors.participants = 'At least 1 destination required';
        }
        return errors;
      },
      formSubmit: async (values, { setSubmitting, setFieldError }) => {
        const paticipants = values.participants.reduce(
          (returnArray, currentParticipant) => {
            returnArray.push({
              email: currentParticipant.findMeScheduleItemId[0],
              sendSMS: false,
            });
            return returnArray;
          },
          []
        );

        const time = values.endTime;
        const [hours, minutes] = time.split(':');
        const momentEndTime = moment(values.startTime)
          .set('hour', hours)
          .set('minutes', minutes)
          .format('YYYY-MM-DD HH:mm');
        const bodyMeeting = {
          name: values.name,
          participants: paticipants,
          language: 'es',
          validSince: moment(values.startTime).valueOf(),
          validUntil: moment(momentEndTime).valueOf(),
        };
        const api = new API(props.user.token);
        const resCreateMeeting = await api.PUT(
          '/Meetings/' + currentMeeting.id,
          bodyMeeting
        );

        setSubmitting(false);
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
                  name: 'findMeScheduleItemId',
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
                    curretValues[
                      indexArray
                    ].findMeScheduleItemId = reduceGetOnlyNew;
                    formikData.setFieldValue(
                      'participants',
                      curretValues,
                      false
                    );
                  },
                  required: true,
                  options: emailsParticipants,
                  optionValue: 'destinationId',
                  optionLabel: 'destinationNumber',
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
