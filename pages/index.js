import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { LoginForm } from "../components/authentication/LoginForm";
import { ForgotPassword } from "../components/authentication/ForgotPassword";
import { BaseLayout } from "../layouts/BaseLayout";
import { systemLog } from "../scripts/General";
import { baseLanguage } from "../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
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
    // console.log(user);
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
