import { Component } from "react";
import MainDashboard from "../../components/base/MainDashboard";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case "SuperAdmin":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          case "BusinessSuport":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          case "Distributor":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          case "OrganizationAdmin":
            res.writeHead(302, {
              Location: "/admin-dashboard",
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

    const endUserDashboardContent = [
      {
        id: 1,
        title: "Voice Mail",
        count: "9 New Voice Mails",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View all Voice Mails",
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
        buttonTitle: "View All Meetings",
        route: "/meetings",
      },
      {
        id: 4,
        title: "Call Records",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Call Records",
        route: "/call-records",
      },
      {
        id: 5,
        title: "Conference Room",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View All Conference Room",
        route: "/audio-conference",
      },
      {
        id: 6,
        title: "Account Details",
        count: "",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        buttonTitle: "View Account Details",
        route: "/account-details",
      },
    ];

    return {
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
