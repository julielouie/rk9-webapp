import React, { FC, useState, useContext } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Carousel from 'react-material-ui-carousel';
import useSWR from 'swr';
import palette from '../../theme/palette';
import { SessionContext } from '../../context/SessionContext';
import AddOrEditTestimonial from './AddOrEditTestimonial';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../../types/Testimonial';
import { reviewBlurbs } from './constants/reviewBlurbs';

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
          xs={12}
          style={{
            width: '100%',
            backgroundColor: palette.paper.tertiary,
            paddingBottom: '20px',
          }}
        >
          <Carousel>
            {reviewBlurbs.map((reviewBlurb) => (
              <Grid
                key={reviewBlurb.name}
                item
                container
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              >
                <Grid item container sm={12} md={7}>
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'start',
                      padding: '0 50px',
                    }}
                  >
                    <Typography variant="h2" style={{ paddingTop: '20px' }}>
                      {reviewBlurb.name}
                    </Typography>
                    <div style={{ display: 'flex', paddingTop: '20px' }}>
                      <FormatQuoteIcon
                        style={{
                          color: palette.button.primary,
                          transform: 'scale(-1, 1)',
                          fontSize: '5rem',
                        }}
                      />
                      <Typography variant="h5" style={{ alignSelf: 'end', fontStyle: 'italic' }}>
                        {reviewBlurb.description}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={5}
                  style={{ display: 'flex', justifyContent: 'center', padding: '50px 0 0 50px' }}
                >
                  <div
                    style={{
                      backgroundColor: palette.disabled,
                      backgroundImage: `url(${reviewBlurb.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      borderRadius: '1000px',
                      height: '400px',
                      width: '400px',
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Carousel>
        </Grid>
        <Grid
          item
          container
          style={{ padding: '50px 50px 0 50px', display: 'flex', justifyContent: 'end' }}
        >
          <Button
            style={{ backgroundColor: palette.button.primary, color: palette.white }}
            onClick={() => setOpenAddOrEditDialog(true)}
          >
            Add Testimonial
          </Button>
        </Grid>
      </Grid>
      <Grid item container style={{ paddingBottom: '50px', display: 'flex' }}>
        {testimonials &&
          testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
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
