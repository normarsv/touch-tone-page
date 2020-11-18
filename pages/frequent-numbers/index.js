import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import CallRecords from "../../components/tier3-screens/CallRecords";
import FrequentNumber from "../../components/tier3-screens/FrequentNumber";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    const frequentNumbersTableData = [
      {
        key: "1",
        alias: "Peter Lock",
        number: "33278779099",
      },
      {
        key: "2",
        alias: "Anna Frias",
        number: "33278779099",
      },
      {
        key: "3",
        alias: "Samuel Harlock",
        number: "33278779099",
      },
      {
        key: "4",
        alias: "Sebastian Bones",
        number: "33278779099",
      },
    ];

    return {
      frequentNumbersTableData,
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
    const { frequentNumbersTableData } = this.props;

    return (
      <BaseLayout>
        <FrequentNumber frequentNumbersTableData={frequentNumbersTableData} />
      </BaseLayout>
    );
  }
}
