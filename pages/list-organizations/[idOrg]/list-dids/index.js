import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import API from "../../../../API/API";
import DidsDetailList from "../../../../components/details-screens/DidsDetailList";
import { BaseLayout } from "../../../../layouts/BaseLayout";
import { systemLog } from "../../../../scripts/General";
import { baseLanguage } from "../../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const resDidList = await api.GET(
      "/Tools/organization-number/" + query.idOrg
    );

    const finalDidList = [];

    for (const currentElement of resDidList.response) {
      finalDidList.push({
        key: currentElement.numberId,
        nameOrg: currentElement.organizationName,
        phoneNumber: currentElement.number,
        type: "",
      });
    }

    return {
      currentLanguage,
      user,
      query,
      finalDidList,
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
    const { finalDidList } = this.props;
    return (
      <BaseLayout>
        <DidsDetailList didTableList={finalDidList} />
      </BaseLayout>
    );
  }
}
