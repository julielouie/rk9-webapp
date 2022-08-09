import React, { useContext, useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { IconButton, Grid, Toolbar, Box } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSnackbar } from 'notistack';
import { useAbility } from '@casl/react';
import { mutate } from 'swr';
import palette from '../../../theme/palette';
import RK9Logo from '../../../assets/images/RK9 Logo.png';
import { SessionContext } from '../../../context/SessionContext';
import { AbilityContext } from '../../../context/AbilityContext';
import Rk9Api from '../../../dataServices/Rk9Api';
import { GET } from '../../../constants/requests';
import { LOGOUT } from '../../../constants/actions';
import updateAbility from '../../../ability/updateAbility';
import { Role } from '../../../types/Role';
import { LEVEL_ERROR, LogError } from '../../../dataServices/Logger';
import Login from './Login';

const AppHeader: React.FC = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(SessionContext);
  const [openLogin, setOpenLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);
  const history = useHistory();

  useEffect(() => {
    setLoggedIn(!!user);
  }, [user]);

  const resetLoginInputs = () => {
    setOpenLogin(false);
    setEmail('');
    setPassword('');
  };

  const logout = async () => {
    await Rk9Api(GET, '/users/log-out')
      .then(async () => {
        await mutate(null, true);
        dispatch({ type: LOGOUT });
        updateAbility(ability, Role.Guest);
        enqueueSnackbar('Logged out successfully!', {
          persist: false,
          variant: 'success',
        });
        setLoggedIn(false);
        resetLoginInputs();
      })
      .catch((error: any) => {
        LogError(LEVEL_ERROR, error, 'User Logout');
        enqueueSnackbar('There was a problem logging out. Please let someone know!', {
          persist: true,
          variant: 'error',
        });
      });
  };

  return (
    <>
      <Route
        render={() => (
          <Toolbar style={{ padding: 0, background: palette.paper.primary, height: '366px' }}>
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
                    <IconButton onClick={() => setOpenLogin(true)}>
                      <small style={{ color: palette.text.primary }}>Login</small>
                    </IconButton>
                  ) : (
                    <IconButton onClick={logout}>
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
                  <Box
                    style={{ cursor: 'pointer' }}
                    onClick={() => history.push('/clientPortal/discussion/main')}
                  >
                    Client Portal
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        )}
      />
      <Login
        open={openLogin}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        setLoggedIn={setLoggedIn}
        resetLoginInputs={resetLoginInputs}
      />
    </>
  );
};

export default AppHeader;
