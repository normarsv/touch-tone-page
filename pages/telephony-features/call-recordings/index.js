import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";
import CallRecordingsOA from "../../../components/tier2-screens/CallRecordingsOA";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const callRecordingsTableData = [
      {
        key: "1",
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
        userName: "Peter Lock",
        email: "Inbound Call",
        totalTalkTime: "00:02:10",
      },
      {
        key: "2",
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
        userName: "Anna Frias",
        email: "Inbound Call",
        totalTalkTime: "00:02:10",
      },
      {
        key: "3",
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
        userName: "Samuel Harlock",
        email: "Inbound Call",
        totalTalkTime: "00:02:10",
      },
      {
        key: "4",
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
        userName: "Sebastian Bones",
        email: "Inbound Call",
        totalTalkTime: "00:02:10",
      },
    ];

    return {
      currentLanguage,
      // columns,
      callRecordingsTableData,
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
    const { callRecordingsTableData } = this.props;

    return (
      <BaseLayout>
        <CallRecordingsOA callRecordingsTableData={callRecordingsTableData} />
      </BaseLayout>
    );
  }
}
