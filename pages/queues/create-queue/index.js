import moment from 'moment/min/moment-with-locales.js';
import { Component } from 'react';

import QueuesDetails from '../../../components/tier2-screens/queues/QueuesDetails';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';
import { baseLanguage } from '../../../scripts/MainInfoData';

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
    this.userinfo = '';
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    const {} = this.props;

    return (
      <BaseLayout>
        <QueuesDetails />
      </BaseLayout>
    );
  }
}
