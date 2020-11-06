import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import HistoryLog from "../../../../components/details-screens/HistoryLog";
import { BaseLayout } from "../../../../layouts/BaseLayout";
import { systemLog } from "../../../../scripts/General";
import { baseLanguage } from "../../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    let data = new Array(10).fill({
      key: "1",
      user: "Gregory Sanders",
      previous: "Walmart",
      current: "Walmart México",
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
    });

    const historyLogDataTable = [
      {
        key: 1,
        user: "Gregory Sanders",
        previous: "Walmart",
        current: "Walmart México",
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
      },
      {
        key: 2,
        user: "Gregory Sanders 2",
        previous: "Walmart",
        current: "Walmart México",
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
      },
      {
        key: 3,
        user: "Guao",
        previous: "Walmart",
        current: "Walmart México",
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
      },
    ];

    return {
      currentLanguage,
      user,
      data,
      historyLogDataTable,
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
    const { historyLogDataTable } = this.props;
    return (
      <BaseLayout>
        <HistoryLog historyLogDataTable={historyLogDataTable} />
      </BaseLayout>
    );
  }
}
