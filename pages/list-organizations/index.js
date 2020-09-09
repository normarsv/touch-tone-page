import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";
import { MainScreen } from "../../components/main-screen/MainScreen";
import ListAllOrganizations from "../../components/tier1-screens/ListAllOrganizations";
import { Space } from "antd";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const data = [
      {
        key: "1",
        name: "100000020170 - DIAL CONECCTION LLC",
        billing: 32,
        orgDist: 8,
        didsCount: 8,
        users: 8,
      },
      {
        key: "2",
        name: "100000020170 - DIAL CONECCTION LLC",
        billing: 42,
        orgDist: 8,
        didsCount: 8,
        users: 8,
      },
      {
        key: "3",
        name: "100000020170 - DIAL CONECCTION LLC",
        billing: 32,
        orgDist: 0,
        didsCount: 8,
        users: 8,
      },
      {
        key: "4",
        name: "100000020170 - DIAL CONECCTION LLC",
        billing: 99,
        orgDist: 0,
        didsCount: 8,
        users: 34,
      },
    ];

    return {
      currentLanguage,
      // columns,
      data,
      user,
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
    const { user } = this.props;
    console.log(user);
    return (
      <BaseLayout>
        <ListAllOrganizations
          data={this.props.data}
          // columns={this.props.columns}
        />
      </BaseLayout>
    );
  }
}
