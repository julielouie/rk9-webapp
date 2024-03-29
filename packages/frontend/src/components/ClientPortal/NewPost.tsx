/* eslint-disable no-return-assign */
import React, { FC, useContext, useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  IconButton,
  Box,
} from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useSnackbar } from 'notistack';
import { KeyedMutator } from 'swr/dist/types';
import { useAbility } from '@casl/react';
import palette from '../../theme/palette';
import Rk9Api from '../../dataServices/Rk9Api';
import { POST } from '../../constants/requests';
import { Post } from '../../types/Post';
import { Group } from '../../types/Group';
import { SessionContext } from '../../context/SessionContext';
import Loading from '../utils/Loading';
import { AbilityContext } from '../../context/AbilityContext';

interface NewPostProps {
  mutate: KeyedMutator<any[]>;
  groupInfo?: Group;
  oneOnOneId?: string;
  hidePhotoUpload?: boolean;
  hideVideoUpload?: boolean;
}

export const NewPost: FC<NewPostProps> = (props) => {
  const { mutate, groupInfo, oneOnOneId, hidePhotoUpload, hideVideoUpload } = props;
  const [showLoadingPostSubmit, setShowLoadingPostSubmit] = useState<any>(false);
  const [mediaFile, setMediaFile] = useState<any>(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [newPost, setNewPost] = useState<Post>({
    user: { id: '', name: '' },
    date: new Date(),
    group: { id: '', name: '' },
    oneOnOneUserId: '',
    text: '',
    mediaType: null,
  });
  const {
    state: { user },
  } = useContext(SessionContext);
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);

  const clearMedia = () => {
    setMediaFile(null);
    setMediaUrl('');
    setNewPost({ ...newPost, mediaType: null });
  };

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
    if (user) {
      const postToSubmit = { ...newPost };
      postToSubmit.date = new Date();
      postToSubmit.user = { id: user.id, name: user.name };
      postToSubmit.group = groupInfo ? { id: groupInfo.id, name: groupInfo.name } : null;
      postToSubmit.oneOnOneUserId = oneOnOneId || null;

      setShowLoadingPostSubmit(true);

      await Rk9Api(POST, '/posts', postToSubmit)
        .then(async (submittedPost: Post) => {
          enqueueSnackbar('Post was successfully submitted!', {
            persist: false,
            variant: 'success',
          });
          setNewPost({
            user: { id: '', name: '' },
            date: new Date(),
            group: { id: '', name: '' },
            text: '',
            mediaType: null,
          });
          setMediaFile(null);
          setMediaUrl('');

          if (mediaFile && submittedPost.id) {
            await uploadFile(submittedPost.id).catch(() =>
              enqueueSnackbar('There was a problem uploading the file. Please let someone know!', {
                persist: false,
                variant: 'error',
              }),
            );
          }
        })
        .catch(() => {
          enqueueSnackbar('There was a problem submitting the post. Please let someone know!', {
            persist: false,
            variant: 'error',
          });
          clearMedia();
        });

      setShowLoadingPostSubmit(false);
      await mutate();
    }
  };

  return (
    <Grid container>
      {showLoadingPostSubmit && <Loading />}
      <Grid item xs={12} style={{ pointerEvents: showLoadingPostSubmit ? 'none' : 'auto' }}>
        <Card variant="outlined">
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'start',
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
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                width: '100%',
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Start a post..."
                value={newPost.text}
                multiline
                style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
              />
              {(mediaUrl || mediaFile) && (
                <div style={{ marginTop: '15px', maxWidth: '350px' }}>
                  <IconButton
                    style={{
                      height: '15px',
                      width: '15px',
                      backgroundColor: palette.paper.secondary,
                      color: palette.white,
                      position: 'absolute',
                      zIndex: 2,
                    }}
                    onClick={clearMedia}
                  >
                    <CloseIcon />
                  </IconButton>
                  {newPost.mediaType === 'photo' && (
                    <img
                      alt="uploaded-media"
                      src={mediaUrl}
                      style={{ height: '100%', width: '100%' }}
                    />
                  )}
                  {newPost.mediaType === 'video' && (
                    <video width="100%" controls>
                      <source src={mediaUrl} />
                      <track default kind="captions" srcLang="en" />
                    </video>
                  )}
                </div>
              )}
            </Box>
          </CardContent>
          <CardActions style={{ padding: '15px' }}>
            <Box style={{ marginLeft: '70px' }}>
              {!hidePhotoUpload && (
                <Button component="label">
                  <PhotoCameraIcon
                    style={{ color: palette.paper.secondary, marginRight: '10px' }}
                  />{' '}
                  Photo
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      setNewPost({ ...newPost, mediaType: 'photo' });
                      selectFileToUpload(e);
                    }}
                    onClick={(e: React.BaseSyntheticEvent) => (e.target.value = null)}
                    name="media"
                    hidden
                  />
                </Button>
              )}
              {!hideVideoUpload && (
                <Button component="label">
                  <YouTubeIcon style={{ color: palette.paper.highlight, marginRight: '10px' }} />{' '}
                  Video
                  <input
                    accept="video/*"
                    type="file"
                    onChange={(e) => {
                      setNewPost({ ...newPost, mediaType: 'video' });
                      selectFileToUpload(e);
                    }}
                    onClick={(e: React.BaseSyntheticEvent) => (e.target.value = null)}
                    name="media"
                    hidden
                  />
                </Button>
              )}
            </Box>
            <Button
              variant="contained"
              style={{
                marginLeft: 'auto',
                backgroundColor: palette.button.primary,
                color: palette.text.contrast,
              }}
              onClick={submitPost}
              disabled={!ability.can('create', 'Posts')}
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
