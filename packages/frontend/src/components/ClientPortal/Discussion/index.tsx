import React, { FC } from 'react';
import { Typography, Grid, Tabs, Tab } from '@material-ui/core';
import useSWR from 'swr';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import palette from '../../../theme/palette';
import Main from './Main';
import { Group } from '../../../types/Group';
import Photos from './Photos';

export const Discussion: FC = () => {
  const { pathname } = useLocation();
  const { url, path } = useRouteMatch();

  const { data: groupInfo } = useSWR<Group>('/groups/Discussion', { suspense: true });

  return (
    <Grid container>
      <Grid
        item
        container
        style={{
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          padding: '20px',
          color: palette.text.contrast,
        }}
      >
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Discussion Board
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
        <Tabs
          value={pathname}
          TabIndicatorProps={{ style: { background: palette.selected.primary } }}
        >
          <Tab label="Main" value={`${url}/main`} to={`${url}/main`} component={Link} />
          <Tab label="Photos" value={`${url}/photos`} to={`${url}/photos`} component={Link} />
          <Tab label="Videos" value={`${url}/videos`} to={`${url}/videos`} component={Link} />
        </Tabs>
      </Grid>
      {groupInfo && (
        <Grid
          item
          xs={12}
          style={{
            padding: '0 50px',
          }}
        >
          <Switch>
            <Route path={`${path}/main`}>
              <Main groupInfo={groupInfo} />
            </Route>
            <Route path={`${path}/photos`}>
              <Photos groupInfo={groupInfo} />
            </Route>
            <Route path={`${path}/videos`} />
          </Switch>
        </Grid>
      )}
    </Grid>
  );
};

export default Discussion;
