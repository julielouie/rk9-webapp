/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, Dispatch, useState, useEffect, SetStateAction } from 'react';
import { Box, Typography, Dialog, TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { mutate } from 'swr';
import palette from '../../theme/palette';
import { BlogPost } from '../../types/BlogPost';
import Rk9Api from '../../dataServices/Rk9Api';
import { DELETE, POST, PUT } from '../../constants/requests';
import { LEVEL_ERROR, LogError } from '../../dataServices/Logger';

interface AddOrEditBlogPostProps {
  open: boolean;
  close: () => void;
  blogPost: BlogPost | null;
  updatedBlogPost: BlogPost;
  setUpdatedBlogPost: Dispatch<SetStateAction<BlogPost>>;
}

const Input = styled('input')({
  display: 'none',
});

export const AddOrEditBlogPost: FC<AddOrEditBlogPostProps> = (props) => {
  const { open, close, blogPost, updatedBlogPost, setUpdatedBlogPost } = props;
  const [imgFile, setImgFile] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (blogPost) {
      if (blogPost.image) {
        setImgUrl(blogPost.image);
      }
      setUpdatedBlogPost(blogPost);
    }
  }, [blogPost, setUpdatedBlogPost]);

  const selectFileToUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    if (file) {
      setImgFile(file);
      const newImgUrl = URL.createObjectURL(file);
      setImgUrl(newImgUrl);
    }
  };

  const uploadFile = async (blogPostId: string) => {
    const formData = new FormData();
    formData.append('media', imgFile, imgFile.name);
    await Rk9Api(POST, `/uploads/${blogPostId}?postType=blogPost`, formData).catch(() =>
      enqueueSnackbar('There was a problem uploading the image file. Please let someone know!', {
        persist: false,
        variant: 'error',
      }),
    );
  };

  const closeDialog = () => {
    if (!blogPost) {
      const newUpdatedBlogPost = {
        title: '',
        date: new Date(),
        post: '',
        image: '',
      };
      setUpdatedBlogPost(newUpdatedBlogPost);
    } else {
      setUpdatedBlogPost(blogPost);
    }
    if (imgFile) {
      setImgFile(null);
    }
    close();
  };

  const saveBlogPost = async () => {
    let savedBlogPost: BlogPost = {} as BlogPost;
    if (!blogPost || !blogPost.id) {
      savedBlogPost = await Rk9Api(POST, '/blogPosts', updatedBlogPost).catch(() =>
        enqueueSnackbar('There was a problem creating the Blog Post. Please let someone know!', {
          persist: false,
          variant: 'error',
        }),
      );
    } else {
      savedBlogPost = await Rk9Api(PUT, `/blogPosts/${blogPost.id}`, updatedBlogPost).catch(() =>
        enqueueSnackbar('There was a problem updating the Blog Post. Please let someone know!', {
          persist: false,
          variant: 'error',
        }),
      );
    }
    if (savedBlogPost.id) {
      enqueueSnackbar('Blog Post was successfully saved!', {
        persist: false,
        variant: 'success',
      });
      if (imgFile) {
        await uploadFile(savedBlogPost.id).catch((error) =>
          LogError(LEVEL_ERROR, error, 'Upload Image'),
        );
      }
    }
    await mutate('/blogPosts');
    closeDialog();
  };

  const deleteBlogPost = async () => {
    if (blogPost) {
      await Rk9Api(DELETE, `/blogPosts/${blogPost.id}`, updatedBlogPost)
        .then(() =>
          enqueueSnackbar('Blog Post was successfully deleted!', {
            persist: false,
            variant: 'success',
          }),
        )
        .catch(() =>
          enqueueSnackbar('There was a problem deleting the Blog Post. Please let someone know!', {
            persist: false,
            variant: 'error',
          }),
        );
    }
    await mutate('/blogPosts');
    closeDialog();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <Box style={{ padding: '30px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>
          {blogPost && blogPost.id ? 'Edit Blog Post' : 'Add New Blog Post'}
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Title"
            placeholder="Title"
            style={{ marginBottom: '20px' }}
            value={updatedBlogPost?.title}
            onChange={(e) => setUpdatedBlogPost({ ...updatedBlogPost, title: e.target.value })}
          />
          <TextField
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Post"
            placeholder="Paste blog text here..."
            multiline
            rows="5"
            style={{ marginBottom: '20px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            value={updatedBlogPost?.post}
            onChange={(e) => setUpdatedBlogPost({ ...updatedBlogPost, post: e.target.value })}
          />
          <label htmlFor="upload-blog-post-image">
            <Input
              accept="image/*"
              id="upload-blog-post-image"
              type="file"
              onChange={(e) => selectFileToUpload(e)}
              name="media"
            />
            <Button variant="contained" component="span" color="inherit">
              Upload Image
            </Button>
          </label>
          {((blogPost && blogPost.id && imgUrl) || imgFile) && (
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
          {blogPost && blogPost.id && (
            <Button variant="contained" onClick={deleteBlogPost} color="error">
              Delete
            </Button>
          )}
          <Box
            style={{
              display: 'flex',
              justifyContent: blogPost && blogPost.id ? 'inherit' : 'space-between',
            }}
          >
            <Button variant="outlined" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              onClick={saveBlogPost}
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

export default AddOrEditBlogPost;
