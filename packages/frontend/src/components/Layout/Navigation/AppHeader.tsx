import React, { useContext, useEffect, useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { IconButton, Grid, Toolbar, Box, makeStyles } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useSnackbar } from 'notistack';
import { useAbility } from '@casl/react';
import { mutate as mutateLogOut } from 'swr';
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
import LoginOrSignUp from './LoginOrSignUp';
import { useCurrentUser } from '../../../hooks/useCurrentUser';

const useStyles = makeStyles({
  userDialWrapper: {
    position: 'relative',
  },
  userDial: {
    position: 'absolute',
    top: '-25px',
    left: '-65px',
    '& .MuiSpeedDial-fab': {
      height: '48px',
      width: '48px',
      backgroundColor: palette.button.primary,
    },
  },
});

const AppHeader: React.FC = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(SessionContext);
  const [openLogin, setOpenLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [openUserDial, setOpenUserDial] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);
  const history = useHistory();
  const { mutate } = useCurrentUser();
  const classes = useStyles();

  useEffect(() => {
    setLoggedIn(!!user);
  }, [user]);

  const logout = async () => {
    await Rk9Api(GET, '/users/log-out')
      .then(async () => {
        await mutateLogOut(null, true);
        dispatch({ type: LOGOUT });
        updateAbility(ability, Role.Guest);
        mutate();
        enqueueSnackbar('Logged out successfully!', {
          persist: false,
          variant: 'success',
        });
        setLoggedIn(false);
      })
      .catch((error: any) => {
        LogError(LEVEL_ERROR, error, 'User Logout');
        enqueueSnackbar('There was a problem logging out. Please let someone know!', {
          persist: true,
          variant: 'error',
        });
      });
  };

  const userDialActions = [
    { icon: <SettingsIcon />, name: 'Settings' },
    { icon: <ExitToAppIcon />, name: 'Logout' },
  ];

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
                xs={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '30px',
                }}
              >
                {loggedIn && (
                  <Link
                    to={{ pathname: 'https://www.facebook.com/groups/1067124983484762/' }}
                    target="_blank"
                  >
                    <IconButton>
                      <FacebookIcon style={{ color: palette.text.primary }} />
                    </IconButton>
                  </Link>
                )}
                <Link
                  to={{
                    pathname: loggedIn
                      ? 'https://www.instagram.com/roguek9academygrouppage/'
                      : 'https://www.instagram.com/roguek9academy/',
                  }}
                  target="_blank"
                >
                  <IconButton style={{ marginRight: loggedIn ? '75px' : '' }}>
                    <InstagramIcon style={{ color: palette.text.primary }} />
                  </IconButton>
                </Link>
                {!loggedIn ? (
                  <IconButton onClick={() => setOpenLogin(true)}>
                    <small style={{ color: palette.text.primary }}>Login</small>
                  </IconButton>
                ) : (
                  <div className={classes.userDialWrapper}>
                    <SpeedDial
                      className={classes.userDial}
                      ariaLabel="User Account Details"
                      icon={<AccountCircleIcon />}
                      onClose={() => setOpenUserDial(false)}
                      onOpen={() => setOpenUserDial(true)}
                      open={openUserDial}
                      direction="down"
                    >
                      {userDialActions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          onClick={async () => {
                            if (action.name === 'Logout') await logout();
                            if (action.name === 'Settings') history.push('/settings');
                            setOpenUserDial(false);
                          }}
                        />
                      ))}
                    </SpeedDial>
                  </div>
                )}
              </Grid>
              <Grid item>
                <Box onClick={() => history.push('/home')}>
                  <img
                    id="header_rk9_logo"
                    src={RK9Logo}
                    alt="Rogue K9 Logo"
                    style={{ height: '248px', width: '600px', cursor: 'pointer' }}
                  />
                </Box>
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
      <LoginOrSignUp open={openLogin} close={() => setOpenLogin(false)} setLoggedIn={setLoggedIn} />
    </>
  );
};

export default AppHeader;
