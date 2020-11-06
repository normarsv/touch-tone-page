import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";
import BulkImport from "../../../components/user/BulkImport";
import { BaseLayout } from "../../../layouts/BaseLayout";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      switch (user.group) {
        case "OrganizationAdmin":
          res.writeHead(302, {
            Location: "/admin-dashboard",
          });
          res.end();

          break;
        case "EndUser":
          res.writeHead(302, {
            Location: "/user-dashboard",
          });
          res.end();

          break;
        default:
          break;
      }
    }

    return {
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
    const { user } = this.props;
    return (
      <BaseLayout>
        <BulkImport />
      </BaseLayout>
    );
  }
}
