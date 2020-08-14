import moment from "moment/min/moment-with-locales.js";
import React, { Component } from "react";
import { systemLog } from "../scripts/General";
import { baseLanguage } from "../scripts/MainInfoData";
import { Button } from "antd";
import BaseLayout from "../layouts/BaseLayout";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);
    return {
      currentLanguage,
    };
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    return (
      <BaseLayout>
        <div style={{ height: "100rem", backgroundColor: "#FCFCFC" }}>
          <label>test</label>
          <h1>Title test</h1>
          <Button>test button</Button>
        </div>
      </BaseLayout>
    );
  }
}
