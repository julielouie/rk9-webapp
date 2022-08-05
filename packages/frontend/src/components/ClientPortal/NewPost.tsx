import React, { FC, useContext, useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Box,
} from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import { mutate } from 'swr';
import palette from '../../theme/palette';
import Rk9Api from '../../dataServices/Rk9Api';
import { POST } from '../../constants/requests';
import { LEVEL_ERROR, LogError } from '../../dataServices/Logger';
import { Post } from '../../types/Post';
import { Group } from '../../types/Group';
import { SessionContext } from '../../context/SessionContext';

const Input = styled('input')({
  display: 'none',
});

interface NewPostProps {
  groupInfo: Group;
}

export const NewPost: FC<NewPostProps> = (props) => {
  const { groupInfo } = props;
  const [mediaFile, setMediaFile] = useState<any>(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [newPost, setNewPost] = useState<Post>({
    user: { id: '', name: '' },
    date: new Date(),
    group: { id: '', name: '' },
    text: '',
    mediaType: null,
  });
  const {
    state: { user },
  } = useContext(SessionContext);
  const { enqueueSnackbar } = useSnackbar();

  const selectFileToUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    if (file) {
      setMediaFile(file);
      const newMediaUrl = URL.createObjectURL(file);
      setMediaUrl(newMediaUrl);
    }
  };

  const uploadFile = async (postId: string) => {
    const formData = new FormData();
    formData.append('media', mediaFile, mediaFile.name);
    await Rk9Api(POST, `/uploads/${postId}?postType=post`, formData).catch(() =>
      enqueueSnackbar('There was a problem uploading the file. Please let someone know!', {
        persist: false,
        variant: 'error',
      }),
    );
  };

  const submitPost = async () => {
    const postToSubmit = { ...newPost };
    postToSubmit.date = new Date();
    postToSubmit.user = { id: user?.id, name: user?.name || '' };
    postToSubmit.group = { id: groupInfo.id, name: groupInfo.name };

    await Rk9Api(POST, '/posts', postToSubmit)
      .then(async (submittedPost: Post) => {
        enqueueSnackbar('Post was successfully submitted!', {
          persist: false,
          variant: 'success',
        });
        if (mediaFile && submittedPost.id) {
          await uploadFile(submittedPost.id).catch((error) =>
            LogError(LEVEL_ERROR, error, 'Upload Post Media'),
          );
        }
        await mutate('/posts');
        setNewPost({
          user: { id: '', name: '' },
          date: new Date(),
          group: { id: '', name: '' },
          text: '',
          mediaType: null,
        });
      })
      .catch(() =>
        enqueueSnackbar('There was a problem submitting the post. Please let someone know!', {
          persist: false,
          variant: 'error',
        }),
      );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '10px',
              padding: '15px',
            }}
          >
            <Typography
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AccountCircleIcon
                style={{ fontSize: '3rem', color: palette.text.primary, marginRight: '15px' }}
              />
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Start a post..."
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            />
            {(mediaUrl || mediaFile) && (
              <img
                alt="uploadedMedia"
                src={mediaUrl}
                style={{ borderRadius: '3px', marginTop: '20px' }}
              />
            )}
          </CardContent>
          <CardActions style={{ padding: '15px' }}>
            <Box style={{ marginLeft: '70px' }}>
              <Input
                accept="image/*"
                id="upload-new-post-photo"
                type="file"
                onChange={(e) => {
                  setNewPost({ ...newPost, mediaType: 'photo' });
                  selectFileToUpload(e);
                }}
                name="media"
              />
              <Button>
                <PhotoCameraIcon style={{ color: palette.paper.secondary, marginRight: '10px' }} />{' '}
                Photo
              </Button>
              <label htmlFor="upload-new-post-video">
                <Input
                  accept="image/*"
                  id="upload-new-post-video"
                  type="file"
                  onChange={(e) => {
                    setNewPost({ ...newPost, mediaType: 'video' });
                    selectFileToUpload(e);
                  }}
                  name="media"
                />
                <Button>
                  <YouTubeIcon style={{ color: palette.paper.highlight, marginRight: '10px' }} />{' '}
                  Video
                </Button>
              </label>
            </Box>
            <Button
              variant="contained"
              style={{
                marginLeft: 'auto',
                backgroundColor: palette.button.primary,
                color: palette.text.contrast,
              }}
              onClick={submitPost}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NewPost;
