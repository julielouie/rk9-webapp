/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useEffect } from 'react';
import { Box, Typography, Dialog, TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { mutate } from 'swr';
import palette from '../../theme/palette';
import { Testimonial } from '../../types/Testimonial';
import Rk9Api from '../../dataServices/Rk9Api';
import { DELETE, POST, PUT } from '../../constants/requests';
import { LEVEL_ERROR, LogError } from '../../dataServices/Logger';

interface AddNewTestimonialProps {
  open: boolean;
  close: () => void;
  testimonial: Testimonial | null;
}

const Input = styled('input')({
  display: 'none',
});

export const AddNewTestimonial: FC<AddNewTestimonialProps> = (props) => {
  const { open, close, testimonial } = props;
  const [imgFile, setImgFile] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState('');
  const [updatedTestimonial, setUpdatedTestimonial] = useState<Testimonial>({
    title: '',
    date: new Date(),
    review: '',
    image: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (testimonial) {
      if (testimonial.image) {
        setImgUrl(testimonial.image);
      }
      setUpdatedTestimonial(testimonial);
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

  const uploadFile = async (testimonialId: string) => {
    const formData = new FormData();
    formData.append('media', imgFile, imgFile.name);
    await Rk9Api(POST, `/uploads/${testimonialId}?postType=testimonial`, formData).catch(() =>
      enqueueSnackbar('There was a problem uploading the image file. Please let someone know!', {
        persist: false,
        variant: 'error',
      }),
    );
  };

  const closeDialog = () => {
    if (!testimonial) {
      const newUpdatedTestimonial = {
        title: '',
        date: new Date(),
        review: '',
        image: '',
      };
      setUpdatedTestimonial(newUpdatedTestimonial);
    } else {
      setUpdatedTestimonial(testimonial);
    }
    if (imgFile || imgUrl) {
      setImgFile(null);
      setImgUrl('');
    }
    close();
  };

  const saveTestimonial = async () => {
    let savedTestimonial: Testimonial = {} as Testimonial;
    if (!testimonial) {
      savedTestimonial = await Rk9Api(POST, '/testimonials', updatedTestimonial).catch(() =>
        enqueueSnackbar('There was a problem creating the testimonial. Please let someone know!', {
          persist: false,
          variant: 'error',
        }),
      );
    } else {
      savedTestimonial = await Rk9Api(
        PUT,
        `/testimonials/${testimonial.id}`,
        updatedTestimonial,
      ).catch(() =>
        enqueueSnackbar('There was a problem updating the testimonial. Please let someone know!', {
          persist: false,
          variant: 'error',
        }),
      );
    }
    if (savedTestimonial.id) {
      enqueueSnackbar('Testimonial was successfully saved!', {
        persist: false,
        variant: 'success',
      });
      if (imgFile) {
        await uploadFile(savedTestimonial.id).catch((error) =>
          LogError(LEVEL_ERROR, error, 'Upload Image'),
        );
      }
    }
    await mutate('/testimonials');
    closeDialog();
  };

  const deleteTestimonial = async () => {
    if (testimonial) {
      await Rk9Api(DELETE, `/testimonials/${testimonial.id}`, updatedTestimonial)
        .then(() =>
          enqueueSnackbar('Testimonial was successfully deleted!', {
            persist: false,
            variant: 'success',
          }),
        )
        .catch(() =>
          enqueueSnackbar(
            'There was a problem deleting the testimonial. Please let someone know!',
            {
              persist: false,
              variant: 'error',
            },
          ),
        );
    }
    await mutate('/testimonials');
    closeDialog();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <Box style={{ padding: '30px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>
          {testimonial && testimonial.id ? 'Edit Testimonial' : 'Add New Testimonial'}
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Owner and Pet Names"
            placeholder="Owner & Pet Names"
            style={{ marginBottom: '20px' }}
            value={updatedTestimonial.title}
            onChange={(e) =>
              setUpdatedTestimonial({ ...updatedTestimonial, title: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Testimonial"
            placeholder="Paste testimonial here..."
            multiline
            rows="5"
            style={{ marginBottom: '20px' }}
            value={updatedTestimonial.review}
            onChange={(e) =>
              setUpdatedTestimonial({ ...updatedTestimonial, review: e.target.value })
            }
          />
          <label htmlFor="upload-testimonial-image">
            <Input
              accept="image/*"
              id="upload-testimonial-image"
              type="file"
              onChange={(e) => selectFileToUpload(e)}
              name="media"
            />
            <Button variant="contained" component="span" color="inherit">
              Upload Image
            </Button>
          </label>
          {((testimonial && testimonial.id && imgUrl) || imgFile) && (
            <img
              alt="uploadedImage"
              src={imgUrl}
              style={{ borderRadius: '3px', marginTop: '20px' }}
            />
          )}
        </Box>
        <Box
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {testimonial && testimonial.id && (
            <Button variant="contained" onClick={deleteTestimonial} color="error">
              Delete
            </Button>
          )}
          <Box
            style={{
              display: 'flex',
              justifyContent: testimonial && testimonial.id ? 'inherit' : 'space-between',
            }}
          >
            <Button variant="outlined" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              onClick={saveTestimonial}
              style={{
                backgroundColor: palette.button.primary,
                color: palette.white,
                marginLeft: '20px',
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddNewTestimonial;
