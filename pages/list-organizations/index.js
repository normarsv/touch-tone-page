import { Component } from "react";

import API from "../../API/API";
import ListAllOrganizations from "../../components/tier1-screens/ListAllOrganizations";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case "CorporateService":
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
    }

    const api = new API(user.token);

    const resOrganizations = await api.GET("/Tools/organizationsT/");

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
    this.state = {
      organizationsTableList: props.organizationsTableList,
    };
    this.refreshOrg = this.refreshOrg.bind(this);
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  async refreshOrg() {
    const api = new API(this.props.user.token);

    const resOrganizations = await api.GET("/Tools/organizationsT/");

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
    this.setState({ organizationsTableList: organizationsTableList });
  }
  render() {
    const { user } = this.props;
    return (
      <BaseLayout>
        <ListAllOrganizations
          userInfo={user}
          organizationsTableList={this.state.organizationsTableList}
          refreshOrg={this.refreshOrg}
        />
      </BaseLayout>
    );
  }
}
