import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { systemLog } from "../../../../scripts/General";
import { baseLanguage } from "../../../../scripts/MainInfoData";
import UserDetails from "../../../../components/details-screens/UserDetails";
import { BaseLayout } from "../../../../layouts/BaseLayout";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

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
    } = this.props;

    return (
      <BaseLayout>
        <UserDetails
          servicesContent={servicesContent}
          editServiceContent={editServiceContent}
          telephonyFeatures={telephonyFeatures}
        />
      </BaseLayout>
    );
  }
}