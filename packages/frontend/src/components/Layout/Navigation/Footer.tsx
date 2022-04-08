import React, { FC } from 'react';
import { Box, Container, Grid, Link, Typography } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import palette from '../../../theme/palette';
import PawPrint from '../../../assets/images/paw.png';

const Footer: FC = () => {
  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: palette.paper.quaternary,
        color: palette.text.contrast,
        height: '400px',
        backgroundImage: `url(${PawPrint})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              Empowering Relationships with Difficult and Aggressive Dogs
            </Typography>
          </Grid>
          <Grid
            item
            container
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Grid item>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                Allie McCain
                <FacebookIcon style={{ marginLeft: '15px' }} />
                <InstagramIcon style={{ marginLeft: '15px' }} />
              </Box>
              <Box>
                <Link href="mailto: allie@dogtraining.love" color="inherit">
                  allie@dogtraining.love
                </Link>
              </Box>
              <Box>
                <Link href="tel: 909-964-1382" color="inherit">
                  (909) 964-1382
                </Link>
              </Box>
            </Grid>
            <Grid item style={{ padding: '0 200px' }}>
              <Box>
                <Link href="/about" color="inherit">
                  About
                </Link>
              </Box>
              <Box>
                <Link href="/philosophy" color="inherit">
                  Philosophy
                </Link>
              </Box>
              <Box>
                <Link href="/training" color="inherit">
                  Training
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Link href="/testimonials" color="inherit">
                  Testimonials
                </Link>
              </Box>
              <Box>
                <Link href="/blog" color="inherit">
                  Blog
                </Link>
              </Box>
              <Box>
                <Link href="/clientPortal" color="inherit">
                  Client Portal
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
