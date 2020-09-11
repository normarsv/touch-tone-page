import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import UserServices from "../../../components/edit-screens/UserServices";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const servicesContent = {
      editable: true,
      title: "Edit User",
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
        <UserServices
          servicesContent={this.props.servicesContent}
          editServiceContent={this.props.editServiceContent}
        />
      </BaseLayout>
    );
  }
}
