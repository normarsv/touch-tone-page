import { Component } from 'react';

import API from '../../../API/API';
import OrganizationUserDetails from '../../../components/tier2-screens/OrganizationUserDetails';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case 'SuperAdmin':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();

            break;
          case 'BusinessSuport':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();

            break;
          case 'Distributor':
            res.writeHead(302, {
              Location: '/list-organizations',
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
