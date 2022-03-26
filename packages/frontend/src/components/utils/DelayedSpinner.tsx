import React, { useEffect, useState } from 'react';
import Loading from './Loading';

interface DelayedSpinnerProps {
  delay: number;
}

const DelayedSpinner: React.FC<DelayedSpinnerProps> = ({ delay }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return show ? <Loading /> : null;
};

export default DelayedSpinner;
