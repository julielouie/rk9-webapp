import React, { FC, useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link, Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { useAbility } from '@casl/react';
import palette from '../../theme/palette';
import Discussion from './Discussion';
import { AbilityContext } from '../../context/AbilityContext';
import RestrictedPage from './RestrictedPage';
import OneOnOne from './OneOnOne';
import ScrollToTop from '../utils/ScrollToTop';
import NotFound from '../Error/NotFound';
// import AdvancedGroup from './AdvancedGroup';
// import BiteClub from './BiteClub';
// import NoseyCrew from './NoseyCrew';

// Below is only necessary for group pages (currently removed)
// const RestrictedSinglePage = () => (
//   <Grid container style={{ height: '100vh', position: 'relative' }}>
//     <RestrictedPage
//       isAlternate
//       alternateTitle="You must be a group member"
//       alternateTitleLine2="to view this page!"
//       alternateBody="Please try again later."
//     />
//   </Grid>
// );

export const ClientPortal: FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const { path } = useRouteMatch();
  const ability = useAbility(AbilityContext);
  const canReadPosts = ability.can('read', 'All');
  const { pathname } = useLocation();
  // Below is only necessary for group pages (currently removed)
  // const {
  //   state: { user },
  // } = useContext(SessionContext);

  useEffect(() => {
    const currentTab = pathname.split('/')[2];
    switch (currentTab) {
      case 'discussion':
        setSelectedGroup('discussion');
        break;
      case 'oneOnOne':
        setSelectedGroup('oneOnOne');
        break;
      case 'advancedGroup':
        setSelectedGroup('advancedGroup');
        break;
      case 'biteClub':
        setSelectedGroup('biteClub');
        break;
      case 'noseyCrew':
        setSelectedGroup('noseyCrew');
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Grid container style={{ position: 'relative' }}>
        {!canReadPosts && <RestrictedPage />}
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
          {/* Below pages removed per Allie's request, but took a while to create, so keeping it just in case */}
          {/* <Link
            to={`${path}/advancedGroup/main`}
            style={{
              textDecoration: 'none',
              pointerEvents: canReadPosts ? 'auto' : 'none',
              cursor: user?.groups.find((group) => group.name === 'Advanced Group')
                ? 'auto'
                : 'not-allowed',
            }}
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
              disabled={
                !canReadPosts || !user?.groups.find((group) => group.name === 'Advanced Group')
              }
            >
              Advanced Group
            </Button>
          </Link>
          <Link
            to={`${path}/biteClub/main`}
            style={{
              textDecoration: 'none',
              pointerEvents: canReadPosts ? 'auto' : 'none',
              cursor: user?.groups.find((group) => group.name === 'Bite Club')
                ? 'auto'
                : 'not-allowed',
            }}
          >
            <Button
              onClick={() => setSelectedGroup('biteClub')}
              variant={selectedGroup === 'biteClub' ? 'contained' : 'outlined'}
              style={
                selectedGroup === 'biteClub'
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
              disabled={!canReadPosts || !user?.groups.find((group) => group.name === 'Bite Club')}
            >
              Bite Club
            </Button>
          </Link>
          <Link
            to={`${path}/noseyCrew/main`}
            style={{
              textDecoration: 'none',
              pointerEvents: canReadPosts ? 'auto' : 'none',
              cursor: user?.groups.find((group) => group.name === 'Nosey Crew')
                ? 'auto'
                : 'not-allowed',
            }}
          >
            <Button
              onClick={() => setSelectedGroup('noseyCrew')}
              variant={selectedGroup === 'noseyCrew' ? 'contained' : 'outlined'}
              style={
                selectedGroup === 'noseyCrew'
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
              Nosey Crew
            </Button>
          </Link> */}
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
            {canReadPosts && <Route path={`${path}/oneOnOne`} component={OneOnOne} />}
            {/* Below pages removed per Allie's request, but took a while to create, so keeping it just in case */}
            {/*  */}
            {/* {canReadPosts && user?.groups.find((group) => group.name === 'Advanced Group') && (
              <Route path={`${path}/advancedGroup`} component={AdvancedGroup} />
            )}
            {canReadPosts && user?.groups.find((group) => group.name === 'Bite Club') && (
              <Route path={`${path}/biteClub`} component={BiteClub} />
            )}
            {canReadPosts && user?.groups.find((group) => group.name === 'Nosey Crew') && (
              <Route path={`${path}/noseyCrew`} component={NoseyCrew} />
            )} */}
            {/* Change "NotFound" to "RestrictedSinglePage" if enabling group pages */}
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </Grid>
    </>
  );
};

export default ClientPortal;
