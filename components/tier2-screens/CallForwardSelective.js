import { message, Row, Space } from 'antd';
import moment from 'moment/min/moment-with-locales.js';
import React, { useContext } from 'react';

import API from '../../API/API';
import FormGenerator from '../../components-base/FormGenerator';
import { IsAValidPhoneNumber, ReplaceChar } from '../../scripts/General';
import { UserContext } from '../authentication/UserContext';
import ContentInnerHeader from '../misc/ContentInnerHeader';

const CallForwardSelective = ({
  callForwardSelectiveData,
  callForwardSelectiveDataResponse,
}) => {
  const { userInfo } = useContext(UserContext);
  const destinationOptions = callForwardSelectiveData.destination.options.find(
    (option) => {
      return (
        option.optionName === callForwardSelectiveData.currentType ||
        'Extentions'
      );
    }
  );
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
    formSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      console.log(values);
      setSubmitting(true);
      const api = new API(userInfo.token, userInfo.userId);
      const sendValues = JSON.parse(JSON.stringify(values));
      sendValues.destination =
        Array.isArray(values.destination.currentValue) === true
          ? values.destination.currentValue[0]
          : values.destination.currentValue;
      delete sendValues.monday;
      delete sendValues.tuesday;
      delete sendValues.wednesday;
      delete sendValues.thursday;
      delete sendValues.friday;
      delete sendValues.saturday;
      delete sendValues.sunday;
      sendValues.startDate = moment(values.startDate).format('YYYY-MM-DD');
      sendValues.endDate = moment(values.endDate).format('YYYY-MM-DD');
      sendValues.startTime = moment(values.startTime).format('HH:MM:SS');
      sendValues.endTime = moment(values.endTime).format('HH:MM:SS');
      sendValues.dayRange = '0000000';
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        0,
        values.sunday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        1,
        values.monday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        2,
        values.tuesday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        3,
        values.wednesday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        4,
        values.thursday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        5,
        values.friday === true ? '1' : '0'
      );
      sendValues.dayRange = ReplaceChar(
        sendValues.dayRange,
        6,
        values.saturday === true ? '1' : '0'
      );
      console.log(sendValues);
      const putCallForwardSelective = await api.PUT(
        '/Services/call-forward-selective',
        sendValues
      );
      console.log(putCallForwardSelective);
      if (
        putCallForwardSelective.statusCode === 201 ||
        putCallForwardSelective.statusCode === 200
      ) {
        message.success('Call Forward Selective ' + 'Edited' + ' Succesfully!');
      } else {
        message.error(putCallForwardSelective.response.message || 'Failed to ' + 'Edit' + ' Call Forward Selective');
      }
      setSubmitting(false);
    },
    formInputsRows: [
      {
        inputs: [
          {
            name: 'enabled',
            label: 'Enabled',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: true,
            required: true,
          },
          {
            name: 'number',
            label: 'Number',
            placeholder: 'Number',
            type: 'text',
            required: true,
          },
          {
            name: 'destination.currentType',
            label: 'Destination Type',
            placeholder: 'Destination Type',
            type: 'select',
            required: true,
            options: [
              ...callForwardSelectiveData.destination.options,
              { optionName: 'External Number' },
            ],
            optionValue: 'optionName',
            optionLabel: 'optionName',
            breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              if (newVal === 'External Number') {
                formOptions.formInputsRows[0].inputs[3].mode = 'tags';
                formOptions.formInputsRows[0].inputs[3].options = [];
                formikData.setFieldValue('destination.currentValue', '', false);
              } else {
                const destinationOptions = callForwardSelectiveData.destination.options.find(
                  (option) => {
                    return option.optionName === newVal;
                  }
                );
                formOptions.formInputsRows[0].inputs[3].mode = '';
                formOptions.formInputsRows[0].inputs[3].options =
                  destinationOptions.numbers;
                formikData.setFieldValue('destination.currentValue', '', false);
              }
            },
          },
          {
            mode:
              callForwardSelectiveData.destination.currentType ===
              'External Number'
                ? 'tags'
                : undefined,
            name: 'destination.currentValue',
            label: 'Destination Number',
            placeholder: 'Select Number',
            type: 'select',
            required: true,
            options: destinationOptions.numbers,
            optionValue: 'value',
            optionLabel: 'name',
            breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              const currentOption = formikData.values.destination.currentType;
              if (currentOption === 'External Number') {
                const reduceGetOnlyNew = newVal.reduce(
                  (returnData, currentNumber) => {
                    if (IsAValidPhoneNumber(currentNumber) === true) {
                      returnData = [currentNumber];
                    }
                    return returnData;
                  },
                  []
                );
                formikData.setFieldValue(
                  'destination.currentValue',
                  reduceGetOnlyNew,
                  false
                );
              }
            },
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
                key: 0,
                label: 'Default',
              },
              {
                key: 1,
                label: 'Disconnect',
              },
              {
                key: 2,
                label: 'Play or Send Busy',
              },
              {
                key: 3,
                label: 'Play or Send FastBusy',
              },
              {
                key: 4,
                label: 'DND',
              },
              {
                key: 5,
                label: 'DND - Out of Service',
              },
              {
                key: 6,
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
