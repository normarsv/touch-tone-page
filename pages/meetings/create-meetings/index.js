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

    const api = new API();
    const resManageUsers = await api.GET('/Users/orgId/' + user.organizationId);

    return {
      user,
      orgUsers: resManageUsers.response,
    };
  }
  constructor(props) {
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
        findeMeDescription: '',
        findeMeScheduleDescription: '',
        startTime: '',
        endTime: '',
        dayrange: [],
        enabled: false,
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
      formSubmit: (values, { setSubmitting, setFieldError }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          console.log('form submitted values', values);
          setSubmitting(false);
        }, 400);
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
