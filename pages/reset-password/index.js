import { Component } from 'react';

import { ResetPassword } from '../../components/authentication/ResetPassword';
import { BaseLayout } from '../../layouts/BaseLayout';
import { systemLog } from '../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
      } else {
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
      }
    }

    return {
      user,
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
    const { user } = this.props;
    return (
      <BaseLayout>
        <ResetPassword user={user} />
      </BaseLayout>
    );
  }
}
