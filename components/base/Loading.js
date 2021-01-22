import nProgress from 'nprogress';
import { useEffect, useState } from 'react';

const LoadingPage = (props, ref) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (props.loading === true) {
      nProgress.configure({
        speed: 60,
        trickleSpeed: 100,
      });
      nProgress.start();
      nProgress.inc();
      setLoading(true);
    } else {
      setTimeout(() => {
        nProgress.done(true);
        setLoading(false);
      }, 500);
    }
  }, [props.loading]);
  return (
    <div>{loading === true && <div className={'page-loading'}></div>}</div>
  );
};

export default LoadingPage;
