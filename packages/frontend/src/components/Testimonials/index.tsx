import React, { FC, useState, useContext } from 'react';
import { Typography, Grid, Button, Box } from '@material-ui/core';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Carousel from 'react-material-ui-carousel';
import useSWR from 'swr';
import palette from '../../theme/palette';
import { SessionContext } from '../../context/SessionContext';
import AddOrEditTestimonial from './AddOrEditTestimonial';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../../types/Testimonial';
import { reviewBlurbs } from './constants/reviewBlurbs';
import PawPrint from '../../assets/images/paw.png';

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
          style={{
            width: '100%',
            backgroundColor: palette.paper.tertiary,
            paddingBottom: '20px',
          }}
        >
          <Carousel>
            {reviewBlurbs.map((reviewBlurb) => (
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={reviewBlurb.name}
              >
                <Box
                  style={{
                    width: '60%',
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    marginLeft: '100px',
                  }}
                >
                  <Typography variant="h2">{reviewBlurb.name}</Typography>
                  <Box style={{ display: 'flex', width: '90%' }}>
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
                  </Box>
                </Box>
                <Box style={{ display: 'flex', width: '40%', marginTop: '40px' }}>
                  <div
                    style={{
                      backgroundColor: palette.disabled,
                      backgroundImage: `url(${reviewBlurb.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      borderRadius: '250px',
                      height: '450px',
                      width: '450px',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Carousel>
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
