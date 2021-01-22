import '../styles/app.less';

import App from 'next/app';
import nookies from 'nookies';
import Router from 'next/router';

import { UserContext } from '../components/authentication/UserContext';
import { nameSession } from '../scripts/MainInfoData';
import LoadingPage from '../components/base/Loading';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let user = {}; //{ name: "Daniel Zamarripa", role: "super-admin" };

    const cookies = nookies.get(ctx);
    const userCookie = cookies[nameSession + '_data'];
    if (userCookie !== undefined) {
      const userParse = JSON.parse(userCookie);
      user = userParse;
      user.role = user.group;
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...ctx,
        user,
      });
    }
    return { pageProps, user };
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleRouteComplete = this.handleRouteComplete.bind(this);
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.handleRouteChange);
    Router.events.on('routeChangeError', this.handleRouteComplete);
    Router.events.on('routeChangeComplete', this.handleRouteComplete);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeError', this.handleRouteChange);
    Router.events.off('routeChangeError', this.handleRouteComplete);
    Router.events.off('routeChangeComplete', this.handleRouteComplete);
  }

  handleRouteChange() {
    this.setState({ loading: true });
  }

  handleRouteComplete() {
    this.setState({ loading: false });
  }

  render() {
    const { Component, pageProps, user } = this.props;
    return (
      <div>
        <LoadingPage loading={this.state.loading} />
        <UserContext.Provider value={{ userInfo: user }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </div>
    );
  }
}

export default MyApp;
