import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import DidsDetailList from "../../../../components/details-screens/DidsDetailList";
import { BaseLayout } from "../../../../layouts/BaseLayout";
import { systemLog } from "../../../../scripts/General";
import { baseLanguage } from "../../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    let data = new Array(10).fill({
      key: "1",
      nameOrg: "Marketing",
      phoneNumber: "236 876 998",
      type: "Auto attendand",
    });
    return {
      currentLanguage,
      user,
      data,
      query,
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
        <DidsDetailList data={this.props.data} />
      </BaseLayout>
    );
  }
}
