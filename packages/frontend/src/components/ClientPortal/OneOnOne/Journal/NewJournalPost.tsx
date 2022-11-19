/* eslint-disable no-return-assign */
import React, { FC, useState } from 'react';
import { Grid, Button, Card, CardContent, CardActions, TextField, Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { KeyedMutator } from 'swr/dist/types';
import { useAbility } from '@casl/react';
import DatePicker from '@mui/lab/DatePicker';
import palette from '../../../../theme/palette';
import Rk9Api from '../../../../dataServices/Rk9Api';
import { POST } from '../../../../constants/requests';
import Loading from '../../../utils/Loading';
import { AbilityContext } from '../../../../context/AbilityContext';
import { JournalPost } from '../../../../types/JournalPost';
import ManageLinksDialog from './ManageLinksDialog';

interface NewJournalPostProps {
  mutate: KeyedMutator<any[]>;
  oneOnOneId?: string;
}

export const NewJournalPost: FC<NewJournalPostProps> = (props) => {
  const { mutate, oneOnOneId } = props;
  const [showLoadingPostSubmit, setShowLoadingPostSubmit] = useState<any>(false);
  const [openManageLinks, setOpenManageLinks] = useState(false);
  const [newJournalPost, setNewJournalPost] = useState<JournalPost>({
    title: '',
    date: new Date(),
    oneOnOneUserId: '',
    notes: '',
    workOn: '',
    links: [],
    misc: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);

  const submitPost = async () => {
    if (oneOnOneId) {
      const journalPostToSubmit = { ...newJournalPost };
      journalPostToSubmit.oneOnOneUserId = oneOnOneId;
      journalPostToSubmit.links = journalPostToSubmit.links?.filter((link) => link);

      setShowLoadingPostSubmit(true);

      await Rk9Api(POST, '/journalPosts', journalPostToSubmit)
        .then(() => {
          enqueueSnackbar('Journal post was successfully submitted!', {
            persist: false,
            variant: 'success',
          });
          setNewJournalPost({
            title: '',
            date: new Date(),
            oneOnOneUserId: '',
            notes: '',
            workOn: '',
            misc: '',
          });
        })
        .catch(() => {
          enqueueSnackbar(
            'There was a problem submitting the journal post. Please let someone know!',
            {
              persist: false,
              variant: 'error',
            },
          );
        });

      setShowLoadingPostSubmit(false);
      await mutate();
    }
  };

  const saveLinks = (links: string[]) => {
    if (links && links.length) {
      const newLinks = links.filter((link) => link);
      setNewJournalPost({ ...newJournalPost, links: newLinks });
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
              flexDirection: 'column',
              marginTop: '10px',
              padding: '15px',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <DatePicker
                label="Date"
                value={newJournalPost.date}
                onChange={(dateValue) =>
                  setNewJournalPost({ ...newJournalPost, date: dateValue ?? new Date() })
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
                value={newJournalPost.title}
                onChange={(e) => setNewJournalPost({ ...newJournalPost, title: e.target.value })}
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
              value={newJournalPost.notes}
              onChange={(e) => setNewJournalPost({ ...newJournalPost, notes: e.target.value })}
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
                style={{ margin: '20px 20px 0 0', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                value={newJournalPost.workOn}
                onChange={(e) => setNewJournalPost({ ...newJournalPost, workOn: e.target.value })}
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
                value={newJournalPost.misc}
                onChange={(e) => setNewJournalPost({ ...newJournalPost, misc: e.target.value })}
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
          </CardContent>
          <CardActions style={{ padding: '15px' }}>
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
      <ManageLinksDialog
        allLinks={newJournalPost.links || ['']}
        open={openManageLinks}
        close={() => setOpenManageLinks(false)}
        saveLinks={saveLinks}
      />
    </Grid>
  );
};

export default NewJournalPost;
