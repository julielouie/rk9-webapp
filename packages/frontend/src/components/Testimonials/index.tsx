import React, { FC, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import palette from '../../theme/palette';

export const Testimonials: FC = () => {
  const [openReview, setOpenReview] = useState(false);

  return (
    <Grid container>
      <Grid
        item
        container
        style={{
          marginTop: '60px',
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          padding: '20px',
          color: palette.text.contrast,
        }}
      >
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Testimonials
        </Typography>
      </Grid>
      <Grid item container style={{ padding: '50px' }} />
    </Grid>
  );
};

export default Testimonials;
