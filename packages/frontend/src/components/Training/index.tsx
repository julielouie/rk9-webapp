import React, { FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import { Typography } from '@mui/material';
import palette from '../../theme/palette';

export const Training: FC = () => {
  return (
    <Grid container>
      <Grid
        item
        md={12}
        style={{
          margin: '70px 0 50px 0',
          height: '50vh',
          width: '100%',
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
        container
        style={{
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          color: palette.text.contrast,
        }}
      >
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Our Training Package
        </Typography>
        <Typography variant="h4" style={{ display: 'flex', alignSelf: 'end', fontWeight: 600 }}>
          $655
        </Typography>
      </Grid>
      <Grid item md={12} style={{ padding: '50px' }}>
        <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
          When you hire me to work with you and your dog, you are hiring a personalized, “all-in”
          coaching service, dedicated to helping you build the relationship that you want, with your
          dog.
        </Typography>
        <Typography variant="h5" style={{ paddingBottom: '25px' }}>
          Off-leash training and personal protection are just a few of the more advanced goals
          available. We will progress through the training at you and your dog’s pace. Together, we
          will take the training as far as you would like to go.
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
            With this package you get:
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '25px', fontStyle: 'italic' }}>
            *click on each to learn more
          </Typography>
        </Box>
        <Typography variant="h5" style={{ paddingBottom: '25px' }}>
          Rather than dictating a one-sided program that cannot be realistically implemented by the
          family, the cynopraxic counselor should work with the family in a spirit of teamwork, to
          find a common solution.
        </Typography>
        <Typography variant="h5">
          Toward achieving this aim, the counselor should listen to the family’s needs and be
          creative. Just as it is certainly true of dogs, people are individuals possessing unique
          strengths and weaknesses that need to be recognized and integrated into the training plan.
          Good cynopraxic counselors know how to work well with both people and dogs.
        </Typography>
      </Grid>
      <Grid
        item
        container
        style={{
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          color: palette.text.contrast,
        }}
      >
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Consultation
        </Typography>
        <Typography variant="h4" style={{ display: 'flex', alignSelf: 'end', fontWeight: 600 }}>
          $50
        </Typography>
      </Grid>
      <Grid item md={12} style={{ padding: '50px' }}>
        <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
          To set up your consultation, contact us at{' '}
          <a
            href="mailto: allie@dogtraining.love"
            style={{ fontStyle: 'italic', color: palette.black }}
          >
            allie@dogtraining.love
          </a>{' '}
          or{' '}
          <a href="tel: 909-964-1382" style={{ fontStyle: 'italic', color: palette.black }}>
            (909) 964-1382
          </a>
          .
        </Typography>
        <Typography variant="h5" style={{ paddingBottom: '25px' }}>
          Consultations are held via zoom and last about 1.5 hours.
        </Typography>
        <Typography variant="h5" style={{ paddingBottom: '25px' }}>
          Prior to your consultation, you will receive a welcome packet with a bunch of
          complimentary information that will help you right away, and help you decide if you want
          to invest further. Your consultation will give you tools to start your dog on the right
          path, regardless of whether or not you decide to move forward with training. We will also
          be able to answer any questions that you have. Foundation Style Dog Training can help any
          dog and handler team achieve any goal, because it is based on understanding animal
          behavior and how to train animals. It is not a hack, or “quick fix”!
        </Typography>
      </Grid>
      <Grid
        item
        container
        style={{
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          color: palette.text.contrast,
        }}
      >
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Online Training
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography variant="h5" style={{ padding: '50px', fontWeight: 550 }}>
          If you have an aggressive dog and are out of the area, please take advantage of my online
          aggression consultations, support, and online training. There is hope! I am here for you!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Training;
