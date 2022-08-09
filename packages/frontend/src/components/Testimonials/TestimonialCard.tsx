import React, { FC, useState } from 'react';
import { Typography, IconButton, Grid, Box } from '@material-ui/core';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useAbility } from '@casl/react';
import palette from '../../theme/palette';
import { Testimonial } from '../../types/Testimonial';
import ReadTestimonial from './ReadTestimonial';
import AddOrEditTestimonial from './AddOrEditTestimonial';
import { AbilityContext } from '../../context/AbilityContext';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: FC<TestimonialCardProps> = (props) => {
  const { testimonial } = props;
  const [openAddOrEditDialog, setOpenAddOrEditDialog] = useState(false);
  const [openReadTestimonial, setOpenReadTestimonial] = useState(false);
  const ability = useAbility(AbilityContext);

  return (
    <>
      <Grid item container md={4} sm={6} xs={12}>
        <Grid item style={{ padding: '50px 50px 0 50px', width: '100%' }}>
          {(ability.can('create', 'All') || ability.can('update', 'All')) && (
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
          )}
          <Card
            style={{ cursor: 'pointer', height: '350px', boxShadow: 'none', borderRadius: 0 }}
            onClick={() => setOpenReadTestimonial(true)}
          >
            {testimonial.image ? (
              <CardMedia
                style={{ borderRadius: '3px' }}
                component="img"
                height="250"
                image={testimonial.image}
                alt={testimonial.title}
              />
            ) : (
              <Box
                style={{
                  width: '100%',
                  height: '250px',
                  backgroundColor: palette.disabled,
                  color: palette.white,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '3px',
                }}
              >
                <ImageNotSupportedIcon style={{ fontSize: '4rem' }} /> <span>No Photo</span>
              </Box>
            )}
            <CardContent style={{ width: '100%', textAlign: 'center', padding: '20px 0' }}>
              <Typography
                variant="h6"
                style={{
                  width: '100%',
                  borderBottom: `5px solid ${palette.paper.secondary}`,
                  paddingBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                {testimonial.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ReadTestimonial
        open={openReadTestimonial}
        close={() => setOpenReadTestimonial(false)}
        testimonial={testimonial}
      />
      {(ability.can('create', 'All') || ability.can('update', 'All')) && (
        <AddOrEditTestimonial
          open={openAddOrEditDialog}
          close={() => setOpenAddOrEditDialog(false)}
          testimonial={testimonial}
        />
      )}
    </>
  );
};

export default TestimonialCard;
