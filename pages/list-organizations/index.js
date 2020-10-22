import moment from "moment/min/moment-with-locales.js";
import { Component, useContext } from "react";
import API from "../../API/API";
import ListAllOrganizations from "../../components/tier1-screens/ListAllOrganizations";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";
import { baseLanguage } from "../../scripts/MainInfoData";

export default class extends Component {
  static async getInitialProps({ query, res, user }) {
    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    const api = new API();

    const resOrganizations = await api.GET("/Tools/organizatiosT/");

    let organizationsTableList = [];

    for (let i = 0; i < resOrganizations.response.length; i++) {
      const currentElement = resOrganizations.response[i];
      organizationsTableList.push({
        name: currentElement.name,
        billingId: currentElement.billingId,
        orgDist: "",
        didsCount: "",
        users: "",
        actions: currentElement.id,
        status: currentElement.status,
      });
    }

    const data = [
      {
        key: "1",
        name: "Walmart",
        billing: 32,
        orgDist: 8,
        didsCount: 8,
        users: 8,
      },
      {
        key: "2",
        name: "Costco",
        billing: 42,
        orgDist: 8,
        didsCount: 8,
        users: 8,
      },
      {
        key: "3",
        name: "Test 3",
        billing: 32,
        orgDist: 0,
        didsCount: 8,
        users: 8,
      },
      {
        key: "4",
        name: "Test 4",
        billing: 99,
        orgDist: 0,
        didsCount: 8,
        users: 34,
      },
    ];

    return {
      currentLanguage,
      // columns,
      data,
      user,
      resOrganizations,
      organizationsTableList,
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
    const { organizationsTableList } = this.props;
    // console.log(user);
    return (
      <BaseLayout>
        <ListAllOrganizations organizationsTableList={organizationsTableList} />
      </BaseLayout>
    );
  }
}
