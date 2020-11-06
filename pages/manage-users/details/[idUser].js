import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import API from "../../../API/API";
import OrganizationUserDetails from "../../../components/tier2-screens/OrganizationUserDetails";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const resUser = await api.GET("/Users/" + query.idUser);

    const telephonyFeatures = new Array(24).fill({
      id: 1,
      title: "Access to the User list view",
      status: true,
    });

    return {
      currentLanguage,
      user,
      telephonyFeatures,
      resUser,
      query,
    };
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  render() {
    const { telephonyFeatures, resUser } = this.props;

    return (
      <BaseLayout>
        <OrganizationUserDetails
          telephonyFeatures={telephonyFeatures}
          userInfo={resUser.response.authUser}
        />
      </BaseLayout>
    );
  }
}
