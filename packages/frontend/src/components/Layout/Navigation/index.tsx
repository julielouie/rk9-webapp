import React from 'react';
import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';

interface NavigationViewProps {
  open: boolean;
  drawerChange: (change: boolean) => void;
}

const NavigationView: React.FC<NavigationViewProps> = (props) => {
  const { open, drawerChange } = props;

  return (
    <>
      <AppHeader />
      <AppDrawer open={open} drawerChange={drawerChange} />
    </>
  );
};

export default NavigationView;
