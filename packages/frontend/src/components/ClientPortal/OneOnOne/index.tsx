import React, { FC, useEffect, useState, useContext } from 'react';
import { Typography, Grid, Tabs, Tab } from '@material-ui/core';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { useAbility } from '@casl/react';
import palette from '../../../theme/palette';
import Main from './Main';
import Photos from './Photos';
import Videos from './Videos';
import { AbilityContext } from '../../../context/AbilityContext';
import ClientList from '../ClientList';
import { User } from '../../../types/User';
import { SessionContext } from '../../../context/SessionContext';
import Journal from './Journal';

export const OneOnOne: FC = () => {
  const { pathname } = useLocation();
  const { url, path } = useRouteMatch();
  const ability = useAbility(AbilityContext);
  const canReadPosts = ability.can('read', 'All');
  const [selectedOneOnOneUser, setSelectedOneOnOneUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    groups: [],
    role: '',
    dogName: '',
  });
  const {
    state: { user },
  } = useContext(SessionContext);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('resize'));
  }, [pathname]);

  useEffect(() => {
    if (!ability.can('update', 'All') && user) {
      setSelectedOneOnOneUser(user);
    }
  }, [ability, user]);

  return (
    <Grid container>
      {ability.can('update', 'All') && (
        <ClientList isOneOnOne setSelectedOneOnOneUser={setSelectedOneOnOneUser} />
      )}
      <Grid item container xs={12} md={ability.can('update', 'All') ? 9 : 12}>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            padding: '5px 5px 5px 10px',
            color: palette.text.contrast,
            pointerEvents: canReadPosts ? 'auto' : 'none',
            height: '50px',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            One on One {ability.can('update', 'All') ? `with ${selectedOneOnOneUser.name}` : ''}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            width: '100%',
            padding: '0 50px',
            margin: '30px 0',
          }}
        >
          <Tabs value={pathname}>
            <Tab label="Main" value={`${url}/main`} to={`${url}/main`} component={Link} />
            <Tab label="Journal" value={`${url}/journal`} to={`${url}/journal`} component={Link} />
            <Tab label="Photos" value={`${url}/photos`} to={`${url}/photos`} component={Link} />
            <Tab label="Videos" value={`${url}/videos`} to={`${url}/videos`} component={Link} />
          </Tabs>
        </Grid>
        {selectedOneOnOneUser.id && (
          <Grid
            item
            xs={12}
            style={{
              padding: '0 50px',
            }}
          >
            <Switch>
              <Route path={`${path}/main`}>
                <Main oneOnOneId={selectedOneOnOneUser.id} />
              </Route>
              <Route path={`${path}/journal`}>
                <Journal oneOnOneId={selectedOneOnOneUser.id} />
              </Route>
              <Route path={`${path}/photos`}>
                <Photos oneOnOneId={selectedOneOnOneUser.id} />
              </Route>
              <Route path={`${path}/videos`}>
                <Videos oneOnOneId={selectedOneOnOneUser.id} />
              </Route>
            </Switch>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default OneOnOne;
