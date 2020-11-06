import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import API from "../../API/API";
import ManageUsers from "../../components/tier2-screens/ManageUsers";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const resManageUsers = await api.GET("/Users/orgId/" + user.organizationId);

    const finalManageUsersList = [];

    for (const currentUser of resManageUsers.response) {
      finalManageUsersList.push({
        key: currentUser.authUser.id,
        name:
          currentUser.authUser.firstName + " " + currentUser.authUser.lastName,
        email: currentUser.authUser.email,
        did: currentUser.authUser.did,
        actions: currentUser.authUser.id,
        active: currentUser.authUser.isActive,
      });
    }

    const manageUsersContent = [
      {
        id: 1,
        name: "Peter Lock",
        email: "PeterLock@gmail.com",
        status: "33278779099",
        actions: "peter",
        active: true,
      },
      {
        id: 2,
        name: "Anna Frías",
        email: "Annafrias@gmail.com",
        status: "33278779099",
        actions: "anna",
        active: false,
      },
      {
        id: 3,
        name: "Samuel Harlock",
        email: "samuelharlock@gmail.com",
        status: "33278779099",
        actions: "Samuel",
        active: true,
      },
      {
        id: 4,
        name: "Sebastian Bones",
        email: "sebastianbones@gmail.com",
        status: "33278779099",
        actions: "Sebastian",
        active: true,
      },
      {
        id: 5,
        name: "Orlando Tyler",
        email: "orlandotyler@gmail.com",
        status: "33278779099",
        actions: "Orlando",
        active: true,
      },
      {
        id: 6,
        name: "Brad Bloom",
        email: "bradbloom@gmail.com",
        status: "33278779099",
        actions: "Brad",
        active: false,
      },
      {
        id: 7,
        name: "Linda King",
        email: "lindaking@gmail.com",
        status: "33278779099",
        actions: "Linda",
        route: true,
      },
      {
        id: 8,
        name: "Thomas Hank",
        email: "thomashank@gmail.com",
        status: "33278779099",
        actions: "Thomas",
        active: false,
      },
    ];

    return {
      currentLanguage,
      user,
      manageUsersContent,
      resManageUsers,
      finalManageUsersList,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = "";
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    const { finalManageUsersList } = this.props;

    return (
      <BaseLayout>
        <ManageUsers manageUsersContent={finalManageUsersList} />
      </BaseLayout>
    );
  }
}
