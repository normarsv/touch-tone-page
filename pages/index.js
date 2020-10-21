import moment from "moment/min/moment-with-locales.js";
import Router from "next/router";
import { Component } from "react";

import { ForgotPassword } from "../components/authentication/ForgotPassword";
import { LoginForm } from "../components/authentication/LoginForm";
import { BaseLayout } from "../layouts/BaseLayout";
import { systemLog } from "../scripts/General";
import { baseLanguage } from "../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (user.group !== undefined) {
      if (res) {
        switch (user.group) {
          case "SuperAdmin":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            break;
          case "OrganizationAdmin":
            res.writeHead(302, {
              Location: "/admin-dashboard",
            });
            break;

          default:
            break;
        }

        res.end();
      } else {
        // Router.push("/");
      }
    }
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: (text) => <a>{text}</a>,
        fixed: "left",
      },
      {
        title: "Billing ID in Rev.io",
        dataIndex: "billing",
      },
      {
        title: "Organization Admin",
        dataIndex: "adminOrg",
      },
      {
        title: "Organization Distributors",
        dataIndex: "orgDist",
      },
      {
        title: "Count of enabled Services",
        dataIndex: "services",
      },
    ];
    const data = [
      {
        key: "1",
        name: "100000020170 - DIAL CONECCTION LLC",
        billing: 32,
        adminOrg: 8,
        orgDist: 8,
        services: 8,
      },
      {
        key: "2",
        name: "100000020170 - DIAL CONECCTION LLC",
        billing: 42,
        adminOrg: 8,
        orgDist: 8,
        services: 8,
      },
      {
        key: "3",
        name: "100000020170 - DIAL CONECCTION LLC",
        billing: 32,
        adminOrg: 0,
        orgDist: 8,
        services: 8,
      },
      {
        key: "4",
        name: "100000020170 - DIAL CONECCTION LLC",
        billing: 99,
        adminOrg: 0,
        orgDist: 8,
        services: 8,
      },
    ];

    return {
      currentLanguage,
      columns,
      data,
      user,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = "";
    this.state = { showForgotPassword: false };
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    const { user } = this.props;
    return (
      <BaseLayout>
        {this.state.showForgotPassword ? (
          <ForgotPassword
            showForgotPassword={() =>
              this.setState({
                showForgotPassword: !this.state.showForgotPassword,
              })
            }
          />
        ) : (
          <LoginForm
            showForgotPassword={() =>
              this.setState({
                showForgotPassword: !this.state.showForgotPassword,
              })
            }
          />
        )}
      </BaseLayout>
    );
  }
}
