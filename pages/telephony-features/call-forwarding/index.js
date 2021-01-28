import { Component } from 'react';

import API from '../../../API/API';
import CallForward from '../../../components/tier2-screens/CallForward';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ query, user }) {
    const userInfo = user;
    const api = new API(userInfo.token, userInfo.userId);
    const callForwardDataResponse = await api.GET('/Services/call-forward');
    let callForwardData = {
      enabled: false,
      number: '',
      terminationId: '',
      voiceMailBoxActive: false,
      callForwardAllActive: false,
      callForwardBusyActive: false,
      callForwardFailureActive: false,
      callForwardNoAnswerActive: false,
      callForwardAll: {
        currentValue: '',
        options: [],
      },
      callForwardBusy: {
        currentValue: '',
        options: [],
      },
      callForwardFailure: {
        currentValue: '',
        options: [],
      },
      callForwardNoAnswer: {
        currentValue: '',
        options: [],
      },
    };
    if (
      callForwardDataResponse &&
      !callForwardDataResponse.error &&
      callForwardDataResponse.response
    ) {
      callForwardData = callForwardDataResponse.response;
    }
    // console.log('ca',callForwardData)
    return {
      callForwardData,
      userInfo,
      callForwardDataResponse,
    };
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  render() {
    const { callForwardData, userInfo } = this.props;

    return (
      <BaseLayout>
        <CallForward callForwardData={callForwardData} userInfo={userInfo} />
      </BaseLayout>
    );
  }
}
callForwardFailureActive: false;
// destination: "FIND:012111467330"
// enabled: true
// number: "012111467330"
// terminationId: 10180
// voiceMailBoxActive: false
