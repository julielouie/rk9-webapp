import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@mui/material';
import palette from '../../theme/palette';

export const Home: FC = () => {
  return (
    <Grid container>
      <Grid
        item
        md={12}
        style={{
          marginTop: '50px',
          height: '100vh',
          backgroundColor: palette.disabled,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Temp Hero Image
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
          md={5}
          style={{
            marginTop: '50px',
            height: '300px',
            backgroundColor: palette.disabled,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Temp Image
        </Grid>
        <Grid md={2} />
        <Grid
          item
          md={5}
          style={{
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '30px',
          }}
        >
          <Typography variant="h4">A PLACE OF RESPECT</Typography>
          <Typography variant="h5">
            We believe that working with animals is a gift, and we strive to always remember this.
            This also means that our training will benefit the whole family.
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
          md={5}
          style={{
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            paddingLeft: '30px',
          }}
        >
          <Typography variant="h4">HUMAN and CANINE</Typography>
          <Typography variant="h5">
            Our focus is to work for you and your dog(s), building holistic training plans that
            address all of your concerns and goals, with everything from:
          </Typography>
        </Grid>
        <Grid md={2} />
        <Grid
          item
          md={5}
          style={{
            marginTop: '50px',
            height: '300px',
            backgroundColor: palette.disabled,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Temp Image
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
          marginBottom: '50px',
        }}
      >
        <Grid
          item
          md={5}
          style={{
            marginTop: '50px',
            height: '300px',
            backgroundColor: palette.disabled,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Temp Image
        </Grid>
        <Grid md={2} />
        <Grid
          item
          md={5}
          style={{
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '30px',
          }}
        >
          <Typography variant="h4">PUPPY REARING, to SEVERE AGGRESSION, to WORKING DOGS</Typography>
          <Typography variant="h5">
            I will walk side by side with you and your pack, to offer ongoing support and
            consultation.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        md={12}
        style={{
          marginBottom: '50px',
          height: '70vh',
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '30px',
        }}
      >
        <Grid
          item
          md={6}
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '30px' }}>
            GET TO KNOW ALLIE
          </Typography>
          <Typography variant="h6">
            I am the owner and head trainer at Rogue K9 Academy, and I am a Certified Foundation
            Style Dog Trainer. Our core values are passion, knowledge, and respect. My own focus is
            on providing science-based training that makes sense, and does not cause negative side
            effects. Foundation Style Dog Training is a holistic approach to dog training,
            implementing operant conditioning, applied behavior analysis, and cynopraxis....
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          style={{
            height: '100%',
            backgroundColor: palette.disabled,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Temp Image
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
