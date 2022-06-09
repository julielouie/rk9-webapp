import React, { FC } from 'react';
import { Box, Typography, Dialog, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import palette from '../../theme/palette';
import { Testimonial } from '../../types/Testimonial';

interface ReadTestimonialProps {
  open: boolean;
  close: () => void;
  testimonial: Testimonial;
}

export const ReadTestimonial: FC<ReadTestimonialProps> = (props) => {
  const { open, close, testimonial } = props;

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={close}>
      <Box style={{ padding: '30px' }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: `5px solid ${palette.paper.secondary}`,
          }}
        >
          <Typography variant="h4">{testimonial.title}</Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <img
            alt={testimonial.title}
            src={testimonial.image || ''}
            style={{ borderRadius: '3px' }}
          />
        </Box>
        <Typography style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          {testimonial.review}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default ReadTestimonial;
