import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';
import palette from '../../theme/palette';

type NotFoundProps = RouteComponentProps;

const NotFound: React.FC<NotFoundProps> = (props) => {
  const { history } = props;

  const sendToHome = () => {
    history.push('/home');
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid container spacing={4}>
        <Grid item md={12}>
          <Typography variant="h1">404 Error</Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h4">
            The page you&apos;re trying to reach doesn&apos;t exist.
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Button
            variant="contained"
            onClick={sendToHome}
            style={{ backgroundColor: palette.button.primary, color: palette.text.contrast }}
          >
            Home
          </Button>
        </Grid>
        <Grid item md={12}>
          {/* RK9 Logo Here */}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(NotFound);
