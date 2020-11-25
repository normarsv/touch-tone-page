import moment from "moment/min/moment-with-locales.js";
import Router from "next/router";
import { Component } from "react";

import { ForgotPassword } from "../components/authentication/ForgotPassword";
import { LoginForm } from "../components/authentication/LoginForm";
import { BaseLayout } from "../layouts/BaseLayout";
import { systemLog } from "../scripts/General";
import { baseLanguage } from "../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (!user.group) {
        res.writeHead(302, {
          Location: "/",
        });
        res.end();
      }
    }
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

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
        <ForgotPassword
          showForgotPassword={() =>
            this.setState({
              showForgotPassword: !this.state.showForgotPassword,
            })
          }
        />
      </BaseLayout>
    );
  }
}
