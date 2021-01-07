import { Component } from 'react';

import BulkImport from '../../../components/user/BulkImport';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case 'CorporateService':
          case 'OrganizationAdmin':
            res.writeHead(302, {
              Location: '/admin-dashboard',
            });
            res.end();

            break;

          case 'EndUser':
            res.writeHead(302, {
              Location: '/user-dashboard',
            });
            res.end();

            break;

          default:
            break;
        }
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
        <BulkImport />
      </BaseLayout>
    );
  }
}
