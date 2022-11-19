/* eslint-disable no-return-assign */
import React, { FC, useEffect, useState } from 'react';
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
import { List as MuiList, ListItem as MuiListItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { KeyedMutator } from 'swr/dist/types';
import { useAbility } from '@casl/react';
import DatePicker from '@mui/lab/DatePicker';
import palette from '../../../../theme/palette';
import Rk9Api from '../../../../dataServices/Rk9Api';
import { DELETE, PUT } from '../../../../constants/requests';
import Loading from '../../../utils/Loading';
import { AbilityContext } from '../../../../context/AbilityContext';
import { JournalPost } from '../../../../types/JournalPost';
import ManageLinksDialog from './ManageLinksDialog';

interface ReadJournalPostProps {
  mutate: KeyedMutator<any[]>;
  journalPost: JournalPost;
  oneOnOneId?: string;
}

export const ReadJournalPost: FC<ReadJournalPostProps> = (props) => {
  const { journalPost, mutate, oneOnOneId } = props;
  const ability = useAbility(AbilityContext);
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = useState(false);
  const [openManageLinks, setOpenManageLinks] = useState(false);
  const [showLoadingEditPostSubmit, setShowLoadingEditPostSubmit] = useState<any>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [journalPostToEdit, setJournalPostToEdit] = useState<JournalPost>({
    title: '',
    date: new Date(),
    oneOnOneUserId: '',
    notes: '',
    workOn: '',
    links: [],
    misc: '',
  });

  useEffect(() => {
    if (journalPost.id) {
      setJournalPostToEdit(journalPost);
    }
  }, [journalPost]);

  const openMorePostActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMorePostActions = () => {
    setAnchorEl(null);
  };

  const openMore = Boolean(anchorEl);

  const cancelEditMode = () => {
    setJournalPostToEdit(journalPost);
    setEditMode(false);
  };

  const submitEditPost = async () => {
    if (oneOnOneId) {
      const editJournalPostToSubmit = { ...journalPostToEdit };
      editJournalPostToSubmit.oneOnOneUserId = oneOnOneId;
      editJournalPostToSubmit.links = editJournalPostToSubmit.links?.filter((link) => link);

      setShowLoadingEditPostSubmit(true);

      await Rk9Api(PUT, `/journalPosts/${journalPost.id}`, editJournalPostToSubmit)
        .then((submittedPost: JournalPost) => {
          enqueueSnackbar('Journal post was successfully edited!', {
            persist: false,
            variant: 'success',
          });
          setJournalPostToEdit(submittedPost);
          setEditMode(false);
        })
        .catch(
          () =>
            enqueueSnackbar(
              'There was a problem editing the journal post. Please let someone know!',
              {
                persist: false,
                variant: 'error',
              },
            ),
          setJournalPostToEdit(journalPost),
        );

      setShowLoadingEditPostSubmit(false);
      await mutate();
    }
  };

  const deletePost = async () => {
    setShowLoadingEditPostSubmit(true);

    await Rk9Api(DELETE, `/journalPosts/${journalPost.id}`)
      .then(() => {
        enqueueSnackbar('Journal post was successfully deleted!', {
          persist: false,
          variant: 'success',
        });
        setEditMode(false);
        setJournalPostToEdit({
          title: '',
          date: new Date(),
          oneOnOneUserId: '',
          notes: '',
          workOn: '',
          misc: '',
        });
        setOpenConfirmDelete(false);
      })
      .catch(
        () =>
          enqueueSnackbar(
            'There was a problem deleting the journal post. Please let someone know!',
            {
              persist: false,
              variant: 'error',
            },
          ),
        setJournalPostToEdit(journalPost),
      );

    setShowLoadingEditPostSubmit(false);
    await mutate();
  };

  const saveLinks = (links: string[]) => {
    if (links && links.length) {
      const newLinks = links.filter((link) => link);
      setJournalPostToEdit({ ...journalPostToEdit, links: newLinks });
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ marginTop: '40px' }}>
            {showLoadingEditPostSubmit && <Loading />}
            <CardContent
              style={{
                pointerEvents: showLoadingEditPostSubmit ? 'none' : 'auto',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {!editMode && (
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 700, color: palette.paper.secondary }}
                  >
                    {dayjs(journalPost.date).format('M/D/YYYY')} - {journalPost.title}
                  </Typography>
                )}
                {ability.can('update', 'All') && ability.can('delete', 'All') && (
                  <Box style={{ marginLeft: 'auto' }}>
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
                        <ListItem
                          button
                          onClick={() => setEditMode(true)}
                          disabled={!ability.can('update', 'All')}
                        >
                          <ListItemIcon>
                            <EditIcon />
                          </ListItemIcon>
                          <ListItemText primary="Edit Journal Post" />
                        </ListItem>
                        <ListItem
                          button
                          style={{ color: palette.text.error }}
                          onClick={() => setOpenConfirmDelete(true)}
                          disabled={!ability.can('delete', 'All')}
                        >
                          <ListItemIcon style={{ color: palette.text.error }}>
                            <RemoveCircleOutlineIcon />
                          </ListItemIcon>
                          <ListItemText primary="Delete Journal Post" />
                        </ListItem>
                      </List>
                    </Popover>
                  </Box>
                )}
              </Box>
              {!editMode && (
                <Box>
                  <Typography variant="h6" style={{ textDecoration: 'underline' }}>
                    Notes:
                  </Typography>
                  <Typography style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {journalPost.notes}
                  </Typography>
                </Box>
              )}
              {!editMode && journalPost.workOn && (
                <Box style={{ marginTop: '20px' }}>
                  <Typography variant="h6" style={{ textDecoration: 'underline' }}>
                    Work On:
                  </Typography>
                  <Typography style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {journalPost.workOn}
                  </Typography>
                </Box>
              )}
              {!editMode && journalPost.misc && (
                <Box style={{ marginTop: '20px' }}>
                  <Typography variant="h6" style={{ textDecoration: 'underline' }}>
                    Misc:
                  </Typography>
                  <Typography style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {journalPost.misc}
                  </Typography>
                </Box>
              )}
              {!editMode && journalPost.links && !!journalPost.links.length && (
                <Box style={{ marginTop: '20px' }}>
                  <Typography variant="h6" style={{ textDecoration: 'underline' }}>
                    Links:
                  </Typography>
                  <MuiList sx={{ listStyleType: 'disc', pl: 4 }}>
                    {journalPost.links.map((link: string) => (
                      <MuiListItem sx={{ display: 'list-item' }}>
                        <a href={link} target="_blank" rel="noreferrer">
                          {link}
                        </a>
                      </MuiListItem>
                    ))}
                  </MuiList>
                </Box>
              )}
              {editMode && (
                <>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <DatePicker
                      label="Date"
                      value={journalPostToEdit.date}
                      onChange={(dateValue) =>
                        setJournalPostToEdit({
                          ...journalPostToEdit,
                          date: dateValue ?? new Date(),
                        })
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          autoFocus
                          fullWidth
                          variant="outlined"
                          style={{ marginRight: '20px' }}
                        />
                      )}
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Title"
                      label="Title"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={journalPostToEdit.title}
                      onChange={(e) =>
                        setJournalPostToEdit({ ...journalPostToEdit, title: e.target.value })
                      }
                    />
                  </Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="More information..."
                    label="Notes"
                    multiline
                    rows="3"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ marginTop: '20px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                    value={journalPostToEdit.notes}
                    onChange={(e) =>
                      setJournalPostToEdit({ ...journalPostToEdit, notes: e.target.value })
                    }
                  />
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Things to work on..."
                      label="Work On"
                      multiline
                      rows="3"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        margin: '20px 20px 0 0',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                      }}
                      value={journalPostToEdit.workOn}
                      onChange={(e) =>
                        setJournalPostToEdit({ ...journalPostToEdit, workOn: e.target.value })
                      }
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="More/misc items..."
                      label="Misc"
                      multiline
                      rows="3"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ marginTop: '20px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                      value={journalPostToEdit.misc}
                      onChange={(e) =>
                        setJournalPostToEdit({ ...journalPostToEdit, misc: e.target.value })
                      }
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    style={{
                      borderColor: palette.button.primary,
                      color: palette.button.primary,
                      marginTop: '20px',
                    }}
                    onClick={() => setOpenManageLinks(true)}
                  >
                    Manage Links
                  </Button>
                </>
              )}
            </CardContent>
            {editMode && (
              <CardActions style={{ padding: '15px' }}>
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
      <ManageLinksDialog
        allLinks={journalPostToEdit.links || ['']}
        open={openManageLinks}
        close={() => setOpenManageLinks(false)}
        saveLinks={saveLinks}
      />
    </>
  );
};

export default ReadJournalPost;
