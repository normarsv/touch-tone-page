import Router from 'next/router';
import { Component } from 'react';

import API from '../../API/API';
import ListAllOrganizations from '../../components/tier1-screens/ListAllOrganizations';
import { BaseLayout } from '../../layouts/BaseLayout';
import { systemLog } from '../../scripts/General';

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

    const api = new API(user.token);

    const resOrganizations = await api.GET('/Tools/organizationsT/');

    let organizationsTableList = [];

    for (let i = 0; i < resOrganizations.response.length; i++) {
      const currentElement = resOrganizations.response[i];
      organizationsTableList.push({
        key: currentElement.id,
        name: currentElement.organzationName,
        billingId: currentElement.billingId,
        orgDist: currentElement.distributor,
        didsCount: currentElement.dids,
        users: currentElement.users,
        // actions: currentElement.id,
        status: currentElement.status,
      });
    }

    return {
      user,
      resOrganizations,
      organizationsTableList,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = '';
    this.state = {
      organizationsTableList: props.organizationsTableList,
    };
    this.refreshOrg = this.refreshOrg.bind(this);
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  async refreshOrg() {
    const api = new API(this.props.user.token);

    const resOrganizations = await api.GET('/Tools/organizationsT/');

    let organizationsTableList = [];

    for (let i = 0; i < resOrganizations.response.length; i++) {
      const currentElement = resOrganizations.response[i];
      organizationsTableList.push({
        key: currentElement.id,
        name: currentElement.organzationName,
        billingId: currentElement.billingId,
        orgDist: currentElement.distributor,
        didsCount: currentElement.dids,
        users: currentElement.users,
        // actions: currentElement.id,
        status: currentElement.status,
      });
    }
    this.setState({ organizationsTableList: organizationsTableList });
  }
  render() {
    const { user } = this.props;
    return (
      <BaseLayout>
        <ListAllOrganizations
          userInfo={user}
          organizationsTableList={this.state.organizationsTableList}
          refreshOrg={this.refreshOrg}
        />
      </BaseLayout>
    );
  }
}
