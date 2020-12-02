import "../styles/app.less";

import App from "next/app";
import nookies from "nookies";

import { UserContext } from "../components/authentication/UserContext";
import { nameSession } from "../scripts/MainInfoData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let user = {}; //{ name: "Daniel Zamarripa", role: "super-admin" };

    const cookies = nookies.get(ctx);
    const userCookie = cookies[nameSession + "_data"];
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

  render() {
    const { Component, pageProps, user } = this.props;
    return (
      <UserContext.Provider value={{ userInfo: user }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}

export default MyApp;
