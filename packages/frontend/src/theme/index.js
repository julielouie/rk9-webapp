import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core';
import palette from './palette';
import overrides from './overrides';

const theme = createTheme({
  typography: {
    fontFamily: `'Open Sans', 'Helvetica', 'Arial', sans-serif`,
  },
  palette,
  overrides,
});

export default theme;
