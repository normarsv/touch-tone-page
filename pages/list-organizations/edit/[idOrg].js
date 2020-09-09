import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";
import EditOrganizations from "../../../components/edit-screens/EditOrganizations";
import { BaseLayout } from "../../../layouts/BaseLayout";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    let serviceContent = new Array(24).fill({
      id: 1,
      title: "Access to the User list view",
      status: true,
    });

    return {
      currentLanguage,
      user,
      serviceContent,
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
        <EditOrganizations editServiceContent={this.props.serviceContent} />
      </BaseLayout>
    );
  }
}
