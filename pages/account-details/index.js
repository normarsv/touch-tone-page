import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";
import UserDetails from "../../components/details-screens/UserDetails";
import { BaseLayout } from "../../layouts/BaseLayout";
import API from "../../API/API";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    const api = new API();

    const resUser = await api.GET("/Users/" + user.userId);

    const finalQuery = query;

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
      user,
      editServiceContent,
      servicesContent,
      telephonyFeatures,
      finalQuery,
      userInfo,
      resUser,
    };
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    const {
      servicesContent,
      editServiceContent,
      userInfo,
      finalQuery,
    } = this.props;

    console.log(userInfo);

    return (
      <BaseLayout>
        <UserDetails
          query={finalQuery}
          userInfo={userInfo}
          servicesContent={servicesContent}
          editServiceContent={editServiceContent}
        />
      </BaseLayout>
    );
  }
}