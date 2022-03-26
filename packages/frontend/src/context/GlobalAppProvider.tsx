import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import theme from '../theme';
import NotificationProvider from '../components/utils/NotificationProvider';
import { SessionProvider } from './SessionContext';
// import AppDataFetcher from '../dataServices/AppDataFetcher';
// will implement this at a later time once we have users set up

const GlobalAppProvider: React.FunctionComponent = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <SessionProvider>
        {/* <AppDataFetcher> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <NotificationProvider>{children}</NotificationProvider>
        </LocalizationProvider>
        {/* </AppDataFetcher> */}
      </SessionProvider>
    </MuiThemeProvider>
  );
};
export default GlobalAppProvider;
