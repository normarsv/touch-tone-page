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

    return {
      currentLanguage,
      user,
      editServiceContent,
      resOrganizations,
    };
  }
  constructor(props) {
    super(props);
    const { user, editServiceContent, resOrganizations } = props;
    this.formsByUserSelected = {
      newEndUser: [
        {
          id: 1,
          title: "First Name",
          type: "input",
          key: "firstName",
        },
        { id: 2, title: "Last Name", type: "input", key: "lastName" },
        {
          id: 3,
          title: "Organization",
          type: "select",
          options: resOrganizations.response,
          optionsKey: "organizationId",
          key: "organizationId",
        },
        { id: 4, title: "Login Name", type: "input", key: "userName" },
        {
          id: 5,
          title: "Password",
          type: "input",
          extraMsg: "At least 8 characters, one uppercase and one number",
          key: "password",
        },
        {
          id: 6,
          title: "User Group",
          type: "select",
          options: [],
          optionsKey: "groupId",
          key: "userGroup",
        },
        {
          id: 7,
          title: "Agent for an inbound Contact Center",
          type: "switch",
          key: "isAgent",
        },
        {
          id: 8,
          title: "DID",
          type: "select",
          options: [],
          optionsKey: "number",
          key: "number",
          onChangeValue: async (props) => {
            if (props.valueChange === "organizationId") {
              const api = new API();
              const resDIDOrganization = await api.GET(
                "/Tools/organization-number/" +
                  props.currentFields.organizationId
              );
              const indexChange = props.currentForm.findIndex((formInput) => {
                return formInput.id === 8;
              });
              console.log(props);
              console.log(resDIDOrganization);
              const formReturn = [...props.currentForm];
              formReturn[indexChange].options = resDIDOrganization.response;
              const returnFields = { ...props.currentFields };
              delete returnFields.number;
              console.log({ form: formReturn, fields: returnFields });
              return { form: formReturn, fields: returnFields };
            } else {
              return { form: null, fields: null };
            }
          },
        },
      ],
      orgAdminEnterprise: [
        { id: 1, title: "First Name", type: "input", key: "firstName" },
        { id: 2, title: "Last Name", type: "input", key: "lastName" },
        {
          id: 3,
          title: "Organization",
          type: "select",
          options: resOrganizations.response,
          optionsKey: "organizationId",
          key: "organizationId",
        },

        { id: 4, title: "Login Name", type: "input" },
        {
          id: 5,
          title: "Password",
          type: "input",
          extraMsg: "At least 8 characters, one uppercase and one number",
        },
        {
          id: 6,
          title: "DID",
          type: "select",
          key: "didID",
          options: [],
          optionsKey: "number",
          key: "did",
        },
      ],
      businessDistributor: [
        { id: 1, title: "First Name", type: "input" },
        { id: 2, title: "Last Name", type: "input" },
        { id: 4, title: "Login Name", type: "input" },
        {
          id: 5,
          title: "Password",
          type: "input",
          extraMsg: "At least 8 characters, one uppercase and one number",
        },
      ],
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
