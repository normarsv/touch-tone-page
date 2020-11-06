import moment from "moment/min/moment-with-locales.js";
import Router from "next/router";
import { Component } from "react";
import API from "../../API/API";
import ListAllOrganizations from "../../components/tier1-screens/ListAllOrganizations";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
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
    }

    const api = new API();

    const resOrganizations = await api.GET("/Tools/organizatiosT/");

    let organizationsTableList = [];

    for (let i = 0; i < resOrganizations.response.length; i++) {
      const currentElement = resOrganizations.response[i];
      organizationsTableList.push({
        key: currentElement.id,
        name: currentElement.organzationName,
        billingId: currentElement.billingId,
        orgDist: currentElement.distributor,
        didsCount: currentElement.dids,
        users: currentElement.users,
        // actions: currentElement.id,
        status: currentElement.status,
      });
    }

    return {
      user,
      resOrganizations,
      organizationsTableList,
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
    const { organizationsTableList } = this.props;
    // console.log(user);
    return (
      <BaseLayout>
        <ListAllOrganizations organizationsTableList={organizationsTableList} />
      </BaseLayout>
    );
  }
}
