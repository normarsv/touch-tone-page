import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";
import { MainScreen } from "../../../components/main-screen/MainScreen";
import ListAllOrganizations from "../../../components/tier1-screens/ListAllOrganizations";
import { Space } from "antd";
import ListAllUsers from "../../../components/tier1-screens/ListAllUsers";
import API from "../../../API/API";
import CallRecordingsOA from "../../../components/tier2-screens/CallRecordingsOA";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const resUserList = await api.GET("/portal-users/");

    const finalUserList = [];
    for (let i = 0; i < resUserList.response.length; i++) {
      const currentUser = resUserList.response[i];

      finalUserList.push({
        name:
          currentUser.auth_user.first_name +
          " " +
          currentUser.auth_user.last_name,
        email: currentUser.auth_user.email,
        status: currentUser.userstatusid.description,
        actions: currentUser.auth_user.id,
      });
    }

    const data = [
      {
        key: "1",
        name: "Peter Lock",
        email: "PeterLock@gmail.com",
        status: 33278579099,
      },
      {
        key: "2",
        name: "Anna Frias",
        email: "AnnaFrias@gmail.com",
        status: 33278579099,
      },
      {
        key: "3",
        name: "Samuel Harlock",
        email: "SamuelHarlock@gmail.com",
        status: 33278579099,
      },
      {
        key: "4",
        name: "Sebastian Bones",
        email: "SebastianBones@gmail.com",
        status: 33278579099,
      },
    ];

    return {
      currentLanguage,
      // columns,
      data,
      user,
      resUserList,
      finalUserList,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = "";
  }
  componentDidMount() {
    systemLog.log(this.props);
    const finalUserList = [];
    for (let i = 0; i < this.props.resUserList.length; i++) {
      const currentUser = this.props.resUserList.response[i];

      finalUserList.push({
        name: currentUser.first_name + currentUser.last_name,
      });
    }
    console.log(finalUserList);
  }

  render() {
    const { user, resUserList, finalUserList } = this.props;
    console.log(resUserList.response[0], "USER LIST");

    return (
      <BaseLayout>
        <CallRecordingsOA />
      </BaseLayout>
    );
  }
}
