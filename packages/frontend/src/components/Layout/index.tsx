import React, { ReactNode, useContext, useState } from 'react';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import { drawerWidthOpen } from '../../constants/GlobalConstants';
import NavigationView from './Navigation';
import { SessionContext } from '../../context/SessionContext';

const closedDrawerBody = (theme: Theme): CSSObject => ({
  marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Box = styled(MuiBox, { shouldForwardProp: (prop: any) => prop !== 'marginLeft' })(
  ({ theme, marginLeft }) => ({
    ...(marginLeft && {
      marginLeft: drawerWidthOpen,
    }),
    ...(!marginLeft && {
      ...closedDrawerBody(theme),
      '& .MuiDrawer-paper': closedDrawerBody(theme),
    }),
  }),
);

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;
  const {
    state: { drawerOpened },
  } = useContext(SessionContext);
  const [open, setOpen] = useState(drawerOpened);

  const toggleDrawer = (change: React.SetStateAction<boolean>) => {
    setOpen(change);
  };

  return (
    <>
      <NavigationView open={open} drawerChange={toggleDrawer} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        marginLeft={drawerOpened ? drawerWidthOpen : 0}
      >
        {children}
      </Box>
    </>
  );
};
