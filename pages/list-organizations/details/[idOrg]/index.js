import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import API from "../../../../API/API";
import OrganizationDetails from "../../../../components/details-screens/OrganizationServices";
import { BaseLayout } from "../../../../layouts/BaseLayout";
import { systemLog } from "../../../../scripts/General";
import { baseLanguage } from "../../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const resOrganization = await api.GET(
      "/Tools/organizatiosT/" + query.idOrg
    );

    const organizationInfo = resOrganization.response;

    const servicesContent = {
      editable: false,
      title: "Organization Details",
    };

    let editServiceContent = new Array(24).fill({
      id: 1,
      title: "Access to the User list view",
      status: true,
    });
    return {
      currentLanguage,
      user,
      editServiceContent,
      servicesContent,
      query,
      resOrganization,
      organizationInfo,
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
      organizationInfo,
      servicesContent,
      editServiceContent,
    } = this.props;
    return (
      <BaseLayout>
        <OrganizationDetails
          organizationInfo={organizationInfo}
          servicesContent={servicesContent}
          editServiceContent={editServiceContent}
        />
      </BaseLayout>
    );
  }
}
