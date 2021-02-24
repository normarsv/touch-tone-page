import { message } from 'antd';
import moment from 'moment/min/moment-with-locales.js';
import Router from 'next/router';
import { Component } from 'react';

import API from '../../../API/API';
import MyFindMe from '../../../components/tier2-screens/MyFindMe';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { IsAValidPhoneNumber, systemLog } from '../../../scripts/General';

export default class extends Component {
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

    const actualUser = user;

    const api = new API(actualUser.token, actualUser.userId);

    const resUserMyFindme = await api.GET('/Services/find-me');

    const actualUserMyFindme = resUserMyFindme.response;

    return {
      user,
      actualUserMyFindme,
      actualUser,
    };
  }
  constructor(props) {
    super(props);

    const destination1Type =
      this.props.actualUserMyFindme.findeMeItems[0].destination.currentType ||
      'Extentions';
    const destination1Options = this.props.actualUserMyFindme.findeMeItems[0].destination.options.find(
      (option) => {
        return option.optionName === destination1Type;
      }
    ) || { optionName: destination1Type, numbers: [] };

    const destination2Type =
      this.props.actualUserMyFindme.findeMeItems[1].destination.currentType ||
      'Extentions';
    const destination2Options = this.props.actualUserMyFindme.findeMeItems[1].destination.options.find(
      (option) => {
        return option.optionName === destination2Type;
      }
    ) || { optionName: destination2Type, numbers: [] };

    const destination3Type =
      this.props.actualUserMyFindme.findeMeItems[2].destination.currentType ||
      'Frequent Numbers';
    const destination3Options = this.props.actualUserMyFindme.findeMeItems[2].destination.options.find(
      (option) => {
        return option.optionName === destination3Type;
      }
    ) || { optionName: destination3Type, numbers: [] };

    this.userinfo = '';
    this.endUserForm = {
      generalOptions: {
        type: 'vertical', //horizontal, vertical, inline
        formClassName: 'test-form',
        submit: {
          className: 'primary-button-style',
          text: 'Save My Find me',
        },
        reset: {
          className: 'primary-button-style',
          text: 'Clear',
        },
        // cancel: {
        //   className: "primary-button-style cancel",
        //   text: "Cancel My Find me",
        //   action: () => {
        //     // useRouter().back();
        //
        //   },
        // },
      },
      formInitialValues: {
        startDate: this.props.actualUserMyFindme.startDate,
        endDate: this.props.actualUserMyFindme.endDate,
        enabled: this.props.actualUserMyFindme.enabled,
        ringAtSameTime:
          this.props.actualUserMyFindme.findeMeItems[0].priority === 1 &&
          this.props.actualUserMyFindme.findeMeItems[1].priority === 1 &&
          this.props.actualUserMyFindme.findeMeItems[2].priority === 1,
        dayrange: this.props.actualUserMyFindme.dayrange,
        destination1: this.props.actualUserMyFindme.findeMeItems[0].destination
          .currentValue,
        destination1Options: destination1Type,
        destination2: this.props.actualUserMyFindme.findeMeItems[1].destination
          .currentValue,
        destination2Options: destination2Type,
        destination3: this.props.actualUserMyFindme.findeMeItems[2].destination
          .currentValue,
        destination3Options: destination3Type,
      },
      formValidations: (values) => {
        const errors = {};
        //
        if (!values.startDate) {
          errors.startDate = 'Start date required';
        }
        if (!values.endDate) {
          errors.endDate = 'End date required';
        }
        if (values.endDate < values.startDate) {
          errors.endDate = 'Set a valid end date';
        }

        return errors;
      },
      formSubmit: async (values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);
        await this.finalSubmit(values);
        setSubmitting(false);
      },
      formInputsRows: [
        { separatorTitle: 'Enable Find Me', inputs: [] },
        {
          inputs: [
            {
              name: 'enabled',
              label: '',
              placeholder: '',
              type: 'switch',
              checkedChildren: 'Yes',
              unCheckedChildren: 'No',
              defaultChecked: false,
            },
          ],
        },
        { separatorTitle: 'Schedule', inputs: [] },
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
          ],
        },
        { separatorTitle: 'Day Range', inputs: [] },
        {
          inputs: [
            {
              name: 'dayrange',
              label: '',
              placeholder: '',
              type: 'checkBoxGroup',
              options: [
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
                { label: 'Sunday', value: 'sunday' },
              ],
              defaultChecked: false,
            },
          ],
        },
        { separatorTitle: 'Ringing Group', inputs: [] },
        {
          inputs: [
            {
              name: 'ringAtSameTime',
              label: 'Ring at the same time',
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
              name: 'destination1Options',
              label: 'Destination 1 Type',
              placeholder: 'Select Destination Options',
              type: 'select',
              required: true,
              options: [
                ...this.props.actualUserMyFindme.findeMeItems[0].destination
                  .options,
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
                  formOptions.formInputsRows[8].inputs[1].mode = 'tags';
                  formOptions.formInputsRows[8].inputs[1].options = [];
                  formikData.setFieldValue('destination1', '', false);
                } else {
                  const destinationOptions = this.props.actualUserMyFindme.findeMeItems[0].destination.options.find(
                    (option) => {
                      return option.optionName === newVal;
                    }
                  );

                  formOptions.formInputsRows[8].inputs[1].mode = '';
                  formOptions.formInputsRows[8].inputs[1].options =
                    destinationOptions.numbers;
                  formikData.setFieldValue('destination1', '', false);
                }
              },
            },
            {
              mode: destination1Type === 'External Number' ? 'tags' : undefined,
              name: 'destination1',
              label: 'Destination 1',
              placeholder: 'Select Destination',
              type: 'select',
              required: true,
              options: destination1Options.numbers,
              optionValue: 'value',
              optionLabel: 'name',
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                const currentOption = formikData.values.destination1Options;
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
                    'destination1',
                    reduceGetOnlyNew,
                    false
                  );
                }
              },
            },
          ],
        },
        {
          inputs: [
            {
              name: 'destination2Options',
              label: 'Destination 2 Type',
              placeholder: 'Select Destination Options',
              type: 'select',
              required: true,
              options: [
                ...this.props.actualUserMyFindme.findeMeItems[1].destination
                  .options,
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
                  formOptions.formInputsRows[9].inputs[1].mode = 'tags';
                  formOptions.formInputsRows[9].inputs[1].options = [];
                  formikData.setFieldValue('destination2', '', false);
                } else {
                  const destinationOptions = this.props.actualUserMyFindme.findeMeItems[1].destination.options.find(
                    (option) => {
                      return option.optionName === newVal;
                    }
                  );
                  formOptions.formInputsRows[9].inputs[1].mode = '';
                  formOptions.formInputsRows[9].inputs[1].options =
                    destinationOptions.numbers;
                  formikData.setFieldValue('destination2', '', false);
                }
              },
            },
            {
              mode: destination2Type === 'External Number' ? 'tags' : undefined,
              name: 'destination2',
              label: 'Destination 2',
              placeholder: 'Select Destination',
              type: 'select',
              required: true,
              options: destination2Options.numbers,
              optionValue: 'value',
              optionLabel: 'name',
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                const currentOption = formikData.values.destination2Options;
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
                    'destination2',
                    reduceGetOnlyNew,
                    false
                  );
                }
              },
            },
          ],
        },
        {
          inputs: [
            {
              mode: destination3Type === 'External Number' ? 'tags' : undefined,
              name: 'destination3Options',
              label: 'Destination 3 Type',
              placeholder: 'Select Destination Options',
              type: 'select',
              required: true,
              options: [
                ...this.props.actualUserMyFindme.findeMeItems[2].destination
                  .options,
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
                  formOptions.formInputsRows[10].inputs[1].mode = 'tags';
                  formOptions.formInputsRows[10].inputs[1].options = [];
                  formikData.setFieldValue('destination3', '', false);
                } else {
                  const destinationOptions = this.props.actualUserMyFindme.findeMeItems[1].destination.options.find(
                    (option) => {
                      return option.optionName === newVal;
                    }
                  );
                  formOptions.formInputsRows[10].inputs[1].mode = '';
                  formOptions.formInputsRows[10].inputs[1].options =
                    destinationOptions.numbers;
                  formikData.setFieldValue('destination3', '', false);
                }
              },
            },
            {
              name: 'destination3',
              label: 'Destination 3',
              placeholder: 'Select Destination',
              type: 'select',
              required: true,
              options: destination3Options.numbers,
              optionValue: 'value',
              optionLabel: 'name',
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                const currentOption = formikData.values.destination3Options;
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
                    'destination3',
                    reduceGetOnlyNew,
                    false
                  );
                }
              },
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  async finalSubmit(valuesToSubmit) {
    //
    const { actualUser, actualUserMyFindme } = this.props;

    const api = new API(actualUser.token, actualUser.userId);

    const finalSubmit = {
      startDate: valuesToSubmit.startDate,
      endDate: valuesToSubmit.endDate,
      startTime: '',
      endTime: '',
      dayrange: valuesToSubmit.dayrange,
      enabled: valuesToSubmit.enabled,
      findeMeItems: [
        {
          findMeScheduleItemId:
            actualUserMyFindme.findeMeItems[0].findMeScheduleItemId,
          priority: valuesToSubmit.ringAtSameTime ? 1 : 1,
          destination: {
            currentValue:
              Array.isArray(valuesToSubmit.destination1) === true
                ? valuesToSubmit.destination1[0]
                : valuesToSubmit.destination1,
          },
        },
        {
          findMeScheduleItemId:
            actualUserMyFindme.findeMeItems[1].findMeScheduleItemId,
          priority: valuesToSubmit.ringAtSameTime ? 1 : 2,
          destination: {
            currentValue:
              Array.isArray(valuesToSubmit.destination2) === true
                ? valuesToSubmit.destination2[0]
                : valuesToSubmit.destination2,
          },
        },
        {
          findMeScheduleItemId:
            actualUserMyFindme.findeMeItems[2].findMeScheduleItemId,
          priority: valuesToSubmit.ringAtSameTime ? 1 : 3,
          destination: {
            currentValue:
              Array.isArray(valuesToSubmit.destination3) === true
                ? valuesToSubmit.destination3[0]
                : valuesToSubmit.destination3,
          },
        },
      ],
    };

    const responsePut = await api.PUT('/Services/find-me', finalSubmit);

    message.success('My Find Me Updated Succesfully!');
  }

  render() {
    const {} = this.props;

    return (
      <BaseLayout>
        <MyFindMe formToDisplay={this.endUserForm} />
      </BaseLayout>
    );
  }
}
