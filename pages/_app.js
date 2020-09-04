import "../styles/app.less";

import App from "next/app";
import nookies from "nookies";

import API from "../API/API";
import { nameSession } from "../scripts/MainInfoData";
import { UserContext } from "../components/authentication/UserContext";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let user = { name: "undefined" };

    const cookies = nookies.get(ctx);
    const userCookie = cookies[nameSession + "_data"];
    if (userCookie !== undefined) {
      // const userParse = JSON.parse(userCookie)
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
