import React, { FC, useContext, useState } from 'react';
import { Typography, IconButton, Grid, Box } from '@material-ui/core';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import palette from '../../theme/palette';
import { SessionContext } from '../../context/SessionContext';
import { Testimonial } from '../../types/Testimonial';
import ReadTestimonial from './ReadTestimonial';
import AddOrEditTestimonial from './AddOrEditTestimonial';

interface TestimonialProps {
  testimonial: Testimonial;
}

const TestimonialCard: FC<TestimonialProps> = (props) => {
  const { testimonial } = props;
  const [openAddOrEditDialog, setOpenAddOrEditDialog] = useState(false);
  const [openReadTestimonial, setOpenReadTestimonial] = useState(false);
  const {
    state: { user },
  } = useContext(SessionContext);

  return (
    <>
      <Grid item container md={4} sm={6} xs={12}>
        <Grid item style={{ padding: '50px 50px 0 50px' }}>
          <IconButton
            style={{
              backgroundColor: palette.button.primary,
              color: palette.white,
              position: 'absolute',
            }}
            onClick={() => setOpenAddOrEditDialog(true)}
          >
            <EditIcon />
          </IconButton>
          <Card
            style={{ padding: '20px', cursor: 'pointer', height: '350px' }}
            onClick={() => setOpenReadTestimonial(true)}
          >
            {testimonial.image ? (
              <CardMedia
                component="img"
                height="250"
                image={testimonial.image}
                alt={testimonial.title}
                style={{ width: '333.33px' }}
              />
            ) : (
              <Box
                style={{
                  width: '333.33px',
                  height: '250px',
                  backgroundColor: palette.disabled,
                  color: palette.white,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ImageNotSupportedIcon style={{ fontSize: '4rem' }} /> <span>No Photo</span>
              </Box>
            )}
            <CardContent
              style={{ borderBottom: `5px solid ${palette.paper.secondary}`, textAlign: 'center' }}
            >
              <Typography variant="h6">{testimonial.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ReadTestimonial
        open={openReadTestimonial}
        close={() => setOpenReadTestimonial(false)}
        testimonial={testimonial}
      />
      <AddOrEditTestimonial
        open={openAddOrEditDialog}
        close={() => setOpenAddOrEditDialog(false)}
        testimonial={testimonial}
      />
    </>
  );
};

export default TestimonialCard;
