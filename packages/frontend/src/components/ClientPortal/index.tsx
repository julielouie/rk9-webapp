import React, { FC, useState, useContext } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useAbility } from '@casl/react';
import palette from '../../theme/palette';
import Discussion from './Discussion';
import RK9Icon from '../../assets/images/RK9 Icon.png';
import { AbilityContext } from '../../context/AbilityContext';
import { SessionContext } from '../../context/SessionContext';

export const ClientPortal: FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('discussion');
  const { path } = useRouteMatch();
  const ability = useAbility(AbilityContext);
  const canReadPosts = ability.can('read', 'Posts');
  const {
    state: { user },
  } = useContext(SessionContext);

  return (
    <Grid container style={{ position: 'relative' }}>
      {!user && (
        <Grid
          style={{
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            paddingTop: '300px',
            paddingLeft: '100px',
            height: '100%',
            width: '100%',
            position: 'absolute',
            background: `linear-gradient(rgba(255, 255, 255, 0.8), ${palette.disabled})`,
            zIndex: 9,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <img src={RK9Icon} alt="Rogue K9 Logo" style={{ height: '100%', width: '30%' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h1">Oops...</Typography>
              <Typography variant="h3">You must be logged in</Typography>
              <Typography variant="h3">to view these pages!</Typography>
              <Typography variant="h5" style={{ marginTop: '20px' }}>
                Please login, and refresh the page to try again.
              </Typography>
            </div>
          </div>
        </Grid>
      )}
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
        <Link
          to={`${path}/discussion/main`}
          style={{ textDecoration: 'none', pointerEvents: canReadPosts ? 'auto' : 'none' }}
        >
          <Button
            onClick={() => setSelectedGroup('discussion')}
            variant={selectedGroup === 'discussion' ? 'contained' : 'outlined'}
            style={
              selectedGroup === 'discussion'
                ? {
                    backgroundColor: canReadPosts ? palette.button.primary : palette.disabled,
                    color: palette.white,
                  }
                : {
                    borderColor: canReadPosts ? palette.button.primary : palette.disabled,
                    color: canReadPosts ? palette.button.primary : palette.disabled,
                  }
            }
            disabled={!canReadPosts}
          >
            Discussion
          </Button>
        </Link>
        <Link
          to={`${path}/oneOnOne/main`}
          style={{ textDecoration: 'none', pointerEvents: canReadPosts ? 'auto' : 'none' }}
        >
          <Button
            onClick={() => setSelectedGroup('oneOnOne')}
            variant={selectedGroup === 'oneOnOne' ? 'contained' : 'outlined'}
            style={
              selectedGroup === 'oneOnOne'
                ? {
                    backgroundColor: canReadPosts ? palette.button.primary : palette.disabled,
                    color: palette.white,
                    margin: '0 20px',
                  }
                : {
                    borderColor: canReadPosts ? palette.button.primary : palette.disabled,
                    color: canReadPosts ? palette.button.primary : palette.disabled,
                    margin: '0 20px',
                  }
            }
            disabled={!canReadPosts}
          >
            One-on-One
          </Button>
        </Link>
        <Link
          to={`${path}/advancedGroup/main`}
          style={{ textDecoration: 'none', pointerEvents: canReadPosts ? 'auto' : 'none' }}
        >
          <Button
            onClick={() => setSelectedGroup('advancedGroup')}
            variant={selectedGroup === 'advancedGroup' ? 'contained' : 'outlined'}
            style={
              selectedGroup === 'advancedGroup'
                ? {
                    backgroundColor: canReadPosts ? palette.button.primary : palette.disabled,
                    color: palette.white,
                    margin: '0 20px 0 0',
                  }
                : {
                    borderColor: canReadPosts ? palette.button.primary : palette.disabled,
                    color: canReadPosts ? palette.button.primary : palette.disabled,
                    margin: '0 20px 0 0',
                  }
            }
            disabled={!canReadPosts}
          >
            Advanced Group
          </Button>
        </Link>
        <Link
          to={`${path}/biteClub/main`}
          style={{ textDecoration: 'none', pointerEvents: canReadPosts ? 'auto' : 'none' }}
        >
          <Button
            onClick={() => setSelectedGroup('biteClub')}
            variant={selectedGroup === 'biteClub' ? 'contained' : 'outlined'}
            style={
              selectedGroup === 'biteClub'
                ? {
                    backgroundColor: canReadPosts ? palette.button.primary : palette.disabled,
                    color: palette.white,
                  }
                : {
                    borderColor: canReadPosts ? palette.button.primary : palette.disabled,
                    color: canReadPosts ? palette.button.primary : palette.disabled,
                  }
            }
            disabled={!canReadPosts}
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
