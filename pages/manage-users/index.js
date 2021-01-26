import Router from 'next/router';
import { Component } from 'react';

import API from '../../API/API';
import ManageUsers from '../../components/tier2-screens/ManageUsers';
import { BaseLayout } from '../../layouts/BaseLayout';
import { systemLog } from '../../scripts/General';

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

    const resManageUsers = await api.GET('/Users/orgId/' + user.organizationId);

    const finalManageUsersList = [];

    for (const currentUser of resManageUsers.response) {
      finalManageUsersList.push({
        key: currentUser.authUser.id,
        name:
          currentUser.authUser.firstName + ' ' + currentUser.authUser.lastName,
        email: currentUser.authUser.email,
        did: currentUser.authUser.did,
        actions: currentUser.authUser.id,
        active: currentUser.authUser.isActive,
      });
    }

    const manageUsersContent = [
      {
        id: 1,
        name: 'Peter Lock',
        email: 'PeterLock@gmail.com',
        status: '33278779099',
        actions: 'peter',
        active: true,
      },
      {
        id: 2,
        name: 'Anna Frías',
        email: 'Annafrias@gmail.com',
        status: '33278779099',
        actions: 'anna',
        active: false,
      },
      {
        id: 3,
        name: 'Samuel Harlock',
        email: 'samuelharlock@gmail.com',
        status: '33278779099',
        actions: 'Samuel',
        active: true,
      },
      {
        id: 4,
        name: 'Sebastian Bones',
        email: 'sebastianbones@gmail.com',
        status: '33278779099',
        actions: 'Sebastian',
        active: true,
      },
      {
        id: 5,
        name: 'Orlando Tyler',
        email: 'orlandotyler@gmail.com',
        status: '33278779099',
        actions: 'Orlando',
        active: true,
      },
      {
        id: 6,
        name: 'Brad Bloom',
        email: 'bradbloom@gmail.com',
        status: '33278779099',
        actions: 'Brad',
        active: false,
      },
      {
        id: 7,
        name: 'Linda King',
        email: 'lindaking@gmail.com',
        status: '33278779099',
        actions: 'Linda',
        route: true,
      },
      {
        id: 8,
        name: 'Thomas Hank',
        email: 'thomashank@gmail.com',
        status: '33278779099',
        actions: 'Thomas',
        active: false,
      },
    ];

    return {
      user,
      manageUsersContent,
      resManageUsers,
      finalManageUsersList,
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
    const { finalManageUsersList } = this.props;

    return (
      <BaseLayout>
        <ManageUsers manageUsersContent={finalManageUsersList} />
      </BaseLayout>
    );
  }
}
