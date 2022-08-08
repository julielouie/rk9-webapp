import palette from '../palette';

const MuiTabs = {
  root: {
    color: palette.text.secondary,
    '& .MuiTab-root': {
      fontSize: '1rem',
      textTransform: 'unset',
    },
    '& .MuiTab-root:hover': {
      fontWeight: 'bold',
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      color: palette.text.primary,
      fontWeight: 'bold',
      textTransform: 'unset',
    },
    '& .MuiTab-wrapper': {
      color: palette.text.primary,
      opacity: 0.6,
    },
    '& .MuiTabs-indicator': {
      backgroundColor: palette.selected.primary,
    },
  },
};

export default MuiTabs;
