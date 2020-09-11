import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import HistoryLog from "../../../../../components/details-screens/HistoryLog";
import { BaseLayout } from "../../../../../layouts/BaseLayout";
import { systemLog } from "../../../../../scripts/General";
import { baseLanguage } from "../../../../../scripts/MainInfoData";

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
    });
    return {
      currentLanguage,
      user,
      data,
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
    const { user } = this.props;
    return (
      <BaseLayout>
        <HistoryLog data={this.props.data} />
      </BaseLayout>
    );
  }
}
