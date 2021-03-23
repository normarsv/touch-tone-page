import { Component } from 'react';
import { ExternalResetPassword } from '../../components/authentication/ExternalResetPassword';
import { BaseLayout } from '../../layouts/BaseLayout';
import { systemLog } from '../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    return {
      query
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
   
    const { query} = this.props;

    return (
      <BaseLayout>
        <ExternalResetPassword query={query}/>
      </BaseLayout>
    );
  }
}
