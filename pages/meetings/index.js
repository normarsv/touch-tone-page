import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import ManageUsers from "../../components/tier2-screens/ManageUsers";
import Meetings from "../../components/tier2-screens/Meetings";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const meetingsContent = [
      {
        id: 1,
        name: "Peter Lock",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: moment().format("LT"),
        actions: ["peter"],
      },
      {
        id: 2,
        name: "Anna Frías",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: moment().format("LT"),
        actions: ["anna"],
      },
      {
        id: 3,
        name: "Samuel Harlock",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: moment().format("LT"),
        actions: ["samuel"],
      },
      {
        id: 4,
        name: "Sebastian Bones",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: moment().format("LT"),
        actions: ["sebastian"],
      },
      {
        id: 5,
        name: "Orlando Tyler",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: moment().format("LT"),
        actions: ["orlando"],
      },
      {
        id: 6,
        name: "Brad Bloom",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: moment().format("LT"),
        actions: ["brad"],
      },
      {
        id: 7,
        name: "Linda King",
        date: moment().format("L"),
        startTime: moment().format("LT"),
        endTime: moment().format("LT"),
        actions: ["linda"],
      },
      {
        id: 8,
        name: "Thomas Hank",
        date: <FontAwesomeIcon icon={faCalendar} /> + moment().format("L"),
        startTime: moment().format("LT"),
        endTime: moment().format("LT"),
        actions: ["thomas"],
      },
    ];

    return {
      currentLanguage,
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
