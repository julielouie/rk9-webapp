import React, { FC, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, IconButton, Link, Typography } from '@material-ui/core';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import palette from '../../../theme/palette';
import PawPrint from '../../../assets/images/paw.png';
import { SessionContext } from '../../../context/SessionContext';

const Footer: FC = () => {
  const {
    state: { user },
  } = useContext(SessionContext);

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
            <RouterLink to="/home" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '30px',
                  color: palette.text.contrast,
                }}
              >
                Empowering Relationships with Difficult and Aggressive Dogs
              </Typography>
            </RouterLink>
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
                {user && (
                  <RouterLink
                    to={{
                      pathname:
                        'https://drive.google.com/drive/folders/1aRPAprS_kymKKO7O0xPBmnCQULgSaQ2P?usp=sharing',
                    }}
                    target="_blank"
                  >
                    <IconButton>
                      <AddToDriveIcon style={{ color: palette.text.contrast }} />
                    </IconButton>
                  </RouterLink>
                )}
                {user && (
                  <RouterLink
                    to={{ pathname: 'https://www.facebook.com/groups/1067124983484762/' }}
                    target="_blank"
                  >
                    <IconButton>
                      <FacebookIcon style={{ color: palette.text.contrast }} />
                    </IconButton>
                  </RouterLink>
                )}
                <RouterLink
                  to={{
                    pathname: user
                      ? 'https://www.instagram.com/roguek9academygrouppage/'
                      : 'https://www.instagram.com/roguek9academy/',
                  }}
                  target="_blank"
                >
                  <IconButton>
                    <InstagramIcon style={{ color: palette.text.contrast }} />
                  </IconButton>
                </RouterLink>
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
                  <RouterLink
                    to="/about"
                    style={{ textDecoration: 'none', color: palette.text.contrast }}
                  >
                    ABOUT
                  </RouterLink>
                </Box>
                <Box>
                  <RouterLink
                    to="/philosophy"
                    style={{ textDecoration: 'none', color: palette.text.contrast }}
                  >
                    PHILOSOPHY
                  </RouterLink>
                </Box>
                <Box>
                  <RouterLink
                    to="/training"
                    style={{ textDecoration: 'none', color: palette.text.contrast }}
                  >
                    TRAINING
                  </RouterLink>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <RouterLink
                  to="/testimonials"
                  style={{ textDecoration: 'none', color: palette.text.contrast }}
                >
                  TESTIMONIALS
                </RouterLink>
              </Box>
              <Box>
                <RouterLink
                  to="/blog"
                  style={{ textDecoration: 'none', color: palette.text.contrast }}
                >
                  BLOG
                </RouterLink>
              </Box>
              <Box>
                <RouterLink
                  to="/clientPortal/discussion/main"
                  style={{ textDecoration: 'none', color: palette.text.contrast }}
                >
                  CLIENT PORTAL
                </RouterLink>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
