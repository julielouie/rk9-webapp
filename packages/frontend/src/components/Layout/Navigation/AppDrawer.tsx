import React, { useContext, useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';
import palette from '../../../theme/palette';
import { Drawer } from './Drawer';
import { UPDATE_DRAWER } from '../../../constants/actions';
import { SessionContext } from '../../../context/SessionContext';

interface AppDrawerProps {
  open: boolean;
  drawerChange: (change: boolean) => void;
}

const AppDrawer: React.FC<AppDrawerProps> = (props) => {
  const { open, drawerChange } = props;
  const [selectedTab, setSelectedTab] = useState('');
  const {
    state: { drawerOpened },
    dispatch,
  } = useContext(SessionContext);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const currentTab = pathname.split('/')[1];
    switch (currentTab) {
      case 'settings':
        setSelectedTab('settings');
        break;
      default:
        break;
    }
  }, [pathname]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (open) {
        if (window.innerWidth < 980) {
          drawerChange(false);
        }
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [drawerChange, open]);

  return (
    <Route
      render={() => (
        <Drawer variant="permanent" open={drawerOpened}>
          <List
            style={{
              marginTop: '30px',
              marginLeft: '8px',
              display: 'flex',
              flexDirection: 'column',
              height: '90%',
            }}
          >
            <ListItem button>
              {!open && (
                <ListItemIcon>
                  <div
                    style={{
                      background: palette.black,
                      color: palette.text.contrast,
                      padding: '0 5px',
                      fontWeight: 800,
                    }}
                  >
                    M
                  </div>
                </ListItemIcon>
              )}
              <ListItemText
                primary="RK9"
                style={{
                  background: palette.black,
                  color: palette.text.contrast,
                  paddingLeft: '5px',
                }}
              />
            </ListItem>
            <ListItem button style={{ marginTop: '40px' }} onClick={() => history.push('/home')}>
              <ListItemIcon>
                <GridViewIcon
                  style={{
                    color:
                      selectedTab === 'loglist' ? palette.selected.primary : palette.text.secondary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Log List"
                style={{
                  color:
                    selectedTab === 'loglist' ? palette.selected.primary : palette.text.secondary,
                }}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon
                  style={{
                    color:
                      selectedTab === 'settings'
                        ? palette.selected.primary
                        : palette.text.secondary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                style={{
                  color:
                    selectedTab === 'settings' ? palette.selected.primary : palette.text.secondary,
                }}
              />
            </ListItem>
          </List>
          <List
            style={{
              marginLeft: '8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ListItem
              button
              onClick={() => {
                drawerChange(!open);
                localStorage.setItem('drawerOpened', !open ? 'true' : '');
                dispatch({ type: UPDATE_DRAWER, payload: !open });
              }}
            >
              <MoreVertIcon />
            </ListItem>
          </List>
        </Drawer>
      )}
    />
  );
};

export default AppDrawer;
