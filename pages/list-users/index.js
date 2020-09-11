import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";
import { MainScreen } from "../../components/main-screen/MainScreen";
import ListAllOrganizations from "../../components/tier1-screens/ListAllOrganizations";
import { Space } from "antd";
import ListAllUsers from "../../components/tier1-screens/ListAllUsers";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const data = [
      {
        key: "1",
        name: "Walmart",
        billing: 32,
        orgDist: 8,
        didsCount: 8,
        users: 8,
      },
      {
        key: "2",
        name: "Costco",
        billing: 42,
        orgDist: 8,
        didsCount: 8,
        users: 8,
      },
      {
        key: "3",
        name: "Test 3",
        billing: 32,
        orgDist: 0,
        didsCount: 8,
        users: 8,
      },
      {
        key: "4",
        name: "Test 4",
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
    // console.log(user);
    return (
      <BaseLayout>
        <ListAllUsers data={this.props.data} />
      </BaseLayout>
    );
  }
}
