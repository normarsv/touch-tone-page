import Router from 'next/router';
import { Component } from 'react';

import SpeedDials from '../../../components/telephony-features/SpeedDials';
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

    return {
      user,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = '';

    this.speedDialsForm = {
      generalOptions: {
        type: 'vertical', //horizontal, vertical, inline
        formClassName: 'test-form',
        submit: {
          className: 'primary-button-style',
          text: 'Create User',
        },
        reset: {
          className: 'primary-button-style',
          text: 'Clear',
        },
        cancel: {
          className: 'primary-button-style cancel',
          text: 'Cancel User',
          action: () => {
            // useRouter().back();
          },
        },
      },
      formInitialValues: {
        destinations: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      },
      formValidations: (values) => {
        console.log(values);
        const errors = {};
        return errors;
      },
      formSubmit: (values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);
        setSubmitting(false);
      },
      formInputsRows: [
        {
          inputs: [
            {
              name: 'destinations',
              label: 'Destination',
              placeholder: 'Select Destination',
              type: 'list',
              fixedList: true,
              addMax: 10,
              required: true,
              listFields: [
                {
                  name: 'dialId',
                  label: 'Destination',
                  placeholder: 'Select Destination',
                  type: 'text',
                  required: true,
                  disabled: true,
                  breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
                },
                {
                  name: 'currentType',
                  label: 'Destination Type',
                  placeholder: 'Destination Type',
                  type: 'select',
                  required: true,
                  options: [{ optionName: 'test' }, { optionName: 'External' }],
                  optionValue: 'optionName',
                  optionLabel: 'optionName',
                  breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
                  customOnChange: async (
                    newVal,
                    formOptions,
                    formikData,
                    indexArray
                  ) => {
                    if (newVal === 'External') {
                      formOptions.formInputsRows[0].inputs[0].listFields[2].mode =
                        'tags';
                      formOptions.formInputsRows[0].inputs[0].listFields[2].options = [];
                      formikData.setFieldValue(
                        'destinations' +
                          '[' +
                          indexArray +
                          ']' +
                          '.currentValue',
                        '',
                        false
                      );
                    } else {
                      formOptions.formInputsRows[0].inputs[0].listFields[2].mode =
                        '';
                      formOptions.formInputsRows[0].inputs[0].listFields[2].options = [
                        { queueName: 'Ring Group', queueId: 0 },
                        { queueName: 'User', queueId: 1 },
                        { queueName: 'Queue', queueId: 2 },
                        { queueName: 'External Number', queueId: 3 },
                      ];
                      formikData.setFieldValue(
                        'destinations' +
                          '[' +
                          indexArray +
                          ']' +
                          '.currentValue',
                        '',
                        false
                      );
                    }
                  },
                },
                {
                  name: 'currentValue',
                  label: 'Destination Number',
                  placeholder: 'Select Number',
                  type: 'select',
                  required: true,
                  options: [
                    { name: 'Ring Group', value: 0 },
                    { name: 'User', value: 1 },
                    { name: 'Queue', value: 2 },
                    { name: 'External Number', value: 3 },
                  ],
                  optionValue: 'value',
                  optionLabel: 'name',
                  breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
                  customOnChange: async (
                    newVal,
                    formOptions,
                    formikData,
                    indexArray
                  ) => {
                    const currentOption =
                      formikData.values.destination.currentType;
                    if (currentOption === 'External') {
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
                        'destinations' +
                          '[' +
                          indexArray +
                          ']' +
                          '.currentValue',
                        '',
                        reduceGetOnlyNew,
                        false
                      );
                    }
                  },
                },
              ],
              customActions: [
                {
                  label: 'Details',
                  onClick: (listRowInputs) => {
                    alert(JSON.stringify(listRowInputs, null, 2));
                  },
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
    const {} = this.props;

    return (
      <BaseLayout>
        <SpeedDials speedDialsForm={this.speedDialsForm} />
      </BaseLayout>
    );
  }
}
