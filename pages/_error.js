import { Button, Result } from 'antd';
import React from 'react';

import { removeAppUser } from '../scripts/General';

function Error({ statusCode }) {
  return (
    <div className='error-page'>
      <div className='error-page-card'>
        <div className='error-page-card-top'>
          <div
            className='error-page-card-top-circle'
            style={{ backgroundColor: '#FF6059', border: '1px solid #DD4F4B' }}
          />
          <div
            className='error-page-card-top-circle'
            style={{ backgroundColor: '#FFBF2E', border: '1px solid #E19D1A' }}
          />
          <div
            className='error-page-card-top-circle'
            style={{ backgroundColor: '#29CD43', border: '1px solid #26A92D' }}
          />
        </div>
        <Result
          status={statusCode}
          title={statusCode}
          subTitle='It is possible that the session has expired, try logging in again'
          extra={
            <Button
              onClick={() => {
                removeAppUser();
                window.location.href = '/';
              }}
              type='primary'
            >
              Return
            </Button>
          }
        />
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
