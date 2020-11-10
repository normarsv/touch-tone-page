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

    const endUserDashboardContent = [
      {
        id: 1,
        title: "Voice Mail",
        count: "9 New Voice Mails",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View all Users",
        route: "/voice-mail",
      },
      {
        id: 2,
        title: "My Find Me",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View My Find Me",
        route: "/telephony-features/my-findme",
      },
      {
        id: 3,
        title: "Meeting",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Auto attendant",
        route: "/meetings",
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
      {
        id: 5,
        title: "Conference Room",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Mettings",
        route: "/conference-room",
      },
      {
        id: 6,
        title: "Account Details",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Ring Groups",
        route: "/account-details",
      },
    ];

    return {
      currentLanguage,
      user,
      endUserDashboardContent,
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
    const { endUserDashboardContent } = this.props;

    return (
      <BaseLayout>
        <MainDashboard mainDashboardContent={endUserDashboardContent} />
      </BaseLayout>
    );
  }
}
