import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { IconButton, Grid, Toolbar } from '@material-ui/core';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import palette from '../../../theme/palette';

const AppHeader: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const actions = [
    { icon: <SettingsIcon />, name: 'User Settings' },
    { icon: <LogoutIcon onClick={() => setLoggedIn(false)} />, name: 'Logout' },
  ];

  return (
    <Route
      render={() => (
        <Toolbar style={{ padding: 0, background: palette.paper.primary }}>
          <Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <Grid item>
              <IconButton>
                <FacebookIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </Grid>
            <Grid item>
              {!loggedIn ? (
                <IconButton onClick={() => setLoggedIn(true)}>
                  <small>Login</small>
                </IconButton>
              ) : (
                <SpeedDial
                  ariaLabel="User SpeedDial"
                  icon={<AccountCircleIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />}
                  direction="down"
                  sx={{ height: '40px', width: '40px', margin: '4px 15px 0 10px' }}
                  FabProps={{
                    size: 'small',
                    sx: {
                      bgcolor: palette.paper.primary,
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
                    },
                  }}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      )}
    />
  );
};

export default AppHeader;
