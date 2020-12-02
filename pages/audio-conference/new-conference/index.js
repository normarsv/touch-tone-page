import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import NewConferenceRoom from "../../../components/tier2-screens/conference-room/NewConferenceRoom";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const autoAttendantTableContent = [
      {
        id: 1,
        name: "Welcome GS",
        description: "Organization Welcome Message",
        did: "33278779099",
        actions: "welcomeGS",
      },
      {
        id: 2,
        name: "Tech Support",
        description: "Tech Support",
        did: "33278779099",
        actions: "tech-support",
      },
      {
        id: 3,
        name: "Auto attendant",
        description: "Auto attendant",
        did: "33278779099",
        actions: "auto-attendant",
      },
      {
        id: 4,
        name: "Welcome GS",
        description: "Organization Welcome Message",
        did: "33278779099",
        actions: "welcomeGS",
      },
      {
        id: 5,
        name: "Tech Support",
        description: "Tech Support",
        did: "33278779099",
        actions: "tech-support",
      },
      {
        id: 6,
        name: "Auto attendant",
        description: "Auto attendant",
        did: "33278779099",
        actions: "auto-attendant",
      },
    ];

    return {
      currentLanguage,
      user,
      autoAttendantTableContent,
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
    const { autoAttendantTableContent } = this.props;

    return (
      <BaseLayout>
        <NewConferenceRoom />
      </BaseLayout>
    );
  }
}
