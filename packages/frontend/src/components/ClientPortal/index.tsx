import React, { FC, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import palette from '../../theme/palette';
import Discussion from './Discussion';

export const ClientPortal: FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('discussion');
  const { path } = useRouteMatch();

  return (
    <Grid container>
      <Grid
        item
        container
        style={{
          marginTop: '30px',
          padding: '50px 50px 0 50px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Link to={`${path}/discussion/main`} style={{ textDecoration: 'none' }}>
          <Button
            onClick={() => setSelectedGroup('discussion')}
            variant={selectedGroup === 'discussion' ? 'contained' : 'outlined'}
            style={
              selectedGroup === 'discussion'
                ? {
                    backgroundColor: palette.button.primary,
                    color: palette.white,
                  }
                : {
                    borderColor: palette.button.primary,
                    color: palette.button.primary,
                  }
            }
          >
            Discussion
          </Button>
        </Link>
        <Link to={`${path}/oneOnOne/main`} style={{ textDecoration: 'none' }}>
          <Button
            onClick={() => setSelectedGroup('oneOnOne')}
            variant={selectedGroup === 'oneOnOne' ? 'contained' : 'outlined'}
            style={
              selectedGroup === 'oneOnOne'
                ? {
                    backgroundColor: palette.button.primary,
                    color: palette.white,
                    margin: '0 20px',
                  }
                : {
                    borderColor: palette.button.primary,
                    color: palette.button.primary,
                    margin: '0 20px',
                  }
            }
          >
            One-on-One
          </Button>
        </Link>
        <Link to={`${path}/advancedGroup/main`} style={{ textDecoration: 'none' }}>
          <Button
            onClick={() => setSelectedGroup('advancedGroup')}
            variant={selectedGroup === 'advancedGroup' ? 'contained' : 'outlined'}
            style={
              selectedGroup === 'advancedGroup'
                ? {
                    backgroundColor: palette.button.primary,
                    color: palette.white,
                    margin: '0 20px 0 0',
                  }
                : {
                    borderColor: palette.button.primary,
                    color: palette.button.primary,
                    margin: '0 20px 0 0',
                  }
            }
          >
            Advanced Group
          </Button>
        </Link>
        <Link to={`${path}/biteClub/main`} style={{ textDecoration: 'none' }}>
          <Button
            onClick={() => setSelectedGroup('biteClub')}
            variant={selectedGroup === 'biteClub' ? 'contained' : 'outlined'}
            style={
              selectedGroup === 'biteClub'
                ? {
                    backgroundColor: palette.button.primary,
                    color: palette.white,
                  }
                : {
                    borderColor: palette.button.primary,
                    color: palette.button.primary,
                  }
            }
          >
            Bite Club
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        container
        style={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Switch>
          <Route path={`${path}/discussion`} component={Discussion} />
          <Route path={`${path}/oneOnOne`} />
          <Route path={`${path}/advancedGroup`} />
          <Route path={`${path}/biteClub`} />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default ClientPortal;
