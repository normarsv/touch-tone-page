import Router from 'next/router';
import { Component } from 'react';

import API from '../../../API/API';
import OrganizationUserDetails from '../../../components/tier2-screens/OrganizationUserDetails';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (user.group) {
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
        case 'Distributor':
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
          break;
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

    const resUser = await api.GET('/Users/' + query.idUser);

    const telephonyFeatures = new Array(24).fill({
      id: 1,
      title: 'Access to the User list view',
      status: true,
    });

    return {
      user,
      telephonyFeatures,
      resUser,
      query,
    };
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  render() {
    const { telephonyFeatures, resUser } = this.props;

    return (
      <BaseLayout>
        <OrganizationUserDetails
          telephonyFeatures={telephonyFeatures}
          userInfo={resUser.response.authUser}
        />
      </BaseLayout>
    );
  }
}
