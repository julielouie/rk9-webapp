import React, { FC, useState, useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import palette from '../../theme/palette';

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 2,
    position: 'fixed',
    bottom: '2vh',
    backgroundColor: palette.button.primary,
    color: palette.text.contrast,
    '&:hover, &.Mui-focusVisible': {
      cursor: 'pointer',
      transition: '0.3s',
      color: palette.text.contrast,
      backgroundColor: palette.button.primary,
      opacity: 1,
    },
    [theme.breakpoints.up('xs')]: {
      right: '2%',
      backgroundColor: palette.button.primary,
      opacity: 0.8,
    },
    [theme.breakpoints.up('lg')]: {
      right: '2%',
    },
  },
}));

interface ScrollToTopProps {
  showBelow: number;
}

const ScrollToTop: FC<ScrollToTopProps> = (props) => {
  const { showBelow } = props;
  const classes = useStyles();
  const [show, setShow] = useState(!showBelow);

  const showScrollButton = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else if (show) setShow(false);
  };

  const scrollWindow = () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, showScrollButton);
      return () => window.removeEventListener(`scroll`, showScrollButton);
    }
  });

  return (
    <Box>
      {show && (
        <IconButton
          onClick={scrollWindow}
          className={classes.toTop}
          aria-label="to top"
          component="span"
        >
          <ExpandLessIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ScrollToTop;
