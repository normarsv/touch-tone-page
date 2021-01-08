import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';

import API from '../../../API/API';
import CallForwardSelective from '../../../components/tier2-screens/CallForwardSelective';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const userInfo = user;
    const api = new API(userInfo.token);
    const callForwardSelectiveDataResponse = await api.GET(
      '/Services/call-forward-selective'
    );
    let callForwardSelectiveData = {
      number: '',
      destination: '',
      forwardType: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
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
      const startDate =
        callForwardSelectiveDataResponse.response.starT_DATE !== null
          ? moment(callForwardSelectiveDataResponse.response.starT_DATE)
          : moment();
      const endDate =
        callForwardSelectiveDataResponse.response.enD_DATE !== null
          ? moment(callForwardSelectiveDataResponse.response.enD_DATE)
          : moment();

      const startTime =
        callForwardSelectiveDataResponse.response.starT_TIME !== null
          ? moment(
              startDate.format('YYYY-MM-DD') +
                ' ' +
                callForwardSelectiveDataResponse.response.starT_TIME
            )
          : moment();
      const endTime =
        callForwardSelectiveDataResponse.response.enD_TIME !== null
          ? moment(
              endDate.format('YYYY-MM-DD') +
                ' ' +
                callForwardSelectiveDataResponse.response.enD_TIME
            )
          : moment();
      callForwardSelectiveData = {
        enabled: callForwardSelectiveDataResponse.response.enabled,
        number: callForwardSelectiveDataResponse.response.number,
        destination: callForwardSelectiveDataResponse.response.destination,
        forwardType: callForwardSelectiveDataResponse.response.forwarD_TYPE,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
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
