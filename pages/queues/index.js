import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import Queues from "../../components/tier2-screens/queues/Queues";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const queueTableContent = [
      {
        id: 1,
        name: "Tech Support Queue",
        description: "Tech Support Queue",
        actions: "tech-support-queue",
        enable: true,
      },
      {
        id: 2,
        name: "Tech Support Queue",
        description: "Tech Support Queue",
        actions: "tech-support-queue",
        enable: false,
      },
      {
        id: 3,
        name: "Tech Support Queue",
        description: "Tech Support Queue",
        actions: "tech-support-queue",
        enable: true,
      },
      {
        id: 4,
        name: "Tech Support Queue",
        description: "Tech Support Queue",
        actions: "tech-support-queue",
        enable: true,
      },
      {
        id: 5,
        name: "Tech Support Queue",
        description: "Tech Support Queue",
        actions: "tech-support-queue",
        enable: true,
      },
      {
        id: 6,
        name: "Tech Support Queue",
        description: "Tech Support Queue",
        actions: "tech-support-queue",
        enable: false,
      },
      {
        id: 7,
        name: "Tech Support Queue",
        description: "Tech Support Queue",
        actions: "tech-support-queue",
        enable: true,
      },
      {
        id: 8,
        name: "Tech Support Queue",
        description: "Tech Support Queue",
        actions: "tech-support-queue",
        enable: false,
      },
    ];

    return {
      currentLanguage,
      user,
      queueTableContent,
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
    const { queueTableContent } = this.props;

    return (
      <BaseLayout>
        <Queues queueTableContent={queueTableContent} />
      </BaseLayout>
    );
  }
}
