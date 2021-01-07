import { Component } from 'react';

import API from '../../../API/API';
import UserServices from '../../../components/edit-screens/UserServices';
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

    const api = new API();

    // const resUser = await api.GET("/Users/orgId?orgId=" + query.idOrg);
    const resUser = await api.GET('/Users/' + query.idOrg);

    const userInfo = resUser.response.authUser;

    const servicesContent = {
      editable: true,
      title: 'Edit User',
    };

    let editServiceContent = new Array(24).fill({
      id: 1,
      title: 'Access to the User list view',
      status: true,
    });

    return {
      user,
      editServiceContent,
      servicesContent,
      userInfo,
      resUser,
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
    const { userInfo } = this.props;
    return (
      <BaseLayout>
        <UserServices
          userInfo={userInfo}
          servicesContent={this.props.servicesContent}
          editServiceContent={this.props.editServiceContent}
        />
      </BaseLayout>
    );
  }
}
