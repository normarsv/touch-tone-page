import { faClock } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import Meetings from "../../components/tier2-screens/Meetings";
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

    const meetingsContent = [
      {
        id: 1,
        name: "Peter Lock",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: [{ id: 1, endTime: moment().format("LT"), icon: faClock }],
        actions: ["peter"],
      },
      {
        id: 2,
        name: "Anna Frías",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: [{ id: 1, endTime: moment().format("LT"), icon: faClock }],
        actions: ["anna"],
      },
      {
        id: 3,
        name: "Samuel Harlock",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: [{ id: 1, endTime: moment().format("LT"), icon: faClock }],
        actions: ["samuel"],
      },
      {
        id: 4,
        name: "Sebastian Bones",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: [{ id: 1, endTime: moment().format("LT"), icon: faClock }],
        actions: ["sebastian"],
      },
      {
        id: 5,
        name: "Orlando Tyler",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: [{ id: 1, endTime: moment().format("LT"), icon: faClock }],
        actions: ["orlando"],
      },
      {
        id: 6,
        name: "Brad Bloom",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: [{ id: 1, endTime: moment().format("LT"), icon: faClock }],
        actions: ["brad"],
      },
      {
        id: 7,
        name: "Linda King",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: [{ id: 1, endTime: moment().format("LT"), icon: faClock }],
        actions: ["linda"],
      },
      {
        id: 8,
        name: "Thomas Hank",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: [{ id: 1, endTime: moment().format("LT"), icon: faClock }],
        actions: ["thomas"],
      },
    ];

    return {
      user,
      meetingsContent,
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
    const { meetingsContent } = this.props;

    return (
      <BaseLayout>
        <Meetings meetingsContent={meetingsContent} />
      </BaseLayout>
    );
  }
}
