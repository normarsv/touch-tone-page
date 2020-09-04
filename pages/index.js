import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { MainScreen } from "../components/main-screen/MainScreen";
import { BaseLayout } from "../layouts/BaseLayout";
import { systemLog } from "../scripts/General";
import { baseLanguage } from "../scripts/MainInfoData";
import UserProvider from "../components/authentication/UserContext";
import { LoginForm } from "../components/authentication/LoginForm";

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
      userInfo: user,
    };
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    return (
      <BaseLayout>
        {this.props.userInfo.name ? (
          <MainScreen data={this.props.data} columns={this.props.columns} />
        ) : (
          <LoginForm />
        )}
      </BaseLayout>
    );
  }
}
