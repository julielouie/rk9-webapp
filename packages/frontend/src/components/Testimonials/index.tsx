import React, { FC, useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import palette from '../../theme/palette';
import AddOrEditTestimonial from './AddOrEditTestimonial';

export const Testimonials: FC = () => {
  const [openAddOrEditDialog, setOpenAddOrEditDialog] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  return (
    <>
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
        <Grid item container style={{ padding: '50px' }}>
          <Grid item>
            <Button
              style={{ backgroundColor: palette.button.primary, color: palette.white }}
              onClick={() => setOpenAddOrEditDialog(true)}
            >
              Add Testimonial
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <AddOrEditTestimonial
        open={openAddOrEditDialog}
        close={() => setOpenAddOrEditDialog(false)}
        testimonial={{}}
      />
    </>
  );
};

export default Testimonials;
