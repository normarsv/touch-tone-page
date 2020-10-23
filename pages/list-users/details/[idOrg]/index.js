import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { systemLog } from "../../../../scripts/General";
import { baseLanguage } from "../../../../scripts/MainInfoData";
import UserDetails from "../../../../components/details-screens/UserDetails";
import { BaseLayout } from "../../../../layouts/BaseLayout";
import API from "../../../../API/API";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const resUser = await api.GET("/Users/" + query.idOrg);

    const userInfo = resUser.response.authUser;

    const servicesContent = {
      editable: false,
      title: "User Details",
    };

    const editServiceContent = new Array(24).fill({
      id: 1,
      title: "Access to the User list view",
      status: true,
    });

    const telephonyFeatures = new Array(24).fill({
      id: 1,
      title: "Access to the User list view",
      status: true,
    });

    return {
      currentLanguage,
      user,
      editServiceContent,
      servicesContent,
      telephonyFeatures,
      query,
      userInfo,
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
    const {
      user,
      servicesContent,
      editServiceContent,
      telephonyFeatures,
      userInfo,
    } = this.props;

    return (
      <BaseLayout>
        <UserDetails
          userInfo={userInfo}
          servicesContent={servicesContent}
          editServiceContent={editServiceContent}
          telephonyFeatures={telephonyFeatures}
        />
      </BaseLayout>
    );
  }
}
