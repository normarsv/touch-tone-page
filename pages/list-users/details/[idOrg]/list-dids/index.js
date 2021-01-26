import moment from 'moment/min/moment-with-locales.js';
import Router from 'next/router';
import { Component } from 'react';

import DidsDetailList from '../../../../../components/details-screens/DidsDetailList';
import { BaseLayout } from '../../../../../layouts/BaseLayout';
import { systemLog } from '../../../../../scripts/General';
import { baseLanguage } from '../../../../../scripts/MainInfoData';

export default class extends Component {
  static async getInitialProps({ query, user, res }) {
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

    const currentLanguage =
      query.language !== undefined ? query.language : baseLanguage.key;
    moment.locale(currentLanguage);

    let data = new Array(10).fill({
      key: '1',
      name: 'Marketing',
      phoneNumber: '236 876 998',
      queue: 'Auto attendand',
    });
    return {
      currentLanguage,
      user,
      data,
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
    const { user } = this.props;
    return (
      <BaseLayout>
        <DidsDetailList data={this.props.data} />
      </BaseLayout>
    );
  }
}
