import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import palette from '../../theme/palette';
import HeroImg from '../../assets/images/home.jpeg';
import RespectImg from '../../assets/images/respect.jpeg';
import HumanCanineImg from '../../assets/images/humanAndCanine.jpeg';
import WorkingDogImg from '../../assets/images/workingDogs.png';
import AllieImg from '../../assets/images/static/allie-stormy-overlook.jpg';
import ScrollToTop from '../utils/ScrollToTop';

export const Home: FC = () => {
  const history = useHistory();

  return (
    <>
      <ScrollToTop />
      <Grid container>
        <Grid
          item
          md={12}
          style={{
            marginTop: '50px',
            height: '85vh',
            width: '100%',
            backgroundImage: `url(${HeroImg})`,
            backgroundSize: '150%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Grid
          item
          md={12}
          container
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            sm={12}
            md={6}
            style={{
              marginTop: '50px',
              width: '100%',
              height: '380px',
              backgroundImage: `url(${RespectImg})`,
              backgroundSize: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <Grid
            item
            sm={12}
            md={6}
            style={{
              marginTop: '50px',
              display: 'flex',
              flexDirection: 'column',
              padding: '30px 30px 30px 70px',
            }}
          >
            <Typography variant="h4">A PLACE OF RESPECT</Typography>
            <Typography variant="h5">
              The foundation of all of our curriculum is built on, First: the respect for the animal
              we have the privilege of working with, and Second: the people who love their animals
              enough to seek help to do what is best for them. Respect is not self-righteous or
              judgmental. We seek to compassionately provide truthful and LIMA-forward information
              to anyone willing to learn. The appropriate attitude, based in respect, towards the
              dogs is always on the forefront; this is never to be sacrificed for sales, marketing,
              or to satisfy a quick fix.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          md={12}
          container
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            sm={12}
            md={6}
            style={{
              marginTop: '50px',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'right',
              padding: '30px 70px 30px 30px',
            }}
          >
            <Typography variant="h4">HUMAN and CANINE</Typography>
            <Typography variant="h5">
              Our focus is to work for you and your dog(s), building realistic and reliable training
              plans that educate you as the handler, helping you and your dog overcome barriers
              preventing you from enjoying each other freely.
            </Typography>
          </Grid>
          <Grid
            item
            sm={12}
            md={6}
            style={{
              marginTop: '50px',
              height: '380px',
              width: '100%',
              backgroundImage: `url(${HumanCanineImg})`,
              backgroundSize: '100%',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat',
              transform: 'scaleX(-1)',
            }}
          />
        </Grid>
        <Grid
          item
          md={12}
          container
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '50px',
          }}
        >
          <Grid
            item
            md={6}
            style={{
              marginTop: '50px',
              height: '380px',
              width: '100%',
              backgroundImage: `url(${WorkingDogImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100%',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            md={6}
            style={{
              marginTop: '50px',
              display: 'flex',
              flexDirection: 'column',
              padding: '30px 30px 30px 70px',
            }}
          >
            <Typography variant="h4">
              PUPPY REARING, to SEVERE AGGRESSION, to WORKING DOGS
            </Typography>
            <Typography variant="h5">
              I will walk side by side with you and your pack, to offer ongoing support and
              consultation.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          style={{
            marginBottom: '50px',
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => history.push('/about')}
        >
          <Grid
            item
            sm={12}
            md={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: palette.text.contrast,
              padding: '30px',
            }}
          >
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '30px' }}>
              GET TO KNOW ALLIE
            </Typography>
            <Typography variant="h6">
              I am the owner and head trainer at Rogue K9 Academy, and I am a Certified Foundation
              Style Dog Trainer. Our core values are passion, knowledge, and respect. My own focus
              is on providing science-based training that makes sense, and does not cause negative
              side effects. Foundation Style Dog Training is a holistic approach to dog training,
              implementing operant conditioning, applied behavior analysis, and cynopraxis....
            </Typography>
          </Grid>
          <Grid item sm={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={AllieImg} style={{ height: '100%', width: '100%' }} alt="Allie" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
