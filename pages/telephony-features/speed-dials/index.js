import Router from 'next/router';
import { Component, useState } from 'react';
import SpeedDials from '../../../components/telephony-features/SpeedDials';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { IsAValidPhoneNumber, systemLog } from '../../../scripts/General';
import API from '../../../API/API';
import { message } from 'antd';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    const api = new API(user.token, user.userId);
    const speedDialsResponse = await api.GET('/services/speeddials');
    let speedDials = [];
    if (speedDialsResponse && 
      speedDialsResponse.statusCode == 200) {
        speedDials = speedDialsResponse.response;
      
    }

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
      speedDials
    };
  }
  constructor(props) {
    super(props);
    const {speedDials:{options,speeddials},user} = this.props;
    let speeds = {}

    speeddials.map((item, index) => {
      speeds[`destinations${index}`]=[item]
    });

    this.speedDialsForm = {
      generalOptions: {
        type: 'vertical', //horizontal, vertical, inline
        formClassName: 'test-form',
        submit: {
          className: 'primary-button-style',
          text: 'Save Speed Dials',
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
          },
        },
      },
      formInitialValues: speeds,
      formValidations: (values) => {
        const errors = {};
        return errors;
      },
      formSubmit: async (values, { setSubmitting, setFieldError }) => {
   
        setSubmitting(true);
        const api = new API(user.token, user.userId);
        const postValues = speeddials.map((item, index) => {
          return  !Array.isArray(values[`destinations${index}`][0].number.currentValue) ? 
          values[`destinations${index}`][0] :
          {...values[`destinations${index}`][0], number: {...values[`destinations${index}`][0].number, currentValue: values[`destinations${index}`][0].number.currentValue[0]}}
        });

        const resp = await api.PUT('/services/speeddials',postValues)
        if(resp.statusCode == 200)
          message.success('Speed Dials Updated Succesfully!');
        else
          message.error(resp.response.message);

        setSubmitting(false);
      },
      formInputsRows: [
        { 
          inputs: [
          ...speeddials.map((item, index)=>{
            return {
              name: `destinations${index}`,
              //label: 'Destination',
              //placeholder: 'Select Destination',
              type: 'list',
              fixedList: true,
              //addMax: 9,
              breakpoints: { xxl: 24, xl: 24, md: 24, sm: 24, xs: 24 },
              required: true,
              listFields: [
                {
                  name: 'entry',
                  label: 'Entry',
                  placeholder: '',
                  type: 'text',
                  required: true,
                  disabled: true,
                  breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
                },
                {
                  name: 'description',
                  label: 'Description',
                  placeholder: '',
                  type: 'text',
                  required: false,
                  breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
                },
                {
                  name: 'number.currentType',
                  label: 'Destination Type',
                  placeholder: 'Destination Type',
                  type: 'select',
                  required: true,
                  options:  [...options,  { optionName: 'External Number'}],
                  optionValue: 'optionName',
                  optionLabel: 'optionName',
                  breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
                  customOnChange: async (
                    newVal,
                    formOptions,
                    formikData,
                    indexArray
                  ) =>{
                    if (newVal === 'External Number') {
                   console.log('formOptions', formOptions)
                      formOptions.formInputsRows[0].inputs[index].listFields[3].mode = 'tags';
                      formOptions.formInputsRows[0].inputs[index].listFields[3].options = [];
                      formikData.setFieldValue(`destinations${index}[0].number.currentValue`,'', false);
                    } else {
                      const destinationOptions = options.find(
                        (option) => {
                          return option.optionName === newVal;
                        }
                      );
                      formOptions.formInputsRows[0].inputs[index].listFields[3].mode = '';
                      formOptions.formInputsRows[0].inputs[index].listFields[3].options = destinationOptions.numbers;
                      formikData.setFieldValue(`destinations${index}[0].number.currentValue`,'', false);
                    }
                  }
                },
                {
                  name: 'number.currentValue',
                  label: 'Destination Number',
                  placeholder: 'Select Number',
                  type: 'select',
                  mode: item.number.currentType == 'External Number' ? 'tags' : '',
                  required: true,
                  options: options.find(
                    (option) => {
                      return option.optionName === item.number.currentType;
                    }
                  )?.numbers || options[0].numbers,
                  optionValue: 'value',
                  optionLabel: 'name',
                  breakpoints: { xxl: 6, xl: 6, md: 6, sm: 6, xs: 24 },
                  customOnChange: async (
                    newVal,
                    formOptions,
                    formikData,
                    indexArray
                  ) => {
                    const currentOption = formikData.values[`destinations${index}`].currentType;
                    console.log('formik values', formikData.values[`destinations${index}`])
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
                      formikData.setFieldValue(`destinations${index}[0].number.currentValue`,reduceGetOnlyNew, false);
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
            }   
          })//end Map
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
        <SpeedDials 
          speedDialsForm={this.speedDialsForm}
         
        />
      </BaseLayout>
    );
  }
}