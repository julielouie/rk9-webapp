import palette from '../palette';

const MuiSwitch = {
  root: {
    '&.MuiSwitch-root .MuiSwitch-colorSecondary.Mui-checked': {
      color: palette.selected.primary,
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
      opacity: 0.7,
      backgroundColor: palette.selected.primary,
    },
  },
};

export default MuiSwitch;
