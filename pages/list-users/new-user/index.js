import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';

import API from '../../../API/API';
import NewUser from '../../../components/user/NewUser';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';
import { baseLanguage } from '../../../scripts/MainInfoData';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    let editServiceContent = new Array(24).fill({
      id: 1,
      title: "Access to the User list view",
      status: true,
    });

    const api = new API();
    const resOrganizations = await api.GET("/Organizations/");
    const resUserGroups =  [];
    // const resUserGroups = await api.GET("/Organizations/");

    return {
      currentLanguage,
      user,
      editServiceContent,
      resOrganizations,
      resUserGroups
    };
  }
  constructor(props) {
    super(props);
    const { user, editServiceContent, resOrganizations, resUserGroups } = props;
    this.formsByUserSelected = {
      newEndUser: {
        generalOptions: {
          type: "vertical", //horizontal, vertical, inline
          formClassName: "test-form",
          submit: {
            className: "primary-button-style",
            text: "Create User",
          },
          reset: {
            className: "primary-button-style",
            text: "Clear",
          },
          cancel: {
            className: "primary-button-style cancel",
            text: "Cancel User",
            action: () => {
              // useRouter().back();
              console.log('cancel clicked')
            }
          }
        },
        formInitialValues: {
          firstName: "",
          lastName: "",
          organizationId: "",
          userName: "",
          password: "",
          userGroup: "",
          isAgent: false,
          number: "",
        },
        formValidations: (values) => {
          const errors = {};
          if(!values.firstName){
            errors.firstName = 'First name required'
          }
          if(!values.lastName){
            errors.lastName = 'Last name required'
          }
          if(!values.userName){
            errors.userName = 'Login name required'
          }
          if(!values.organizationId){
            errors.organizationId = 'Organization required'
          }
          if(!values.password){
            errors.password = 'Password required'
          }else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
          ){
            errors.password = 'At least 8 characters, one uppercase and one number'
          }
          return errors;
        },
        formSubmit: (values, { setSubmitting, setFieldError }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log('form submitted values',values)
            setSubmitting(false);
          }, 400);
        },
        formInputsRows: [
          {
            inputs: [
              {
                name: "firstName",
                label: "First Name",
                placeholder: "Put your first name",
                type: "text",
                required: true
              },
              {
                name: "lastName",
                label: "Last Name",
                placeholder: "Put your last name",
                type: "text",
                required: true
              },
              {
                name: "organizationId",
                label: "Organization",
                placeholder: "Select Organization",
                type: "select",
                required: true,
                options: resOrganizations.response,
                optionValue: "organizationId",
                optionLabel: "prefixName",
                customOnChange: async (value,formRows) => {
                  const api = new API();
                  console.log('this is custom value',value,formRows)
                  let inputOptionsToChange = formRows[1].inputs.find((input)=>{
                    return input.name === 'number'
                  })
                  console.log('this is input to change',inputOptionsToChange)
                  let newOptions = await api.GET("/tools/organization-number/"+value);
                  console.log('this response',newOptions.response)
                  if(inputOptionsToChange && newOptions.response){
                    inputOptionsToChange.options = newOptions.response
                  }
                }
              },
            ]
          },
          {
            inputs: [
              {
                name: "userName",
                label: "Login Name",
                placeholder: "Put your login name",
                type: "text",
                required: true
              },
              {
                name: "password",
                label: "Password",
                placeholder: "Put your password",
                type: "password",
                tooltip: "At least 8 characters, one uppercase and one number",
                required: true
              },
              {
                name: "userGroup",
                label: "User Group",
                placeholder: "Select Group",
                type: "select",
                required: true,
                options: resUserGroups,
                optionValue: "organizationId",
                optionLabel: "prefixName",
              },
              {
                name: "number",
                label: "DID",
                placeholder: "Select DID",
                type: "select",
                required: true,
                options: [],
                optionValue: "number",
                optionLabel: "number"
              },
            ]
          },
          {
            inputs: [
              {
                name: "isAgent",
                label: "Agent",
                placeholder: "",
                type: "switch",
                checkedChildren: "Yes",
                unCheckedChildren: "No",
                defaultChecked: false
              },
            ]
          }
        ],
      },
      orgAdminEnterprise: {
        generalOptions: {
          type: "vertical", //horizontal, vertical, inline
          formClassName: "test-form",
          submit: {
            className: "primary-button-style",
            text: "Create User",
          },
          reset: {
            className: "primary-button-style",
            text: "Clear",
          },
          cancel: {
            className: "primary-button-style cancel",
            text: "Cancel User",
            action: () => {
              // useRouter().back();
              console.log('cancel clicked')
            }
          }
        },
        formInitialValues: {
          firstName: "",
          lastName: "",
          username: "",
          password: ""
        },
        formValidations: (values) => {
          const errors = {};
          if(!values.firstName){
            errors.firstName = 'First name required'
          }
          if(!values.lastName){
            errors.lastName = 'Last name required'
          }
          if(!values.username){
            errors.username = 'Login name required'
          }
          if(!values.password){
            errors.password = 'Password required'
          }else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
          ){
            errors.password = 'At least 8 characters, one uppercase and one number'
          }
          return errors;
        },
        formSubmit: (values, { setSubmitting, setFieldError }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log('form submitted values',values)
            setSubmitting(false);
          }, 400);
        },
        formInputsRows: [
          {
            inputs: [
              {
                name: "firstName",
                label: "First Name",
                placeholder: "Put your first name",
                type: "text",
                required: true
              },
              {
                name: "lastName",
                label: "Last Name",
                placeholder: "Put your last name",
                type: "text",
                required: true
              },
              {
                name: "organizationId",
                label: "Organization",
                placeholder: "Select Organization",
                type: "select",
                required: true,
                options: resOrganizations.response,
                optionValue: "organizationId",
                optionLabel: "prefixName",
                customOnChange: async (value,formRows) => {
                  const api = new API();
                  console.log('this is custom value',value,formRows)
                  let inputOptionsToChange = formRows[1].inputs.find((input)=>{
                    return input.name === 'number'
                  })
                  console.log('this is input to change',inputOptionsToChange)
                  let testOptions = await api.GET("/tools/organization-number/"+value);
                  console.log('this response',testOptions.response)
                  if(testOptions.response){
                    inputOptionsToChange.options = testOptions.response
                  }
                }
              },
              {
                name: "username",
                label: "Login Name",
                placeholder: "Put your login name",
                type: "text",
                required: true
              },
            ]
          },
          {
            inputs: [
              {
                name: "password",
                label: "Password",
                placeholder: "Put your password",
                type: "password",
                tooltip: "At least 8 characters, one uppercase and one number",
                required: true
              },
              {
                name: "number",
                label: "DID",
                placeholder: "Select DID",
                type: "select",
                required: true,
                options: [],
                optionValue: "number",
                optionLabel: "number"
              },
            ]
          }
        ],
      },
      businessDistributor: {
        generalOptions: {
          type: "vertical", //horizontal, vertical, inline
          formClassName: "test-form",
          submit: {
            className: "primary-button-style",
            text: "Create User",
          },
          reset: {
            className: "primary-button-style",
            text: "Clear",
          },
          cancel: {
            className: "primary-button-style cancel",
            text: "Cancel User",
            action: () => {
              // useRouter().back();
              console.log('cancel clicked')
            }
          }
        },
        formInitialValues: {
          firstName: "",
          lastName: "",
          username: "",
          password: ""
        },
        formValidations: (values) => {
          const errors = {};
          if(!values.firstName){
            errors.firstName = 'First name required'
          }
          if(!values.lastName){
            errors.lastName = 'Last name required'
          }
          if(!values.username){
            errors.username = 'Login name required'
          }
          if(!values.password){
            errors.password = 'Password required'
          }else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
          ){
            errors.password = 'At least 8 characters, one uppercase and one number'
          }
          return errors;
        },
        formSubmit: (values, { setSubmitting, setFieldError }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log('form submitted values',values)
            setSubmitting(false);
          }, 400);
        },
        formInputsRows: [
          {
            inputs: [
              {
                name: "firstName",
                label: "First Name",
                placeholder: "Put your first name",
                type: "text",
                required: true
              },
              {
                name: "lastName",
                label: "Last Name",
                placeholder: "Put your last name",
                type: "text",
                required: true
              },
              {
                name: "username",
                label: "Login Name",
                placeholder: "Put your login name",
                type: "text",
                required: true
              },
              {
                name: "password",
                label: "Password",
                placeholder: "Put your password",
                type: "password",
                tooltip: "At least 8 characters, one uppercase and one number",
                required: true
              }
            ]
      
          }
        ],
      },
    };
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  render() {
    const { user, editServiceContent, resOrganizations } = this.props;
    // console.log(user);

    return (
      <BaseLayout>
        <NewUser
          formsByUserSelected={this.formsByUserSelected}
          editServiceContent={editServiceContent}
        />
      </BaseLayout>
    );
  }
}
