import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Button, Grid, Toolbar } from '@material-ui/core';
import palette from '../../../theme/palette';

const AppHeader: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Route
      render={() => (
        <Toolbar
          style={{ paddingTop: '30px', paddingBottom: '30px', background: palette.paper.primary }}
        >
          <Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <Grid item>
              {!loggedIn ? (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: palette.button.secondary,
                    color: palette.text.contrast,
                    marginLeft: '50px',
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={() => setLoggedIn(false)}
                  variant="contained"
                  style={{
                    backgroundColor: palette.button.secondary,
                    color: palette.text.contrast,
                    marginLeft: '50px',
                  }}
                >
                  Log Out
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      )}
    />
  );
};

export default AppHeader;
