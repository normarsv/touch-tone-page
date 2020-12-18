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
      '/Services/call-forward'
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
      //callForwardSelectiveData = callForwardSelectiveDataResponse.response;
    }
    // console.log('ca',callForwardSelectiveData)
    return {
      callForwardSelectiveData,
      userInfo,
      callForwardSelectiveDataResponse,
    };
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  render() {
    const { callForwardSelectiveData, userInfo } = this.props;

    return (
      <BaseLayout>
        <CallForwardSelective
          callForwardSelectiveData={callForwardSelectiveData}
        />
      </BaseLayout>
    );
  }
}
