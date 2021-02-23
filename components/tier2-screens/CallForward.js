import { message, Row, Space } from 'antd';
import React from 'react';

import API from '../../API/API';
import FormGenerator from '../../components-base/FormGenerator';
import { IsAValidPhoneNumber } from '../../scripts/General';
import ContentInnerHeader from '../misc/ContentInnerHeader';

const CallForward = ({ callForwardData, userInfo }) => {
  const callForwardAllType =
    callForwardData.callForwardAll.currentType || 'Extentions';
  const callForwardAllOptions = callForwardData.callForwardAll.options.find(
    (option) => {
      return option.optionName === callForwardAllType;
    }
  ) || {optionName:callForwardAllType, numbers:[]}

  const callForwardBusyType =
    callForwardData.callForwardBusy.currentType || 'Extentions';
  const callForwardBusyOptions = callForwardData.callForwardBusy.options.find(
    (option) => {
      return option.optionName === callForwardBusyType;
    }
  ) || {optionName:callForwardBusyType, numbers:[]}

  const callForwardFailureType =
    callForwardData.callForwardFailure.currentType || 'Extentions';
  const callForwardFailureOptions = callForwardData.callForwardFailure.options.find(
    (option) => {
      return option.optionName === callForwardFailureType;
    }
  ) || {optionName:callForwardFailureType, numbers:[]}

  const callForwardNoAnswerType =
    callForwardData.callForwardNoAnswer.currentType || 'Extentions';
  const callForwardNoAnswerOptions = callForwardData.callForwardNoAnswer.options.find(
    (option) => {
      return option.optionName === callForwardNoAnswerType;
    }
  ) || {optionName:callForwardNoAnswerType, numbers:[]}
  const formToDisplay = {
    generalOptions: {
      type: 'vertical', //horizontal, vertical, inline
      formClassName: 'call-forward-form',
      submit: {
        className: 'primary-button-style',
        text: 'Save',
      },
      reset: {
        className: 'primary-button-style',
        text: 'Clear',
      },
      cancel: {
        className: 'primary-button-style cancel',
        text: 'Cancel',
        action: () => {
          // useRouter().back();
          console.log('cancel clicked');
        },
      },
    },
    formInitialValues: {
      ...callForwardData,
      callForwardAllType: callForwardAllType,
      callForwardBusyType: callForwardBusyType,
      callForwardFailureType: callForwardFailureType,
      callForwardNoAnswerType: callForwardNoAnswerType,
    },
    formValidations: (values) => {
      const errors = {};
      // if(!values.firstName){
      //   errors.firstName = 'First name required'
      // }
      // if(!values.lastName){
      //   errors.lastName = 'Last name required'
      // }
      // if(!values.username){
      //   errors.username = 'Login name required'
      // }
      // if(!values.password){
      //   errors.password = 'Password required'
      // }else if (
      //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
      // ){
      //   errors.password = 'At least 8 characters, one uppercase and one number'
      // }
      return errors;
    },
    formSubmit: async (values, { setSubmitting, setFieldError }) => {
      setSubmitting(true);
      const api = new API(userInfo.token, userInfo.userId);
      values.callForwardAll.currentValue =
        Array.isArray(values.callForwardAll.currentValue) === true
          ? values.callForwardAll.currentValue[0]
          : values.callForwardAll.currentValue;

      values.callForwardBusy.currentValue =
        Array.isArray(values.callForwardBusy.currentValue) === true
          ? values.callForwardBusy.currentValue[0]
          : values.callForwardBusy.currentValue;

      values.callForwardFailure.currentValue =
        Array.isArray(values.callForwardFailure.currentValue) === true
          ? values.callForwardFailure.currentValue[0]
          : values.callForwardFailure.currentValue;

      values.callForwardNoAnswer.currentValue =
        Array.isArray(values.callForwardNoAnswer.currentValue) === true
          ? values.callForwardNoAnswer.currentValue[0]
          : values.callForwardNoAnswer.currentValue;
      console.log('form submitted values', values);
      const responseDoPut = await api.PUT('/Services/call-forward', values);
      console.log('form response ', responseDoPut);
      message.success('Call Forwarding Updated Succesfully!');
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
            defaultChecked: false,
          },
        ],
      },
      {
        inputs: [],
      },
      {
        inputs: [
          {
            name: 'callForwardAllType',
            label: 'Call Forward All Type',
            placeholder: 'Select Options',
            type: 'select',
            required: true,
            options: [
              ...callForwardData.callForwardAll.options,
              { optionName: 'External Number' },
            ],
            optionValue: 'optionName',
            optionLabel: 'optionName',
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              if (newVal === 'External Number') {
                formOptions.formInputsRows[2].inputs[1].mode = 'tags';
                formOptions.formInputsRows[2].inputs[1].options = [];
                formikData.setFieldValue(
                  'callForwardAll.currentValue',
                  '',
                  false
                );
              } else {
                const destinationOptions = callForwardData.callForwardAll.options.find(
                  (option) => {
                    return option.optionName === newVal;
                  }
                );
                formOptions.formInputsRows[2].inputs[1].mode = '';
                formOptions.formInputsRows[2].inputs[1].options =
                  destinationOptions.numbers;
                formikData.setFieldValue(
                  'callForwardAll.currentValue',
                  '',
                  false
                );
              }
            },
          },
          {
            name: 'callForwardAll.currentValue',
            label: 'Call Forward All Number',
            placeholder: 'Select Number',
            type: 'select',
            required: true,
            options: callForwardAllOptions.numbers,
            optionValue: 'value',
            optionLabel: 'name',
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              const currentOption = formikData.values.callForwardAllType;
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
                  'callForwardAll.currentValue',
                  reduceGetOnlyNew,
                  false
                );
              }
            },
          },
          {
            name: 'callForwardAllActive',
            label: 'Enabled',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
          },
        ],
      },
      {
        inputs: [
          {
            name: 'callForwardBusyType',
            label: 'Call Forward Busy Type',
            placeholder: 'Select Type',
            type: 'select',
            required: true,
            options: [
              ...callForwardData.callForwardBusy.options,
              { optionName: 'External Number' },
            ],
            optionValue: 'optionName',
            optionLabel: 'optionName',
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              if (newVal === 'External Number') {
                formOptions.formInputsRows[3].inputs[1].mode = 'tags';
                formOptions.formInputsRows[3].inputs[1].options = [];
                formikData.setFieldValue(
                  'callForwardBusy.currentValue',
                  '',
                  false
                );
              } else {
                const destinationOptions = callForwardData.callForwardBusy.options.find(
                  (option) => {
                    return option.optionName === newVal;
                  }
                );
                formOptions.formInputsRows[3].inputs[1].mode = '';
                formOptions.formInputsRows[3].inputs[1].options =
                  destinationOptions.numbers;
                formikData.setFieldValue(
                  'callForwardBusy.currentValue',
                  '',
                  false
                );
              }
            },
          },
          {
            name: 'callForwardBusy.currentValue',
            label: 'Call Forward Busy Number',
            placeholder: 'Select Number',
            type: 'select',
            required: true,
            options: callForwardBusyOptions.numbers,
            optionValue: 'value',
            optionLabel: 'name',
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              const currentOption = formikData.values.callForwardBusyType;
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
                  'callForwardBusy.currentValue',
                  reduceGetOnlyNew,
                  false
                );
              }
            },
          },
          {
            name: 'callForwardBusyActive',
            label: 'Enabled',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
          },
        ],
      },
      {
        inputs: [
          {
            name: 'callForwardFailureType',
            label: 'Call Forward Failure Type',
            placeholder: 'Select Type',
            type: 'select',
            required: true,
            options: [
              ...callForwardData.callForwardFailure.options,
              { optionName: 'External Number' },
            ],
            optionValue: 'optionName',
            optionLabel: 'optionName',
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              if (newVal === 'External Number') {
                formOptions.formInputsRows[4].inputs[1].mode = 'tags';
                formOptions.formInputsRows[4].inputs[1].options = [];
                formikData.setFieldValue(
                  'callForwardFailure.currentValue',
                  '',
                  false
                );
              } else {
                const destinationOptions = callForwardData.callForwardFailure.options.find(
                  (option) => {
                    return option.optionName === newVal;
                  }
                );
                formOptions.formInputsRows[4].inputs[1].mode = '';
                formOptions.formInputsRows[4].inputs[1].options =
                  destinationOptions.numbers;
                formikData.setFieldValue(
                  'callForwardFailure.currentValue',
                  '',
                  false
                );
              }
            },
          },
          {
            name: 'callForwardFailure.currentValue',
            label: 'Call Forward Failure Number',
            placeholder: 'Select Number',
            type: 'select',
            required: true,
            options: callForwardFailureOptions.numbers,
            optionValue: 'value',
            optionLabel: 'name',
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              const currentOption = formikData.values.callForwardFailureType;
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
                  'callForwardFailure.currentValue',
                  reduceGetOnlyNew,
                  false
                );
              }
            },
          },
          {
            name: 'callForwardFailureActive',
            label: 'Enabled',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
          },
        ],
      },
      {
        inputs: [
          {
            name: 'callForwardNoAnswerType',
            label: 'Call Forward No Answer Type',
            placeholder: 'Select Type',
            type: 'select',
            required: true,
            options: [
              ...callForwardData.callForwardNoAnswer.options,
              { optionName: 'External Number' },
            ],
            optionValue: 'optionName',
            optionLabel: 'optionName',
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              if (newVal === 'External Number') {
                formOptions.formInputsRows[5].inputs[1].mode = 'tags';
                formOptions.formInputsRows[5].inputs[1].options = [];
                formikData.setFieldValue(
                  'callForwardNoAnswer.currentValue',
                  '',
                  false
                );
              } else {
                const destinationOptions = callForwardData.callForwardNoAnswer.options.find(
                  (option) => {
                    return option.optionName === newVal;
                  }
                );
                formOptions.formInputsRows[5].inputs[1].mode = '';
                formOptions.formInputsRows[5].inputs[1].options =
                  destinationOptions.numbers;
                formikData.setFieldValue(
                  'callForwardNoAnswer.currentValue',
                  '',
                  false
                );
              }
            },
          },
          {
            name: 'callForwardNoAnswer.currentValue',
            label: 'Call Forward No Answer Number',
            placeholder: 'Select Number',
            type: 'select',
            required: true,
            options: callForwardNoAnswerOptions.numbers,
            optionValue: 'value',
            optionLabel: 'name',
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            customOnChange: async (
              newVal,
              formOptions,
              formikData,
              indexArray
            ) => {
              const currentOption = formikData.values.callForwardNoAnswerType;
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
                  'callForwardNoAnswer.currentValue',
                  reduceGetOnlyNew,
                  false
                );
              }
            },
          },
          {
            name: 'callForwardNoAnswerActive',
            label: 'Enabled',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
          },
        ],
      },
      {
        inputs: [
          {
            name: 'voiceMailBoxActive',
            label: 'Voicemail Box Enabled',
            placeholder: '',
            type: 'switch',
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            defaultChecked: false,
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
          <h1 className='title-style'>Call Forward</h1>
        </Row>
        <FormGenerator FormOptions={formToDisplay} />
      </Space>
    </div>
  );
};

CallForward.propTypes = {
  // someData: PropTypes.string
};

export default CallForward;
