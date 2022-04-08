import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';
import palette from '../../theme/palette';
import RK9Icon from '../../assets/images/RK9 Icon.png';

const NotFound: FC = () => {
  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid container spacing={4}>
        <Grid item md={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img
            src={RK9Icon}
            alt="Rogue K9 Icon"
            style={{ height: '100px', width: '100px', marginRight: '20px' }}
          />
          <Typography variant="h1">Not Found</Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h4">
            The page you&apos;re trying to reach, doesn&apos;t exist!
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Button
            variant="contained"
            onClick={() => history.push('/home')}
            style={{ backgroundColor: palette.button.primary, color: palette.text.contrast }}
          >
            Home
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default NotFound;
