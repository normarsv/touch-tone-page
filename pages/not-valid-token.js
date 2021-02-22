import Router from 'next/router';
import nookies from 'nookies';
import React from 'react';

import { nameSession } from '../scripts/MainInfoData';

function NotValidToken({ statusCode }) {
  return <div />;
}

NotValidToken.getInitialProps = (ctx) => {
  const { res } = ctx;
  nookies.destroy(ctx, nameSession + '_data');
  if (res) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return {};
  } else {
    Router.push('/');
    return {};
  }
};

export default NotValidToken;
