/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useEffect } from 'react';
import { Box, Typography, Dialog, TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { mutate } from 'swr';
import { useAbility } from '@casl/react';
import palette from '../../theme/palette';
import { Testimonial } from '../../types/Testimonial';
import Rk9Api from '../../dataServices/Rk9Api';
import { DELETE, POST, PUT } from '../../constants/requests';
import { LEVEL_ERROR, LogError } from '../../dataServices/Logger';
import { AbilityContext } from '../../context/AbilityContext';

interface AddOrEditTestimonialProps {
  open: boolean;
  close: () => void;
  testimonial: Testimonial | null;
}

export const AddOrEditTestimonial: FC<AddOrEditTestimonialProps> = (props) => {
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
  const ability = useAbility(AbilityContext);

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
            style={{ marginBottom: '20px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            value={updatedTestimonial.review}
            onChange={(e) =>
              setUpdatedTestimonial({ ...updatedTestimonial, review: e.target.value })
            }
          />
          <Button
            variant="outlined"
            component="label"
            style={{
              display: 'flex',
              alignSelf: 'start',
              borderColor: palette.paper.secondary,
              color: palette.paper.secondary,
            }}
          >
            Upload Image
            <input
              accept="image/*"
              type="file"
              onChange={(e) => selectFileToUpload(e)}
              name="media"
              hidden
            />
          </Button>
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
              disabled={!(ability.can('create', 'All') || ability.can('update', 'All'))}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddOrEditTestimonial;
