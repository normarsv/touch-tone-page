import { message } from 'antd';
import { withRouter } from 'next/dist/client/router';
import { Component } from 'react';

import API from '../../../API/API';
import NewUser from '../../../components/user/NewUser';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { IsAValidEmail, systemLog } from '../../../scripts/General';

class NewUserPage extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case 'CorporateService':
          case 'OrganizationAdmin':
            res.writeHead(302, {
              Location: '/admin-dashboard',
            });
            res.end();

            break;

          case 'EndUser':
            res.writeHead(302, {
              Location: '/user-dashboard',
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

    let editServiceContent = new Array(24).fill({
      id: 1,
      title: 'Access to the User list view',
      status: true,
    });

    const api = new API(user.token);
    const resOrganizations = await api.GET('/Organizations/');
    const resUserTypes = await api.GET('/UserTypes/');
    const resUserGroups = [];
    // const resUserGroups = await api.GET("/Organizations/");

    return {
      user,
      editServiceContent,
      resOrganizations,
      resUserGroups,
      resUserTypes,
    };
  }
  constructor(props) {
    super(props);
    console.log(props);
    const { user, editServiceContent, resOrganizations, resUserGroups } = props;
    this.state = { authGroupValue: '', userTypeForce: '' };
    this.formsByUserSelected = {
      newEndUser: {
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
              props.router.push('/list-users');
            },
          },
        },
        formInitialValues: {
          userName: '',
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          isAgent: false,
          organizationId: '',
          userTypeId: 1,
          userStatusId: 1,
          isStaff: false,
          authGroupId: '',
          didID: '',
        },
        formValidations: (values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'First name required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last name required';
          }
          if (!values.userName) {
            errors.userName = 'Login name required';
          }
          if (!values.organizationId) {
            errors.organizationId = 'Organization required';
          }
          if (IsAValidEmail(values.email) === false) {
            errors.email = 'Email required';
          }
          if (!values.userTypeId) {
            errors.userTypeId = 'User Type is required';
          }
          if (!values.didID) {
            errors.didID = 'User DID is required';
          }
          if (!values.password) {
            errors.password = 'Password required';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{9,})/i.test(
              values.password
            )
          ) {
            errors.password =
              'At least 9 characters, one uppercase and one number';
          }
          return errors;
        },
        formSubmit: async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          message.loading({ content: 'Loading...', key: 'signup' });
          try {
            const resSubmitForm = await this.submitForm(
              values,
              this.state.authGroupValue
            );
            console.log(resSubmitForm);
            if (resSubmitForm.statusCode !== 200) {
              let messageData = 'There was an error creating the User';
              if (resSubmitForm.response.message !== undefined) {
                messageData = resSubmitForm.response.message;
              }
              message.error({
                content: messageData,
                key: 'signup',
                duration: 5,
              });
              setSubmitting(false);
            } else {
              message.success({
                content: 'User Created Successfully!.',
                key: 'signup',
                duration: 2,
              });
              props.router.push('/list-users');
            }
          } catch (error) {
            console.log(error);
            setSubmitting(false);
            message.error({
              content: 'There was an error creating the User',
              key: 'signup',
              duration: 5,
            });
          }
        },
        formInputsRows: [
          {
            inputs: [
              {
                name: 'firstName',
                label: 'First Name',
                placeholder: 'Put your first name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'lastName',
                label: 'Last Name',
                placeholder: 'Put your last name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'organizationId',
                label: 'Organization',
                placeholder: 'Select Organization',
                type: 'select',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
                options: resOrganizations.response,
                optionValue: 'organizationId',
                optionLabel: 'prefixName',
                customOnChange: async (
                  newVal,
                  formOptions,
                  formikData,
                  indexArray
                ) => {
                  const api = new API(props.user.token);
                  let inputOptionsToChange = formOptions.formInputsRows[1].inputs.find(
                    (input) => {
                      return input.name === 'didID';
                    }
                  );

                  let newOptions = await api.GET(
                    '/tools/organization-available-number/' + newVal
                  );
                  if (inputOptionsToChange && newOptions.response) {
                    inputOptionsToChange.options = newOptions.response;
                  }
                  formikData.setFieldValue('didID', '');
                },
              },
            ],
          },
          {
            inputs: [
              {
                name: 'userName',
                label: 'Login Name',
                placeholder: 'Put your login name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'password',
                label: 'Password',
                placeholder: 'Put your password',
                type: 'password',
                tooltip: 'At least 9 characters, one uppercase and one number',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'didID',
                label: 'DID',
                placeholder: 'Select DID',
                type: 'select',
                required: true,
                options: [],
                optionValue: 'numberId',
                optionLabel: 'number',
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
            ],
          },
          {
            inputs: [
              {
                name: 'email',
                label: 'Email',
                placeholder: 'Put the user email',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'userTypeId',
                label: 'User Type',
                placeholder: 'Select User Type',
                type: 'select',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
                options: [
                  { userTypeName: 'GRA', userTypeId: 1 },
                  { userTypeName: 'Sippo', userTypeId: 2 },
                  { userTypeName: 'Both', userTypeId: 8 },
                ],
                optionValue: 'userTypeId',
                optionLabel: 'userTypeName',
              },
              {
                name: 'isAgent',
                label: 'Agent',
                placeholder: '',
                type: 'switch',
                checkedChildren: 'Yes',
                unCheckedChildren: 'No',
                defaultChecked: false,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
            ],
          },
        ],
      },
      orgAdminEnterprise: {
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
              props.router.push('/list-users');
            },
          },
        },
        formInitialValues: {
          userName: '',
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          isAgent: false,
          organizationId: '',
          userTypeId: '',
          userStatusId: 1,
          isStaff: false,
          authGroupId: '',
          didID: '',
        },
        formValidations: (values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'First name required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last name required';
          }
          if (!values.userName) {
            errors.userName = 'Login name required';
          }
          if (!values.organizationId) {
            errors.organizationId = 'Organization required';
          }
          if (!values.didID) {
            errors.didID = 'User DID is required';
          }
          if (IsAValidEmail(values.email) === false) {
            errors.email = 'Email required';
          }
          if (!values.password) {
            errors.password = 'Password required';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{9,})/i.test(
              values.password
            )
          ) {
            errors.password =
              'At least 9 characters, one uppercase and one number';
          }
          return errors;
        },

        formSubmit: async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          message.loading({ content: 'Loading...', key: 'signup' });
          try {
            const resSubmitForm = await this.submitForm(
              values,
              this.state.authGroupValue
            );
            console.log(resSubmitForm);
            if (resSubmitForm.statusCode !== 200) {
              let messageData = 'There was an error creating the User';
              if (resSubmitForm.response.message !== undefined) {
                messageData = resSubmitForm.response.message;
              }
              message.error({
                content: messageData,
                key: 'signup',
                duration: 5,
              });
              setSubmitting(false);
            } else {
              message.success({
                content: 'User Created Successfully!.',
                key: 'signup',
                duration: 2,
              });
              props.router.push('/list-users');
            }
          } catch (error) {
            console.log(error);
            setSubmitting(false);
            message.error({
              content: 'There was an error creating the User',
              key: 'signup',
              duration: 5,
            });
          }
        },
        formInputsRows: [
          {
            inputs: [
              {
                name: 'firstName',
                label: 'First Name',
                placeholder: 'Put your first name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'lastName',
                label: 'Last Name',
                placeholder: 'Put your last name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'organizationId',
                label: 'Organization',
                placeholder: 'Select Organization',
                type: 'select',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
                options: resOrganizations.response,
                optionValue: 'organizationId',
                optionLabel: 'prefixName',
                customOnChange: async (
                  newVal,
                  formOptions,
                  formikData,
                  indexArray
                ) => {
                  const api = new API(props.user.token);
                  let inputOptionsToChange = formOptions.formInputsRows[1].inputs.find(
                    (input) => {
                      return input.name === 'didID';
                    }
                  );

                  let testOptions = await api.GET(
                    '/tools/organization-available-number/' + newVal
                  );
                  console.log('this response', testOptions.response);
                  if (testOptions.response) {
                    inputOptionsToChange.options = testOptions.response;
                  }
                  formikData.setFieldValue('didID', '');
                },
              },
            ],
          },
          {
            inputs: [
              {
                name: 'userName',
                label: 'Login Name',
                placeholder: 'Put your login name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'didID',
                label: 'DID',
                placeholder: 'Select DID',
                type: 'select',
                required: true,
                options: [],
                optionValue: 'numberId',
                optionLabel: 'number',
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
            ],
          },
          {
            inputs: [
              {
                name: 'email',
                label: 'Email',
                placeholder: 'Put the user email',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'password',
                label: 'Password',
                placeholder: 'Put your password',
                type: 'password',
                tooltip: 'At least 9 characters, one uppercase and one number',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
            ],
          },
        ],
      },
      businessDistributor: {
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
              props.router.push('/list-users');
            },
          },
        },
        formInitialValues: {
          userName: '',
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          isAgent: false,
          organizationId: '',
          userTypeId: '',
          userStatusId: 1,
          isStaff: false,
          authGroupId: '',
          didID: '',
        },
        formValidations: (values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'First name required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last name required';
          }
          if (!values.userName) {
            errors.userName = 'Login name required';
          }
          if (IsAValidEmail(values.email) === false) {
            errors.email = 'Email required';
          }
          if (!values.password) {
            errors.password = 'Password required';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{9,})/i.test(
              values.password
            )
          ) {
            errors.password =
              'At least 9 characters, one uppercase and one number';
          }
          return errors;
        },

        formSubmit: async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          message.loading({ content: 'Loading...', key: 'signup' });
          try {
            const resSubmitForm = await this.submitForm(
              values,
              this.state.authGroupValue
            );
            console.log(resSubmitForm);
            if (resSubmitForm.statusCode !== 200) {
              let messageData = 'There was an error creating the User';
              if (resSubmitForm.response.message !== undefined) {
                messageData = resSubmitForm.response.message;
              }
              message.error({
                content: messageData,
                key: 'signup',
                duration: 5,
              });
              setSubmitting(false);
            } else {
              message.success({
                content: 'User Created Successfully!.',
                key: 'signup',
                duration: 2,
              });
              props.router.push('/list-users');
            }
          } catch (error) {
            console.log(error);
            setSubmitting(false);
            message.error({
              content: 'There was an error creating the User',
              key: 'signup',
              duration: 5,
            });
          }
        },
        formInputsRows: [
          {
            inputs: [
              {
                name: 'firstName',
                label: 'First Name',
                placeholder: 'Put your first name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'lastName',
                label: 'Last Name',
                placeholder: 'Put your last name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'userName',
                label: 'Login Name',
                placeholder: 'Put your login name',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'email',
                label: 'Email',
                placeholder: 'Put the user email',
                type: 'text',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: 'password',
                label: 'Password',
                placeholder: 'Put your password',
                type: 'password',
                tooltip: 'At least 9 characters, one uppercase and one number',
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
            ],
          },
        ],
      },
    };
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  async submitForm(valuesToSubmit, authGroupValue) {
    console.log(valuesToSubmit);
    const { user } = this.props;

    const api = new API(user.token);

    const finalSubmit = {
      userName: valuesToSubmit.userName,
      email: valuesToSubmit.email,
      firstName: valuesToSubmit.firstName,
      lastName: valuesToSubmit.lastName,
      password: valuesToSubmit.password,
      isAgent: valuesToSubmit.isAgent,
      organizationId:
        valuesToSubmit.organizationId !== ''
          ? valuesToSubmit.organizationId
          : 0,
      userTypeId:
        valuesToSubmit.userTypeId !== ''
          ? valuesToSubmit.userTypeId
          : this.state.userTypeForce !== undefined
          ? this.state.userTypeForce
          : undefined,
      userStatusId: valuesToSubmit.userStatusId,
      isStaff: authGroupValue === 5 ? true : valuesToSubmit.isStaff,
      authGroupId: authGroupValue,
      didID: valuesToSubmit.didID !== '' ? valuesToSubmit.didID : undefined,
    };
    console.log(finalSubmit, 'true final form');

    const responseNewUser = await api.POST('/AuthUsers/Signup', finalSubmit);
    console.log(responseNewUser);
    return responseNewUser;
  }

  render() {
    const { user, editServiceContent, resOrganizations } = this.props;

    return (
      <BaseLayout>
        <NewUser
          formsByUserSelected={this.formsByUserSelected}
          editServiceContent={editServiceContent}
          displayedForm={(value) => {
            switch (value) {
              case 'businessSupport':
                this.setState({ authGroupValue: 5, userTypeForce: 5 });
                break;
              case 'distributor':
                this.setState({ authGroupValue: 6, userTypeForce: 4 });
                break;
              case 'organizationAdmin':
                this.setState({ authGroupValue: 2, userTypeForce: 5 });
                break;
              case 'corporateService':
                this.setState({ authGroupValue: 8, userTypeForce: 3 });
                break;
              case 'endUser':
                this.setState({ authGroupValue: 3 });
                break;

              default:
                break;
            }
          }}
        />
      </BaseLayout>
    );
  }
}

export default withRouter(NewUserPage);
