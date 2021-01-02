import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";

import API from "../../../API/API";
import CallForwardSelective from "../../../components/tier2-screens/CallForwardSelective";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const userInfo = user;
    const api = new API(userInfo.token);
    const callForwardSelectiveDataResponse = await api.GET(
      "/Services/call-forward-selective"
    );
    let callForwardSelectiveData = {
      number: "",
      destination: "",
      forwardType: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };
    if (
      callForwardSelectiveDataResponse &&
      !callForwardSelectiveDataResponse.error &&
      callForwardSelectiveDataResponse.response
    ) {
      callForwardSelectiveData = {
        enabled: callForwardSelectiveDataResponse.response.enabled,
        number: callForwardSelectiveDataResponse.response.number,
        destination: callForwardSelectiveDataResponse.response.destination,
        forwardType: callForwardSelectiveDataResponse.response.forwarD_TYPE,
        startDate: moment(callForwardSelectiveDataResponse.response.starT_DATE),
        endDate: moment(callForwardSelectiveDataResponse.response.enD_DATE),
        startTime: moment(
          "2020-11-10 " + callForwardSelectiveDataResponse.response.starT_TIME
        ),
        endTime: moment(
          "2020-11-10 " + callForwardSelectiveDataResponse.response.enD_TIME
        ),
        monday: callForwardSelectiveDataResponse.response.monday,
        tuesday: callForwardSelectiveDataResponse.response.tuesday,
        wednesday: callForwardSelectiveDataResponse.response.wednesday,
        thursday: callForwardSelectiveDataResponse.response.thursday,
        friday: callForwardSelectiveDataResponse.response.friday,
        saturday: callForwardSelectiveDataResponse.response.saturday,
        sunday: callForwardSelectiveDataResponse.response.sunday,
        priority: callForwardSelectiveDataResponse.response.priority,
        password: callForwardSelectiveDataResponse.response.password,
        dnis: callForwardSelectiveDataResponse.response.dnis,
        callForwardSelectiveId:
          callForwardSelectiveDataResponse.response.calL_FORWARD_SELECTIVE_ID,
      };
    }
    // console.log('ca',callForwardSelectiveData)
    return {
      callForwardSelectiveData,
      userInfo,
      callForwardSelectiveDataResponse:
        callForwardSelectiveDataResponse.response,
    };
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  render() {
    const {
      callForwardSelectiveData,
      callForwardSelectiveDataResponse,
    } = this.props;

    return (
      <BaseLayout>
        <CallForwardSelective
          callForwardSelectiveDataResponse={callForwardSelectiveDataResponse}
          callForwardSelectiveData={callForwardSelectiveData}
        />
      </BaseLayout>
    );
  }
}
