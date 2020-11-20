import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";
import AudioConference from "../../components/tier2-screens/conference-room/AudioConference";

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

    const audioConferenceContent = [
      {
        id: 1,
        date: [
          {
            id: 1,
            date: moment().format("L"),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format("LT"),
            icon: faClock,
          },
        ],
        desc: "Organization Welcome Message",
        accessCode: "123123456456",
        actions: ["01"],
        enable: true,
      },
      {
        id: 2,
        date: [
          {
            id: 1,
            date: moment().format("L"),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format("LT"),
            icon: faClock,
          },
        ],
        desc: "Charge in tech support",
        accessCode: "123123456456",
        actions: ["02"],
        enable: true,
      },
      {
        id: 3,
        date: [
          {
            id: 1,
            date: moment().format("L"),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format("LT"),
            icon: faClock,
          },
        ],
        desc: "Organization Welcome Message 2",
        accessCode: "123123456456",
        actions: ["03"],
        enable: false,
      },
      {
        id: 4,
        date: [
          {
            id: 1,
            date: moment().format("L"),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format("LT"),
            icon: faClock,
          },
        ],
        desc: "Organization Welcome Message 3",
        accessCode: "123123456456",
        actions: ["04"],
        enable: true,
      },
      {
        id: 5,
        date: [
          {
            id: 1,
            date: moment().format("L"),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format("LT"),
            icon: faClock,
          },
        ],
        desc: "Organization Welcome Message 4",
        accessCode: "123123456456",
        actions: ["05"],
        enable: false,
      },
      {
        id: 6,
        date: [
          {
            id: 1,
            date: moment().format("L"),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format("LT"),
            icon: faClock,
          },
        ],
        desc: "Organization Welcome Message 5",
        accessCode: "123123456456",
        actions: ["06"],
        enable: false,
      },
      {
        id: 7,
        date: [
          {
            id: 1,
            date: moment().format("L"),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format("LT"),
            icon: faClock,
          },
        ],
        desc: "Organization Welcome Message 6",
        accessCode: "123123456456",
        actions: ["07"],
        enable: false,
      },
      {
        id: 8,
        date: [
          {
            id: 1,
            date: moment().format("L"),
            icon: faCalendarAlt,
          },
          {
            id: 2,
            date: moment().format("LT"),
            icon: faClock,
          },
        ],
        desc: "Organization Welcome Message 7",
        accessCode: "123123456456",
        actions: ["08"],
        enable: true,
      },
    ];

    return {
      user,
      audioConferenceContent,
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
    const { audioConferenceContent } = this.props;

    return (
      <BaseLayout>
        <AudioConference audioConferenceContent={audioConferenceContent} />
      </BaseLayout>
    );
  }
}
