const white = '#FFFFFF';
const black = '#000000';
const disabled = '#AAABA6';
const primary = '#1f1235';
const secondary = '#1b1425';
const highlight = '#ff6e6c';
const secondaryHighlight = '#fbdd74';

const palette = {
  black,
  white,
  disabled,
  text: {
    primary,
    secondary,
    contrast: '#f4f0fc',
    highlight,
    secondaryHighlight,
  },
  paper: {
    primary: white,
    secondary: '#f4effc',
    tertiary: '#e2daeb',
    quaternary: '#301e4e',
    highlight,
    secondaryHighlight,
  },
  button: {
    primary: '#4c346b',
    text: primary,
  },
  selected: {
    primary: '#DE5E48',
    secondary: disabled,
  },
};

export default palette;
