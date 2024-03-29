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
import { KeyedMutator } from 'swr/dist/types';
import { useAbility } from '@casl/react';
import palette from '../../theme/palette';
import { Post } from '../../types/Post';
import Rk9Api from '../../dataServices/Rk9Api';
import { DELETE, POST, PUT } from '../../constants/requests';
import { LEVEL_ERROR, LogError } from '../../dataServices/Logger';
import { Group } from '../../types/Group';
import { SessionContext } from '../../context/SessionContext';
import Loading from '../utils/Loading';
import { AbilityContext } from '../../context/AbilityContext';

interface ReadPostProps {
  mutate: KeyedMutator<any[]>;
  post: Post;
  groupInfo?: Group;
  oneOnOneId?: string;
}

export const ReadPost: FC<ReadPostProps> = (props) => {
  const { post, mutate, groupInfo, oneOnOneId } = props;
  const {
    state: { user },
  } = useContext(SessionContext);
  const ability = useAbility(AbilityContext);
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
    oneOnOneUserId: '',
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
    if (user) {
      const editPostToSubmit = { ...postToEdit };
      editPostToSubmit.user = { id: user.id, name: user.name };
      editPostToSubmit.group = groupInfo ? { id: groupInfo.id, name: groupInfo.name } : null;
      editPostToSubmit.oneOnOneUserId = oneOnOneId || null;

      setShowLoadingEditPostSubmit(true);

      await Rk9Api(PUT, `/posts/${post.id}`, editPostToSubmit)
        .then(async (submittedPost: Post) => {
          enqueueSnackbar('Post was successfully edited!', {
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
            enqueueSnackbar('There was a problem editing the post. Please let someone know!', {
              persist: false,
              variant: 'error',
            }),
          setPostToEdit(post),
        );

      setMediaFile(null);
      setMediaUrl('');

      setShowLoadingEditPostSubmit(false);
      await mutate();
    }
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
    await mutate();
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
                {(user?.id === post.user.id || ability.can('update', 'All')) && (
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
                        {(ability.can('update', 'All') || user?.id === post.user.id) && (
                          <ListItem
                            button
                            onClick={() => setEditMode(true)}
                            disabled={!ability.can('update', 'Posts')}
                          >
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Edit Post" />
                          </ListItem>
                        )}
                        {(ability.can('update', 'All') || user?.id === post.user.id) && (
                          <ListItem
                            button
                            style={{ color: palette.text.error }}
                            onClick={() => setOpenConfirmDelete(true)}
                            disabled={!ability.can('delete', 'Posts')}
                          >
                            <ListItemIcon style={{ color: palette.text.error }}>
                              <RemoveCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Delete Post" />
                          </ListItem>
                        )}
                      </List>
                    </Popover>
                  </>
                )}
              </Box>
              {!editMode &&
                (post.text ? (
                  <Box style={{ marginTop: '25px', wordWrap: 'break-word' }}>{post.text}</Box>
                ) : (
                  <Box style={{ marginTop: '40px' }} />
                ))}
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
              {editMode && (
                <TextField
                  value={postToEdit.text}
                  fullWidth
                  variant="outlined"
                  placeholder="Edit post..."
                  multiline
                  style={{ marginTop: '20px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  onChange={(e) => setPostToEdit({ ...postToEdit, text: e.target.value })}
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
                      zIndex: 2,
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
          <Typography style={{ fontSize: '2.2rem', fontWeight: 500 }}>Are You Sure?</Typography>
          <Typography style={{ fontSize: '1.5rem' }}>
            This post will be permanently deleted.
          </Typography>
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
