import { Component } from 'react';

import API from '../../../../API/API';
import DidsDetailList from '../../../../components/details-screens/DidsDetailList';
import { BaseLayout } from '../../../../layouts/BaseLayout';
import { systemLog } from '../../../../scripts/General';

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
