import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import MainDashboard from "../../components/base/MainDashboard";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const adminDashboardContent = [
      {
        id: 1,
        title: "Manage Users",
        count: "9 Users",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View all Users",
        route: "/manage-users",
      },
      {
        id: 2,
        title: "Queues",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Queues",
        route: "/queues",
      },
      {
        id: 3,
        title: "Auto attendant",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Auto attendant",
        route: "/auto-attendant",
      },
      {
        id: 4,
        title: "Call Records",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Call Records",
        route: "/telephony-features/call-recordings",
      },
      // {
      //   id: 5,
      //   title: "Call Reporting",
      //   count: "",
      //   desc:
      //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      //   buttonTitle: "View Calls Reporting",
      //   route: "/telephony-features/call-reporting",
      // },
      {
        id: 6,
        title: "Meeting",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Mettings",
        route: "/meetings",
      },
      {
        id: 7,
        title: "Ring Groups",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Ring Groups",
        route: "/auto-attendant/ring-group",
      },
      {
        id: 8,
        title: "Audio Conference Room",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View More",
        route: "/audio-conference",
      },
    ];

    return {
      currentLanguage,
      user,
      adminDashboardContent,
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
    const { adminDashboardContent } = this.props;

    return (
      <BaseLayout>
        <MainDashboard mainDashboardContent={adminDashboardContent} />
      </BaseLayout>
    );
  }
}
