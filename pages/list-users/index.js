import Router from 'next/router';
import { Component } from 'react';

import API from '../../API/API';
import ListAllUsers from '../../components/tier1-screens/ListAllUsers';
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
    const api = new API();

    const resUserList = await api.GET('/Users/');
    let resQueryUserList;

    let finalUserList = [];
    for (let i = 0; i < resUserList.response.length; i++) {
      const currentUser = resUserList.response[i];

      finalUserList.push({
        key: currentUser.authUser.id,
        userName: currentUser.authUser.username,
        name:
          currentUser.authUser.firstName + ' ' + currentUser.authUser.lastName,
        email: currentUser.authUser.email,
        did: currentUser.did,
        status: currentUser.authUser.isActive,
        actions: currentUser.authUser.id,
      });
    }

    if (query.orgId !== undefined) {
      finalUserList = [];
      resQueryUserList = await api.GET('/Users/orgId/' + query.orgId);
      for (let i = 0; i < resQueryUserList.response.length; i++) {
        const currentUser = resQueryUserList.response[i];
        const currentOrg = resQueryUserList.response[i].organization;

        finalUserList.push({
          key: currentUser.authUser.id,
          userName: currentUser.authUser.username,
          name:
            currentUser.authUser.firstName +
            ' ' +
            currentUser.authUser.lastName,
          email: currentUser.authUser.email,
          did: currentUser.did,
          status: currentUser.authUser.isActive,
          actions: currentUser.authUser.id,
          organization: currentOrg.prefixName,
        });
      }
    }

    const finalQuery = query;

    return {
      user,
      resUserList,
      finalUserList,
      resQueryUserList,
      finalQuery,
      api,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = '';
    this.state = { reloadInfo: false, currentProps: props };
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  async handleReloadInfo() {
    const { finalQuery } = this.props;

    const api = new API();

    const resUserList = await api.GET('/Users/');
    let resQueryUserList;

    let finalUserList = [];
    for (let i = 0; i < resUserList.response.length; i++) {
      const currentUser = resUserList.response[i];

      finalUserList.push({
        key: currentUser.authUser.id,
        userName: currentUser.authUser.username,
        name:
          currentUser.authUser.firstName + ' ' + currentUser.authUser.lastName,
        email: currentUser.authUser.email,
        did: currentUser.did,
        status: currentUser.authUser.isActive,
        actions: currentUser.authUser.id,
      });
    }

    if (finalQuery.orgId !== undefined) {
      finalUserList = [];
      resQueryUserList = await api.GET('/Users/orgId/' + finalQuery.orgId);
      for (let i = 0; i < resQueryUserList.response.length; i++) {
        const currentUser = resQueryUserList.response[i];
        const currentOrg = resQueryUserList.response[i].organization;

        finalUserList.push({
          key: currentUser.authUser.id,
          userName: currentUser.authUser.username,
          name:
            currentUser.authUser.firstName +
            ' ' +
            currentUser.authUser.lastName,
          email: currentUser.authUser.email,
          did: currentUser.did,
          status: currentUser.authUser.isActive,
          actions: currentUser.authUser.id,
          organization: currentOrg.prefixName,
        });
      }
    }

    this.setState({ currentProps: { finalUserList: finalUserList } });
  }

  render() {
    const { finalUserList, finalQuery, user } = this.props;
    const { reloadInfo, currentProps } = this.state;

    return (
      <BaseLayout>
        <ListAllUsers
          reloadInfo={() => this.handleReloadInfo()}
          userInfo={user}
          query={finalQuery}
          // orgToDisplay={orgToDisplay}
          userTableList={currentProps.finalUserList}
        />
      </BaseLayout>
    );
  }
}
