import "../styles/app.less";

import App from "next/app";
import nookies from "nookies";
import React from "react";

import API from "../API/API";
import { nameSession } from "../scripts/MainInfoData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let user = {};
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
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
