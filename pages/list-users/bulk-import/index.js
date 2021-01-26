import Router from 'next/router';
import { Component } from 'react';

import BulkImport from '../../../components/user/BulkImport';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (user.group) {
      switch (user.group) {
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
    } else {
      if (res) {
        res.writeHead(302, {
          Location: '/not-valid-token',
        });
        res.end();
        return {};
      } else {
        Router.push('/not-valid-token');
        return {};
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
        <BulkImport user={user} />
      </BaseLayout>
    );
  }
}
