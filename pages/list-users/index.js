import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import API from "../../API/API";
import ListAllUsers from "../../components/tier1-screens/ListAllUsers";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const resUserList = await api.GET("/Users/");
    let resQueryUserList;
    if (query.orgId !== undefined) {
      resQueryUserList = await api.GET("/Users/orgId?=" + query.orgId);
    }

    const finalUserList = [];
    for (let i = 0; i < resUserList.response.length; i++) {
      const currentUser = resUserList.response[i].authUser;

      finalUserList.push({
        name: currentUser.firstName + " " + currentUser.lastName,
        email: currentUser.email,
        did: currentUser.did,
        status: currentUser.isActive,
        actions: currentUser.id,
      });
    }

    return {
      currentLanguage,
      user,
      resUserList,
      finalUserList,
      query,
      resQueryUserList,
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
    const { finalUserList } = this.props;

    return (
      <BaseLayout>
        <ListAllUsers userTableList={finalUserList} />
      </BaseLayout>
    );
  }
}
