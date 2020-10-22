import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";
import OrganizationServices from "../../../components/details-screens/OrganizationServices";
import { BaseLayout } from "../../../layouts/BaseLayout";
import API from "../../../API/API";

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
      editable: true,
      title: "Edit Organization",
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
        <OrganizationServices
          organizationInfo={organizationInfo}
          servicesContent={servicesContent}
          editServiceContent={editServiceContent}
        />
      </BaseLayout>
    );
  }
}
