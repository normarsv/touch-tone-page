import { Row, Space } from 'antd';
import moment from 'moment/min/moment-with-locales.js';
import React, { useContext } from 'react';

import API from '../../API/API';
import FormGenerator from '../../components-base/FormGenerator';
import { IsAValidPhoneNumber, ReplaceChar } from '../../scripts/General';
import { UserContext } from '../authentication/UserContext';
import ContentInnerHeader from '../misc/ContentInnerHeader';

const CallForwardSelective = ({ callForwardSelectiveData }) => {
  const { userInfo } = useContext(UserContext);
  const formToDisplay = {
    generalOptions: {
      type: 'vertical', //horizontal, vertical, inline
      formClassName: 'call-forward-form',
      submit: {
        className: 'primary-button-style',
        text: 'Save',
      },
      cancel: {
        className: 'primary-button-style cancel',
        text: 'Cancel',
        action: () => {
          // useRouter().back();
        },
      },
    },
    formInitialValues: callForwardSelectiveData,
    formValidations: (values) => {
      const errors = {};
      if (!IsAValidPhoneNumber(values.number || '')) {
        errors.number = 'Input a valid Number';
      }
      if (!IsAValidPhoneNumber(values.destination || '')) {
        errors.destination = 'Input a valid Number';
      }
      if (values.forwardType === undefined || values.forwardType === '') {
        errors.forwardType = 'Select a valid Type';
      }
      if (values.startDate === undefined || values.startDate === '') {
        errors.startDate = 'Select a valid Date';
      }
      if (values.endDate === undefined || values.endDate === '') {
        errors.endDate = 'Select a valid Date';
      }
      if (values.startTime === undefined || values.startTime === '') {
        errors.startTime = 'Select a valid Time';
      }
      if (values.endTime === undefined || values.endTime === '') {
        errors.endTime = 'Select a valid Time';
      }
      return errors;
    },
    formSubmit: (values, { setSubmitting, setFieldError, resetForm }) => {
      setSubmitting(true);
      const api = new API(userInfo.token);
      const sendValues = JSON.parse(JSON.stringify(values));
      delete sendValues.monday;
      delete sendValues.tuesday;
      delete sendValues.wednesday;
      delete sendValues.thursday;
      delete sendValues.friday;
      delete sendValues.saturday;
      delete sendValues.sunday;
      sendValues.dayRange = '0000000';
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        0,
        values.monday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        1,
        values.tuesday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        2,
        values.wednesday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        3,
        values.thursday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        4,
        values.friday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        5,
        values.saturday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        6,
        values.sunday === true ? '1' : '0'
      );
      console.log(sendValues);
      setSubmitting(false);
    },
    formInputsRows: [
      {
        inputs: [
          {
            name: 'number',
            label: 'Number',
            placeholder: 'Number',
            type: 'text',
            required: true,
          },
          {
            name: 'destination',
            label: 'Destination',
            placeholder: 'Destination',
            type: 'text',
            required: true,
          },
          {
            name: 'forwardType',
            label: 'Type',
            placeholder: 'Type',
            type: 'text',
            type: 'select',
            required: true,
            options: [
              {
                key: 'Default',
                label: 'Default',
              },
              {
                key: 'Disconnect',
                label: 'Disconnect',
              },
              {
                key: 'Play or Send Busy',
                label: 'Play or Send Busy',
              },
              {
                key: 'Play or Send FastBusy',
                label: 'Play or Send FastBusy',
              },
              {
                key: 'DND',
                label: 'DND',
              },
              {
                key: 'DND - Out of Service',
                label: 'DND - Out of Service',
              },
              {
                key: 'Blocked',
                label: 'Blocked',
              },
            ],
            optionValue: 'key',
            optionLabel: 'label',
          },
        ],
      },
      {
        inputs: [
          {
            name: 'startDate',
            label: 'Start Date',
            type: 'datePicker',
            showTime: {
              format: 'YYYY-MM-DD',
              defaultValue: moment().startOf('day'),
            },
            format: 'YYYY-MM-DD',
            required: true,
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              let inputEndDateForm = formOptions.formInputsRows[1].inputs.find(
                (input) => {
                  return input.name === 'endDate';
                }
              );

              if (inputEndDateForm) {
                inputEndDateForm.disabledDate = (current) => {
                  return current < moment(newVal).startOf('day');
                };
              }
              formikData.setFieldValue('endDate', '');
            },
          },
          {
            name: 'endDate',
            label: 'End Date',
            type: 'datePicker',
            showTime: {
              format: 'YYYY-MM-DD',
              defaultValue: moment().add(1, 'day').startOf('day'),
            },
            format: 'YYYY-MM-DD',
            required: true,
          },
          {
            name: 'startTime',
            label: 'Start Time',
            type: 'timePicker',
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
              let inputEndTimeForm = formOptions.formInputsRows[1].inputs.find(
                (input) => {
                  return input.name === 'endTime';
                }
              );
              if (inputEndTimeForm) {
                const hourDisable = [];
                const getHour = moment('2020-11-10 ' + newVal).hour();
                for (let index = 0; index < 24; index++) {
                  if (index < getHour - 1) {
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
              const startTimeHour = moment(formikData.values.startTime).hour();
              const startTimeMinutes = moment(
                formikData.values.startTime
              ).minutes();

              const endTimeHour = moment('2020-11-10 ' + newVal).hour();
              const endTimeMinutes = moment('2020-11-10 ' + newVal).minutes();

              if (startTimeHour === endTimeHour) {
                if (endTimeMinutes < startTimeMinutes) {
                  setTimeout(() => {
                    formikData.setFieldValue(
                      'endTime',
                      formikData.values.startTime
                    );
                  }, 100);
                  return;
                }
              }
            },
          },
        ],
      },
      {
        separatorTitle: 'Day Range',
        inputs: [],
      },
      {
        inputs: [
          {
            name: 'monday',
            label: 'Monday',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
            required: true,
          },
          {
            name: 'tuesday',
            label: 'Tuesday',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
            required: true,
          },
          {
            name: 'wednesday',
            label: 'Wednesday',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
            required: true,
          },
          {
            name: 'thursday',
            label: 'Thursday',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
            required: true,
          },
          {
            name: 'friday',
            label: 'Friday',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
            required: true,
          },
          {
            name: 'saturday',
            label: 'Saturday',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
            required: true,
          },
          {
            name: 'sunday',
            label: 'Sunday',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
            required: true,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <Space size='large' direction='vertical'>
        <ContentInnerHeader setBackOption />
        <Row>
          <h1 className='title-style'>Call Forward Selective</h1>
        </Row>
        <FormGenerator FormOptions={formToDisplay} />
      </Space>
    </div>
  );
};

CallForwardSelective.propTypes = {
  // someData: PropTypes.string
};

export default CallForwardSelective;
