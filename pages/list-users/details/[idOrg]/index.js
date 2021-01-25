import { withRouter } from 'next/dist/client/router';
import { Component } from 'react';

import API from '../../../../API/API';
import UserDetails from '../../../../components/details-screens/UserDetails';
import { BaseLayout } from '../../../../layouts/BaseLayout';
import { systemLog } from '../../../../scripts/General';

class DetailUserPage extends Component {
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
