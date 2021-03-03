import { Component } from 'react';
import { EmailConfirmation } from '../../components/authentication/EmailConfirmation';
import { BaseLayout } from '../../layouts/BaseLayout';
//import { systemLog } from '../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    return {
      query,
    };
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { query } = this.props;
    return (
      <BaseLayout>
        <EmailConfirmation query={query}/>
      </BaseLayout>
    );
  }
}
