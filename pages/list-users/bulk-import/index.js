import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";
import BulkImport from "../../../components/user/BulkImport";
import { BaseLayout } from "../../../layouts/BaseLayout";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    return {
      currentLanguage,
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
    const { user } = this.props;
    return (
      <BaseLayout>
        <BulkImport />
      </BaseLayout>
    );
  }
}
