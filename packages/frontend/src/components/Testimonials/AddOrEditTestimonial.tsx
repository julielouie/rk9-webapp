/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useEffect } from 'react';
import { Box, Typography, Dialog, Button, TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import palette from '../../theme/palette';

interface AddNewTestimonialProps {
  open: boolean;
  close: () => void;
  testimonial: any;
}

const Input = styled('input')({
  display: 'none',
});

export const AddNewTestimonial: FC<AddNewTestimonialProps> = (props) => {
  const { open, close, testimonial } = props;
  const [imgFile, setImgFile] = useState<any>();
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (testimonial && testimonial.image) {
      setImgUrl(testimonial.image);
    }
  }, [testimonial]);

  const selectFileToUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    if (file) {
      setImgFile(file);
      const newImgUrl = URL.createObjectURL(file);
      setImgUrl(newImgUrl);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <Box style={{ padding: '30px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>
          Add New Testimonial
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Owner and Pet Names"
            placeholder="Owner & Pet Names"
            style={{ marginBottom: '20px' }}
          />
          <TextField
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Testimonial"
            placeholder="Paste testimonial here..."
            multiline
            rows="5"
            style={{ marginBottom: '20px' }}
          />
          <label htmlFor="upload-testimonial-image">
            <Input
              accept="image/*"
              id="upload-testimonial-image"
              type="file"
              onChange={(e) => selectFileToUpload(e)}
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {testimonial.id && imgUrl && (
            <img alt="uploadedImage" src={imgUrl} style={{ borderRadius: '3px' }} />
          )}
        </Box>
        <Box style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={close}
            style={{ backgroundColor: palette.button.primary, color: palette.white }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddNewTestimonial;
