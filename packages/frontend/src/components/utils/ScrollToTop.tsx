import { FC, useEffect } from 'react';

const ScrollToTop: FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return null;
};

export default ScrollToTop;
