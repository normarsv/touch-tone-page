import { withRouter } from 'next/dist/client/router';
import Router from 'next/router';
import { Component } from 'react';

import API from '../../../../API/API';
import UserDetails from '../../../../components/details-screens/UserDetails';
import { BaseLayout } from '../../../../layouts/BaseLayout';
import { systemLog } from '../../../../scripts/General';

class DetailUserPage extends Component {
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

    const resUser = await api.GET('/Users/' + query.idOrg);

    const userInfo = resUser.response.authUser;
    userInfo.did = resUser.response.did;
    userInfo.userTypeId = resUser.response.userTypeId;

    const servicesContent = {
      editable: false,
      title: 'User Details',
    };

    const editServiceContent = new Array(24).fill({
      id: 1,
      title: 'Access to the User list view',
      status: true,
    });

    const telephonyFeatures = new Array(24).fill({
      id: 1,
      title: 'Access to the User list view',
      status: true,
    });

    return {
      user,
      editServiceContent,
      servicesContent,
      telephonyFeatures,
      query,
      userInfo,
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
    const {
      servicesContent,
      editServiceContent,
      telephonyFeatures,
      userInfo,
      user,
      router,
    } = this.props;

    return (
      <BaseLayout>
        <UserDetails
          user={user}
          userInfo={userInfo}
          servicesContent={servicesContent}
          editServiceContent={editServiceContent}
          telephonyFeatures={telephonyFeatures}
          successfullyEdit={() => {
            router.push('/list-users');
          }}
        />
      </BaseLayout>
    );
  }
}

export default withRouter(DetailUserPage);
