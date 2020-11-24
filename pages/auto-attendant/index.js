import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import AutoAttendant from "../../components/tier2-screens/auto-attendant/Autoattendant";
import Queues from "../../components/tier2-screens/queues/Queues";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";

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

    const autoAttendantTableContent = [
      {
        id: 1,
        name: "Welcome GS",
        description: "Organization Welcome Message",
        did: "33278779099",
        actions: "welcomeGS",
      },
      {
        id: 2,
        name: "Tech Support",
        description: "Tech Support",
        did: "33278779099",
        actions: "tech-support",
      },
      {
        id: 3,
        name: "Auto attendant",
        description: "Auto attendant",
        did: "33278779099",
        actions: "auto-attendant",
      },
      {
        id: 4,
        name: "Welcome GS",
        description: "Organization Welcome Message",
        did: "33278779099",
        actions: "welcomeGS",
      },
      {
        id: 5,
        name: "Tech Support",
        description: "Tech Support",
        did: "33278779099",
        actions: "tech-support",
      },
      {
        id: 6,
        name: "Auto attendant",
        description: "Auto attendant",
        did: "33278779099",
        actions: "auto-attendant",
      },
    ];

    return {
      user,
      autoAttendantTableContent,
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
    const { autoAttendantTableContent } = this.props;

    return (
      <BaseLayout>
        <AutoAttendant autoAttendantTableContent={autoAttendantTableContent} />
      </BaseLayout>
    );
  }
}
