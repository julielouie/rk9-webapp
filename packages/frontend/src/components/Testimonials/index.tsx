import React, { FC, useState, useContext } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import useSWR from 'swr';
import palette from '../../theme/palette';
import { SessionContext } from '../../context/SessionContext';
import AddOrEditTestimonial from './AddOrEditTestimonial';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../../types/Testimonial';

export const Testimonials: FC = () => {
  const [openAddOrEditDialog, setOpenAddOrEditDialog] = useState(false);
  const {
    state: { user },
  } = useContext(SessionContext);

  const { data: testimonials } = useSWR<Testimonial[]>('/testimonials', { suspense: true });

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
        <Grid
          item
          container
          style={{ padding: '50px 50px 0 50px', display: 'flex', justifyContent: 'end' }}
        >
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
      <Grid item container style={{ paddingBottom: '50px', display: 'flex' }}>
        {testimonials &&
          testimonials.map((testimonial) => <TestimonialCard testimonial={testimonial} />)}
      </Grid>
      <AddOrEditTestimonial
        open={openAddOrEditDialog}
        close={() => setOpenAddOrEditDialog(false)}
        testimonial={null}
      />
    </>
  );
};

export default Testimonials;
