import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const disabled = '#AAABA6';
const disabledVariant = colors.grey[700];

const palette = {
  black,
  white,
  disabled,
  disabledVariant,
  text: {
    primary: black,
    secondary: disabled,
    contrast: white,
  },
  paper: {
    primary: '#F7F6F2',
    secondary: disabled,
    contrast: 'white',
  },
  button: {
    primary: '#6A986A',
    secondary: black,
  },
  selected: {
    primary: '#DE5E48',
    secondary: disabled,
  },
};

export default palette;
