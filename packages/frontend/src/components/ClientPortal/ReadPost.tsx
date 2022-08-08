/* eslint-disable no-return-assign */
import React, { FC, useContext, useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  Dialog,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  DialogTitle,
} from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import YouTubeIcon from '@mui/icons-material/YouTube';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { mutate } from 'swr';
import palette from '../../theme/palette';
import { Post } from '../../types/Post';
import Rk9Api from '../../dataServices/Rk9Api';
import { DELETE, POST, PUT } from '../../constants/requests';
import { LEVEL_ERROR, LogError } from '../../dataServices/Logger';
import { Group } from '../../types/Group';
import { SessionContext } from '../../context/SessionContext';
import Loading from '../utils/Loading';

interface ReadPostProps {
  post: Post;
  groupInfo: Group;
  updatePath: string;
}

export const ReadPost: FC<ReadPostProps> = (props) => {
  const { post, groupInfo, updatePath } = props;
  const {
    state: { user },
  } = useContext(SessionContext);
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = useState(false);
  const [showLoadingEditPostSubmit, setShowLoadingEditPostSubmit] = useState<any>(false);
  const [openExpanded, setOpenExpanded] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [mediaFile, setMediaFile] = useState<any>(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [postToEdit, setPostToEdit] = useState<Post>({
    user: { id: '', name: '' },
    date: new Date(),
    group: { id: '', name: '' },
    text: '',
    mediaType: null,
  });

  useEffect(() => {
    if (post.id) {
      setPostToEdit(post);
    }
  }, [post]);

  const openMorePostActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMorePostActions = () => {
    setAnchorEl(null);
  };

  const openMore = Boolean(anchorEl);

  const cancelEditMode = () => {
    setMediaFile(null);
    setMediaUrl('');
    setPostToEdit(post);
    setEditMode(false);
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

  const submitEditPost = async () => {
    const editPostToSubmit = { ...postToEdit };
    editPostToSubmit.user = { id: user?.id, name: user?.name || '' };
    editPostToSubmit.group = { id: groupInfo.id, name: groupInfo.name };

    setShowLoadingEditPostSubmit(true);

    await Rk9Api(PUT, `/posts/${post.id}`, editPostToSubmit)
      .then(async (submittedPost: Post) => {
        enqueueSnackbar('Post was successfully editted!', {
          persist: false,
          variant: 'success',
        });
        if (mediaFile && submittedPost.id) {
          await uploadFile(submittedPost.id).catch((error) =>
            LogError(LEVEL_ERROR, error, 'Upload Post Media'),
          );
        }
        setPostToEdit(submittedPost);
        setEditMode(false);
      })
      .catch(
        () =>
          enqueueSnackbar('There was a problem editting the post. Please let someone know!', {
            persist: false,
            variant: 'error',
          }),
        setPostToEdit(post),
      );

    setMediaFile(null);
    setMediaUrl('');

    setShowLoadingEditPostSubmit(false);
    await mutate(updatePath);
  };

  const deletePost = async () => {
    setShowLoadingEditPostSubmit(true);

    await Rk9Api(DELETE, `/posts/${post.id}`)
      .then(() => {
        enqueueSnackbar('Post was successfully deleted!', {
          persist: false,
          variant: 'success',
        });
        setEditMode(false);
        setPostToEdit({
          user: { id: '', name: '' },
          date: new Date(),
          group: { id: '', name: '' },
          text: '',
          mediaType: null,
        });
        setOpenConfirmDelete(false);
      })
      .catch(
        () =>
          enqueueSnackbar('There was a problem deleting the post. Please let someone know!', {
            persist: false,
            variant: 'error',
          }),
        setPostToEdit(post),
      );

    setMediaFile(null);
    setMediaUrl('');

    setShowLoadingEditPostSubmit(false);
    await mutate(updatePath);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ marginTop: '40px' }}>
            {showLoadingEditPostSubmit && <Loading />}
            <CardContent
              style={{
                marginTop: '10px',
                pointerEvents: showLoadingEditPostSubmit ? 'none' : 'auto',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
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
                  <Typography style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{post.user.name}</span>
                    <span>{dayjs(post.date).format('MMM D, YYYY - h:mma')}</span>
                  </Typography>
                </Box>
                {(user?.id === post.user.id || user?.role === 'admin') && (
                  <>
                    <IconButton onClick={openMorePostActions}>
                      <MoreHorizIcon />
                    </IconButton>
                    <Popover
                      open={openMore}
                      anchorEl={anchorEl}
                      onClose={closeMorePostActions}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <List>
                        <ListItem button onClick={() => setEditMode(true)}>
                          <ListItemIcon>
                            <EditIcon />
                          </ListItemIcon>
                          <ListItemText primary="Edit Post" />
                        </ListItem>
                        <ListItem
                          button
                          style={{ color: palette.text.error }}
                          onClick={() => setOpenConfirmDelete(true)}
                        >
                          <ListItemIcon style={{ color: palette.text.error }}>
                            <RemoveCircleOutlineIcon />
                          </ListItemIcon>
                          <ListItemText primary="Delete Post" />
                        </ListItem>
                      </List>
                    </Popover>
                  </>
                )}
              </Box>
              {!editMode && post.text && <Box style={{ marginTop: '25px' }}>{post.text}</Box>}
              {!editMode && post.media && (
                <Card
                  variant="outlined"
                  style={{
                    display: 'inline-block',
                    border: 'none',
                    verticalAlign: 'top',
                    cursor: 'pointer',
                    margin: '20px 20px 0 0',
                    padding: 0,
                  }}
                  onClick={() => setOpenExpanded(true)}
                >
                  <CardContent
                    style={{
                      maxWidth: '400px',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {post.mediaType === 'photo' && (
                      <img
                        alt="post-media"
                        src={post.media}
                        style={{ borderRadius: '5px', height: '100%', width: '100%' }}
                      />
                    )}
                    {post.mediaType === 'video' && (
                      <video width="100%" style={{ borderRadius: '5px' }}>
                        <source src={post.media} />
                        <track default kind="captions" srcLang="en" />
                      </video>
                    )}
                  </CardContent>
                </Card>
              )}
              {editMode && postToEdit.text && (
                <TextField
                  value={postToEdit.text}
                  fullWidth
                  variant="outlined"
                  placeholder="Edit post..."
                  onChange={(e) => setPostToEdit({ ...postToEdit, text: e.target.value })}
                  style={{ marginTop: '20px' }}
                />
              )}
              {editMode && (postToEdit.media || mediaUrl) && (
                <div style={{ marginTop: '15px', maxWidth: '350px' }}>
                  <IconButton
                    style={{
                      height: '15px',
                      width: '15px',
                      backgroundColor: palette.paper.secondary,
                      color: palette.white,
                      position: 'absolute',
                      zIndex: 99999,
                    }}
                    onClick={() => {
                      setMediaFile(null);
                      setMediaUrl('');
                      setPostToEdit({ ...postToEdit, media: '', mediaType: null });
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  {postToEdit.mediaType === 'photo' && (
                    <img
                      alt="uploaded-media"
                      src={postToEdit.media || mediaUrl}
                      style={{ height: '100%', width: '100%', borderRadius: '5px' }}
                    />
                  )}
                  {postToEdit.mediaType === 'video' && (
                    <video width="100%" style={{ borderRadius: '5px' }}>
                      <source src={postToEdit.media || mediaUrl} />
                      <track default kind="captions" srcLang="en" />
                    </video>
                  )}
                </div>
              )}
            </CardContent>
            {editMode && (
              <CardActions style={{ padding: '15px' }}>
                <Box>
                  <Button component="label">
                    <PhotoCameraIcon
                      style={{ color: palette.paper.secondary, marginRight: '10px' }}
                    />{' '}
                    Photo
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        setPostToEdit({ ...postToEdit, mediaType: 'photo' });
                        selectFileToUpload(e);
                      }}
                      onClick={(e: React.BaseSyntheticEvent) => (e.target.value = null)}
                      name="media"
                      hidden
                    />
                  </Button>
                  <Button component="label">
                    <YouTubeIcon style={{ color: palette.paper.highlight, marginRight: '10px' }} />{' '}
                    Video
                    <input
                      accept="video/*"
                      type="file"
                      onChange={(e) => {
                        setPostToEdit({ ...postToEdit, mediaType: 'video' });
                        selectFileToUpload(e);
                      }}
                      onClick={(e: React.BaseSyntheticEvent) => (e.target.value = null)}
                      name="media"
                      hidden
                    />
                  </Button>
                </Box>
                <Box style={{ marginLeft: 'auto' }}>
                  <Button
                    variant="outlined"
                    style={{
                      marginRight: '15px',
                      borderColor: palette.button.primary,
                      color: palette.button.primary,
                    }}
                    onClick={cancelEditMode}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: palette.button.primary,
                      color: palette.text.contrast,
                    }}
                    onClick={submitEditPost}
                  >
                    Submit
                  </Button>
                </Box>
              </CardActions>
            )}
          </Card>
        </Grid>
      </Grid>
      {!editMode && (
        <Dialog
          open={openExpanded}
          onClose={() => setOpenExpanded(false)}
          fullWidth
          maxWidth="xl"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              paddingTop: '15px',
            }}
          >
            <IconButton onClick={() => setOpenExpanded(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {post.media && (
            <div
              style={{
                maxWidth: '50vw',
                padding: '15px',
              }}
            >
              {post.mediaType === 'photo' && (
                <img alt="post-media" src={post.media} style={{ height: '100%', width: '100%' }} />
              )}
              {post.mediaType === 'video' && (
                <video width="100%" controls>
                  <source src={post.media} />
                  <track default kind="captions" srcLang="en" />
                </video>
              )}
            </div>
          )}
        </Dialog>
      )}
      <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
        <DialogTitle style={{ textAlign: 'center' }}>
          <Typography variant="h4">Are You Sure?</Typography>
          <Typography variant="h5">This post will be permanently deleted.</Typography>
        </DialogTitle>
        <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
          <Button
            variant="outlined"
            style={{
              marginRight: '15px',
              borderColor: palette.button.primary,
              color: palette.button.primary,
            }}
            onClick={() => setOpenConfirmDelete(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: palette.text.error,
              color: palette.text.contrast,
            }}
            onClick={deletePost}
          >
            Delete
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default ReadPost;
