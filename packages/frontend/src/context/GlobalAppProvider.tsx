import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import theme from '../theme';
import NotificationProvider from '../components/utils/NotificationProvider';
import { SessionProvider } from './SessionContext';
import ability from '../ability/defineAbility';
import { AbilityContext } from './AbilityContext';
import AppDataFetcher from '../dataServices/AppDataFetcher';

const GlobalAppProvider: React.FunctionComponent = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <AbilityContext.Provider value={ability}>
        <SessionProvider>
          <AppDataFetcher>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <NotificationProvider>{children}</NotificationProvider>
            </LocalizationProvider>
          </AppDataFetcher>
        </SessionProvider>
      </AbilityContext.Provider>
    </MuiThemeProvider>
  );
};
export default GlobalAppProvider;
