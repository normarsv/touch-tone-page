import { Component } from 'react';

import { ForgotPassword } from '../components/authentication/ForgotPassword';
import { LoginForm } from '../components/authentication/LoginForm';
import { BaseLayout } from '../layouts/BaseLayout';
import { systemLog } from '../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (user.group !== undefined) {
      if (res) {
        switch (user.group) {
          case 'BusinessSupport':
          case 'SuperAdmin':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            break;

          case 'OrganizationAdmin':
            res.writeHead(302, {
              Location: '/admin-dashboard',
            });
            break;

          case 'EndUser':
            res.writeHead(302, {
              Location: '/user-dashboard',
            });
            break;

          default:
            break;
        }

        res.end();
      } else {
        // Router.push("/");
      }
    }

    return {
      user,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = '';
    this.state = { showForgotPassword: false };
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    const { user } = this.props;
    return (
      <BaseLayout>
        {this.state.showForgotPassword ? (
          <ForgotPassword
            showForgotPassword={() =>
              this.setState({
                showForgotPassword: !this.state.showForgotPassword,
              })
            }
          />
        ) : (
          <LoginForm
            showForgotPassword={() =>
              this.setState({
                showForgotPassword: !this.state.showForgotPassword,
              })
            }
          />
        )}
      </BaseLayout>
    );
  }
}
