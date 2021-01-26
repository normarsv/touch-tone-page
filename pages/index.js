import { Component } from 'react';
import Router from 'next/router';

import { ForgotPassword } from '../components/authentication/ForgotPassword';
import { LoginForm } from '../components/authentication/LoginForm';
import { BaseLayout } from '../layouts/BaseLayout';
import { systemLog } from '../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (user.group !== undefined) {
      switch (user.group) {
        case 'BusinessSupport':
        case 'SuperAdmin':
          if (res) {
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();
            return {};
          } else {
            Router.push('/list-organizations');
            return {};
          }
        case 'CorporateService':
        case 'OrganizationAdmin':
          if (res) {
            res.writeHead(302, {
              Location: '/admin-dashboard',
            });
            res.end();
            return {};
          } else {
            Router.push('/admin-dashboard');
            return {};
          }
        case 'EndUser':
          if (res) {
            res.writeHead(302, {
              Location: '/user-dashboard',
            });
            res.end();
            return {};
          } else {
            Router.push('/user-dashboard');
            return {};
          }
        default:
          break;
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
