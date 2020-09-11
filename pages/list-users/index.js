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
