import { Component } from 'react';

import API from '../../API/API';
import UserDetails from '../../components/details-screens/UserDetails';
import { BaseLayout } from '../../layouts/BaseLayout';
import { systemLog } from '../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (user.group === undefined) {
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

    const resUser = await api.GET('/Users/' + user.userId);

    const finalQuery = query;

    const userInfo = resUser.response.authUser;
    userInfo.did = resUser.response.did;
    userInfo.userTypeId = resUser.response.userTypeId;


    const servicesContent = {
      editable: false,
      title: 'User Details',
    };

    const enabledServices = resUser.response.products;

    // const telephonyFeatures = new Array(24).fill({
    //   id: 1,
    //   title: 'Access to the User list view',
    //   status: true, 
    // });

    const resUserTypes = await api.GET('/UserTypes');

    return {
      user,
      enabledServices,
      servicesContent,
      //telephonyFeatures,
      finalQuery,
      userInfo,
      resUser,
      resUserTypes,
    };
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    const {
      servicesContent,
      enabledServices,
      userInfo,
      finalQuery,
      user,
    } = this.props;

    return (
      <BaseLayout>
        <UserDetails
          query={finalQuery}
          user={user}
          userInfo={userInfo}
          servicesContent={servicesContent}
          enabledServices={enabledServices}
        />
      </BaseLayout>
    );
  }
}
