import { Component } from "react";
import API from "../../../API/API";
import NewUser from "../../../components/user/NewUser";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res && user.group) {
      switch (user.group) {
        case "OrganizationAdmin":
          res.writeHead(302, {
            Location: "/admin-dashboard",
          });
          res.end();

          break;

        case "EndUser":
          res.writeHead(302, {
            Location: "/user-dashboard",
          });
          res.end();

          break;

        default:
          break;
      }
    } else {
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    }

    let editServiceContent = new Array(24).fill({
      id: 1,
      title: "Access to the User list view",
      status: true,
    });

    const api = new API();
    const resOrganizations = await api.GET("/Organizations/");
    const resUserGroups = [];
    // const resUserGroups = await api.GET("/Organizations/");

    return {
      user,
      editServiceContent,
      resOrganizations,
      resUserGroups,
    };
  }
  constructor(props) {
    super(props);
    const { user, editServiceContent, resOrganizations, resUserGroups } = props;
    this.state = { authGroupValue: "" };
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
              console.log("cancel clicked");
            },
          },
        },
        formInitialValues: {
          userName: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          isAgent: false,
          organizationId: "",
          userTypeId: "",
          userStatusId: 1,
          isStaff: false,
          authGroupId: "",
          didID: "",
        },
        formValidations: (values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "First name required";
          }
          if (!values.lastName) {
            errors.lastName = "Last name required";
          }
          if (!values.userName) {
            errors.userName = "Login name required";
          }
          if (!values.organizationId) {
            errors.organizationId = "Organization required";
          }
          if (!values.email) {
            errors.email = "Email required";
          }
          if (!values.userTypeId) {
            errors.userTypeId = "User Type is required";
          }
          if (!values.didID) {
            errors.didID = "User DID is required";
          }
          if (!values.password) {
            errors.password = "Password required";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(
              values.password
            )
          ) {
            errors.password =
              "At least 8 characters, one uppercase and one number";
          }
          return errors;
        },
        formSubmit: (values, { setSubmitting, setFieldError }) => {
          this.submitForm(values, this.state.authGroupValue);
          // values = {};
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            // console.log("form submitted values", values);
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
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "lastName",
                label: "Last Name",
                placeholder: "Put your last name",
                type: "text",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "organizationId",
                label: "Organization",
                placeholder: "Select Organization",
                type: "select",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
                options: resOrganizations.response,
                optionValue: "organizationId",
                optionLabel: "prefixName",
                customOnChange: async (value, formRows) => {
                  const api = new API();
                  let inputOptionsToChange = formRows[1].inputs.find(
                    (input) => {
                      return input.name === "didID";
                    }
                  );

                  let newOptions = await api.GET(
                    "/tools/organization-number/" + value
                  );
                  console.log("this response", newOptions.response);
                  if (inputOptionsToChange && newOptions.response) {
                    inputOptionsToChange.options = newOptions.response;
                  }
                },
              },
            ],
          },
          {
            inputs: [
              {
                name: "userName",
                label: "Login Name",
                placeholder: "Put your login name",
                type: "text",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "password",
                label: "Password",
                placeholder: "Put your password",
                type: "password",
                tooltip: "At least 8 characters, one uppercase and one number",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "didID",
                label: "DID",
                placeholder: "Select DID",
                type: "select",
                required: true,
                options: [],
                optionValue: "numberId",
                optionLabel: "number",
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
            ],
          },
          {
            inputs: [
              {
                name: "email",
                label: "Email",
                placeholder: "Put the user email",
                type: "text",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "userTypeId",
                label: "User Type",
                placeholder: "Select User Type",
                type: "select",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
                options: [
                  { userTypeName: "GRA", userTypeId: 1 },
                  { userTypeName: "Sippo", userTypeId: 2 },
                ],
                optionValue: "userTypeId",
                optionLabel: "userTypeName",
              },
              {
                name: "isAgent",
                label: "Agent",
                placeholder: "",
                type: "switch",
                checkedChildren: "Yes",
                unCheckedChildren: "No",
                defaultChecked: false,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
            ],
          },
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
              console.log("cancel clicked");
            },
          },
        },
        formInitialValues: {
          userName: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          isAgent: false,
          organizationId: "",
          userTypeId: "",
          userStatusId: 1,
          isStaff: false,
          authGroupId: "",
          didID: "",
        },
        formValidations: (values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "First name required";
          }
          if (!values.lastName) {
            errors.lastName = "Last name required";
          }
          if (!values.userName) {
            errors.userName = "Login name required";
          }
          if (!values.organizationId) {
            errors.organizationId = "Organization required";
          }
          if (!values.didID) {
            errors.didID = "User DID is required";
          }
          if (!values.password) {
            errors.password = "Password required";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(
              values.password
            )
          ) {
            errors.password =
              "At least 8 characters, one uppercase and one number";
          }
          return errors;
        },
        formSubmit: (values, { setSubmitting, setFieldError }) => {
          this.submitForm(values, this.state.authGroupValue);

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            // console.log("form submitted values", values);
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
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "lastName",
                label: "Last Name",
                placeholder: "Put your last name",
                type: "text",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "organizationId",
                label: "Organization",
                placeholder: "Select Organization",
                type: "select",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
                options: resOrganizations.response,
                optionValue: "organizationId",
                optionLabel: "prefixName",
                customOnChange: async (value, formRows) => {
                  const api = new API();
                  let inputOptionsToChange = formRows[1].inputs.find(
                    (input) => {
                      return input.name === "didID";
                    }
                  );

                  let testOptions = await api.GET(
                    "/tools/organization-number/" + value
                  );
                  console.log("this response", testOptions.response);
                  if (testOptions.response) {
                    inputOptionsToChange.options = testOptions.response;
                  }
                },
              },
            ],
          },
          {
            inputs: [
              {
                name: "userName",
                label: "Login Name",
                placeholder: "Put your login name",
                type: "text",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "password",
                label: "Password",
                placeholder: "Put your password",
                type: "password",
                tooltip: "At least 8 characters, one uppercase and one number",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "didID",
                label: "DID",
                placeholder: "Select DID",
                type: "select",
                required: true,
                options: [],
                optionValue: "numberId",
                optionLabel: "number",
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
            ],
          },
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
              console.log("cancel clicked");
            },
          },
        },
        formInitialValues: {
          userName: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          isAgent: false,
          organizationId: "",
          userTypeId: "",
          userStatusId: 1,
          isStaff: false,
          authGroupId: "",
          didID: "",
        },
        formValidations: (values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "First name required";
          }
          if (!values.lastName) {
            errors.lastName = "Last name required";
          }
          if (!values.userName) {
            errors.userName = "Login name required";
          }
          if (!values.password) {
            errors.password = "Password required";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(
              values.password
            )
          ) {
            errors.password =
              "At least 8 characters, one uppercase and one number";
          }
          return errors;
        },
        formSubmit: (values, { setSubmitting, setFieldError }) => {
          this.submitForm(values, this.state.authGroupValue);

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            // console.log("form submitted values", values);
            setSubmitting(false);
          }, 2000);
        },
        formInputsRows: [
          {
            inputs: [
              {
                name: "firstName",
                label: "First Name",
                placeholder: "Put your first name",
                type: "text",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "lastName",
                label: "Last Name",
                placeholder: "Put your last name",
                type: "text",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "userName",
                label: "Login Name",
                placeholder: "Put your login name",
                type: "text",
                required: true,
                breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              },
              {
                name: "password",
                label: "Password",
                placeholder: "Put your password",
                type: "password",
                tooltip: "At least 8 characters, one uppercase and one number",
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
      organizationId: valuesToSubmit.organizationId,
      userTypeId: valuesToSubmit.userTypeId,
      userStatusId: valuesToSubmit.userStatusId,
      isStaff: valuesToSubmit.isStaff,
      authGroupId: authGroupValue,
      didID: valuesToSubmit.didID,
    };
    console.log(finalSubmit, "true final form");

    const responseNewUser = await api
      .POST("/AuthUsers/Signup", finalSubmit)
      .then(() => console.log(responseNewUser));
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
              case "businessSupport":
                this.setState({ authGroupValue: 5 });
                break;
              case "distributor":
                this.setState({ authGroupValue: 6 });
                break;
              case "organizationAdmin":
                this.setState({ authGroupValue: 2 });
                break;
              case "endUser":
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
