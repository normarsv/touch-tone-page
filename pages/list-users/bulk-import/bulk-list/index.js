import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import BulkImportList from "../../../../components/user/BulkImportList";
import API from "../../../../API/API";
import { BaseLayout } from "../../../../layouts/BaseLayout";
import { systemLog } from "../../../../scripts/General";
import { baseLanguage } from "../../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, res, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const bulkImportList = [
      {
        key: "1",
        name: "Peter Lock",
        email: "PeterLock@gmail.com",
        org: "Walmart México",
        role: "End user",
      },
      {
        key: "2",
        name: "Anna Frias",
        email: "AnnaFrias@gmail.com",
        org: "Walmart",
        role: "End user",
      },
      {
        key: "3",
        name: "Samuel Harlock",
        email: "SamuelHarlock@gmail.com",
        org: "Walmart T1",
        role: "End user",
      },
      {
        key: "4",
        name: "Sebastian Bones",
        email: "SebastianBones@gmail.com",
        org: "Walmart",
        role: "End user",
      },
    ];

    // const resOrganizations = await api.GET("/organizations/");

    return {
      currentLanguage,
      bulkImportList,
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
    const { bulkImportList } = this.props;
    // console.log(user);
    return (
      <BaseLayout>
        <BulkImportList bulkUserList={bulkImportList} />
      </BaseLayout>
    );
  }
}
