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
        <Grid container>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="h5"
              style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}
            >
              Empowering Relationships with Difficult and Aggressive Dogs
            </Typography>
          </Grid>
          <Grid
            item
            container
            style={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item xs={12} sm={4}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
            <Grid item xs={12} sm={4}>
              <Box style={{ padding: '30px' }}>
                <Box>
                  <Link href="/about" color="inherit">
                    ABOUT
                  </Link>
                </Box>
                <Box>
                  <Link href="/philosophy" color="inherit">
                    PHILOSOPHY
                  </Link>
                </Box>
                <Box>
                  <Link href="/training" color="inherit">
                    TRAINING
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Link href="/testimonials" color="inherit">
                  TESTIMONIALS
                </Link>
              </Box>
              <Box>
                <Link href="/blog" color="inherit">
                  BLOG
                </Link>
              </Box>
              <Box>
                <Link href="/clientPortal" color="inherit">
                  CLIENT PORTAL
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
