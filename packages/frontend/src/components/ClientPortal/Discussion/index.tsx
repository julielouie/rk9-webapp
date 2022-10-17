import React, { FC, useEffect } from 'react';
import { Typography, Grid, IconButton } from '@material-ui/core';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { Link, useLocation } from 'react-router-dom';
import { useAbility } from '@casl/react';
import palette from '../../../theme/palette';
import { AbilityContext } from '../../../context/AbilityContext';

export const Discussion: FC = () => {
  const { pathname } = useLocation();
  const ability = useAbility(AbilityContext);
  const canReadPosts = ability.can('read', 'All');

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('resize'));
  }, [pathname]);

  return (
    <Grid container>
      <Grid
        item
        container
        style={{
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          padding: '5px 5px 5px 10px',
          color: palette.text.contrast,
          height: '50px',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: canReadPosts ? 'auto' : 'none',
        }}
      >
        <Typography variant="h5" style={{ fontWeight: 600 }}>
          Discussion
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          width: '100%',
          padding: '0 50px',
          margin: '30px 0',
          height: 'calc(75vh - 50px)',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h3">Join our Google Drive, for our general discussions!</Typography>
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          You may also join using the buttons located at the top and bottom of the website, if you
          are logged in.
        </Typography>
        {canReadPosts && (
          <Link
            to={{
              pathname:
                'https://drive.google.com/drive/folders/1aRPAprS_kymKKO7O0xPBmnCQULgSaQ2P?usp=sharing',
            }}
            target="_blank"
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <IconButton>
              <AddToDriveIcon style={{ color: palette.button.primary }} />
            </IconButton>
            Enter Google Drive
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default Discussion;
