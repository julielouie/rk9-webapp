import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { IconButton, Grid, Toolbar, Box } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import palette from '../../../theme/palette';
import RK9Logo from '../../../assets/images/RK9 Logo.png';

const AppHeader: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  return (
    <Route
      render={() => (
        <Toolbar style={{ padding: 0, background: palette.paper.primary, height: '300px' }}>
          <Grid
            container
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Grid
              item
              container
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                paddingTop: '30px',
              }}
            >
              <Grid item>
                <IconButton>
                  <FacebookIcon style={{ color: palette.text.primary }} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <InstagramIcon style={{ color: palette.text.primary }} />
                </IconButton>
              </Grid>
              <Grid item>
                {!loggedIn ? (
                  <IconButton onClick={() => setLoggedIn(true)}>
                    <small style={{ color: palette.text.primary }}>Login</small>
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setLoggedIn(false)}>
                    <AccountCircleIcon style={{ color: palette.text.primary }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Grid item container xs={8} sm={5}>
              <Grid item>
                <Box onClick={() => history.push('/home')}>
                  <img
                    src={RK9Logo}
                    alt="Rogue K9 Logo"
                    style={{ height: '100%', width: '100%', cursor: 'pointer' }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              container
              style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
            >
              <Grid item xs={12} sm={2} style={{ padding: '0 50px', fontWeight: 'bold' }}>
                <Box style={{ cursor: 'pointer' }} onClick={() => history.push('/about')}>
                  About
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} style={{ padding: '0 50px', fontWeight: 'bold' }}>
                <Box style={{ cursor: 'pointer' }} onClick={() => history.push('/philosophy')}>
                  Philosophy
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} style={{ padding: '0 50px', fontWeight: 'bold' }}>
                <Box style={{ cursor: 'pointer' }} onClick={() => history.push('/training')}>
                  Training
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} style={{ padding: '0 50px', fontWeight: 'bold' }}>
                <Box style={{ cursor: 'pointer' }} onClick={() => history.push('/testimonials')}>
                  Testimonials
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} style={{ padding: '0 50px', fontWeight: 'bold' }}>
                <Box style={{ cursor: 'pointer' }} onClick={() => history.push('/blog')}>
                  Blog
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} style={{ padding: '0 50px', fontWeight: 'bold' }}>
                <Box style={{ cursor: 'pointer' }} onClick={() => history.push('/clientPortal')}>
                  Client Portal
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      )}
    />
  );
};

export default AppHeader;
