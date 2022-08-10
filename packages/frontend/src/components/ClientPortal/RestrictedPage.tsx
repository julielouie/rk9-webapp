import React, { FC, useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import palette from '../../theme/palette';
import RK9Icon from '../../assets/images/RK9 Icon.png';
import { SessionContext } from '../../context/SessionContext';

interface RestrictedPageProps {
  isAlternate?: boolean;
  alternateTitle?: string;
  alternateTitleLine2?: string;
  alternateBody?: string;
}

export const RestrictedPage: FC<RestrictedPageProps> = (props) => {
  const { isAlternate, alternateTitle, alternateTitleLine2, alternateBody } = props;
  const {
    state: { user },
  } = useContext(SessionContext);

  return (
    <Grid
      style={{
        display: isAlternate && !user ? 'none' : 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        paddingTop: isAlternate ? '150px' : '250px',
        paddingLeft: '100px',
        height: '100%',
        width: '100%',
        position: 'absolute',
        background: `linear-gradient(rgba(255, 255, 255, 0.8), ${palette.disabled})`,
        zIndex: 9,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img src={RK9Icon} alt="Rogue K9 Logo" style={{ height: '100%', width: '30%' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h1">Oops...</Typography>
          <Typography variant="h3">{alternateTitle || 'You must be logged in'}</Typography>
          <Typography variant="h3">{alternateTitleLine2 || 'to view these pages!'}</Typography>
          <Typography variant="h5" style={{ marginTop: '20px' }}>
            {alternateBody || 'Please login to try again.'}
          </Typography>
        </div>
      </div>
    </Grid>
  );
};

export default RestrictedPage;
