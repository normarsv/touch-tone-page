import Router from 'next/router';
import { Component } from 'react';

import API from '../../../../API/API';
import DidsDetailList from '../../../../components/details-screens/DidsDetailList';
import { BaseLayout } from '../../../../layouts/BaseLayout';
import { systemLog } from '../../../../scripts/General';

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
    const api = new API(user.token, user.userId);

    const resDidList = await api.GET(
      '/Tools/organization-number/' + query.idOrg
    );

    const finalDidList = [];

    for (const currentElement of resDidList.response) {
      finalDidList.push({
        key: currentElement.numberId,
        nameOrg: currentElement.organizationName,
        phoneNumber: currentElement.number,
        type: '',
      });
    }

    return {
      user,
      query,
      finalDidList,
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
    const { finalDidList } = this.props;
    return (
      <BaseLayout>
        <DidsDetailList didTableList={finalDidList} />
      </BaseLayout>
    );
  }
}
