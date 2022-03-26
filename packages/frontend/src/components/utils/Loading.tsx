import React from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { Grid } from '@material-ui/core';
import loadingAnimation from '../../assets/lottie/loading-animation.json';

const Loading: React.FunctionComponent = () => {
  const lottieSpinnerRef = React.useRef<LottieRefCurrentProps>(null);

  if (lottieSpinnerRef.current) {
    lottieSpinnerRef.current.setSpeed(1);
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Lottie lottieRef={lottieSpinnerRef} animationData={loadingAnimation} />
    </Grid>
  );
};

export default Loading;
