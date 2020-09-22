import { faDownload } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import NewUser from "../../../components/user/NewUser";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    let editServiceContent = new Array(24).fill({
      id: 1,
      title: "Access to the User list view",
      status: true,
    });

    const userServicesForm = [
      { id: 1, title: "First Name", type: "input" },
      { id: 2, title: "Last Name", type: "input" },
      { id: 3, title: "Organization", type: "select" },
      { id: 4, title: "Extension Type", type: "select" },
      { id: 5, title: "Extension", type: "input" },
      { id: 6, title: "SIP User", type: "input" },
      { id: 7, title: "Login Name", type: "input" },
      {
        id: 8,
        title: "Password",
        type: "input",
        extraMsg: "At least 8 characters, one uppercase and one number",
      },
      { id: 9, title: "User Group", type: "select" },
      { id: 10, title: "Role", type: "select" },
      { id: 11, title: "Agent for an inbound Contact Center", type: "switch" },
      { id: 12, title: "Download E911", type: "button", icon: faDownload },
      { id: 13, title: "DID", type: "select" },
    ];

    return {
      currentLanguage,
      user,
      editServiceContent,
      userServicesForm,
    };
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  render() {
    const { user, editServiceContent, userServicesForm } = this.props;
    // console.log(user);
    return (
      <BaseLayout>
        <NewUser
          userServicesForm={userServicesForm}
          editServiceContent={editServiceContent}
        />
      </BaseLayout>
    );
  }
}
