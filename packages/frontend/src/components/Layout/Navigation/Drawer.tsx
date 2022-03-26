import MuiDrawer from '@mui/material/Drawer';
import { Theme, CSSObject, styled } from '@mui/material/styles';
import { drawerWidthOpen } from '../../../constants/GlobalConstants';

const openedDrawer = (theme: Theme): CSSObject => ({
  width: drawerWidthOpen,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedDrawer = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: any) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidthOpen,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedDrawer(theme),
      '& .MuiDrawer-paper': openedDrawer(theme),
    }),
    ...(!open && {
      ...closedDrawer(theme),
      '& .MuiDrawer-paper': closedDrawer(theme),
    }),
  }),
);
