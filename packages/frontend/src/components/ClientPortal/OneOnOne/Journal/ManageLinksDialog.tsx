/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { cloneDeep } from 'lodash';
import { DialogActions, Typography } from '@mui/material';
import palette from '../../../../theme/palette';

interface AddLinksDialogProps {
  allLinks: string[];
  open: boolean;
  saveLinks: (links: string[]) => void;
  close: () => void;
}

export const AddLinksDialog: FC<AddLinksDialogProps> = (props) => {
  const { allLinks, open, saveLinks, close } = props;
  const [links, setLinks] = useState<string[]>(['']);

  useEffect(() => {
    if (allLinks) {
      if (allLinks.length) {
        setLinks(allLinks);
      } else {
        setLinks(['']);
      }
    }
  }, [allLinks]);

  const addLink = () => {
    const newLinks = cloneDeep(links) || [];
    newLinks.push('');
    setLinks(newLinks);
  };

  const removeLink = (linkIndex: number) => {
    if (linkIndex > 0) {
      const newLinks = cloneDeep(links);
      newLinks.splice(linkIndex, 1);
      setLinks(newLinks);
    }
  };

  const updateLink = (e: React.BaseSyntheticEvent, linkIndex: number) => {
    const newLinks = [...links.slice(0, linkIndex), e.target.value, ...links.slice(linkIndex + 1)];
    setLinks(newLinks);
  };

  const cancel = () => {
    if (allLinks) {
      if (allLinks.length) {
        setLinks(allLinks);
      } else {
        setLinks(['']);
      }
    }
    close();
  };

  return (
    <Dialog maxWidth="md" open={open}>
      <Typography
        variant="h5"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 24px',
        }}
      >
        <span style={{ marginRight: '20px' }}>Manage Links</span>
        <IconButton style={{ display: 'flex', alignSelf: 'end' }} onClick={addLink}>
          <AddIcon />
        </IconButton>
      </Typography>
      <DialogContent
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '10px',
          }}
        >
          {links?.map((link: string, linkIndex: number) => (
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '20px',
              }}
              key={linkIndex}
            >
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Paste link..."
                label="Link"
                multiline
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginRight: '20px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                value={link}
                onChange={(e) => updateLink(e, linkIndex)}
              />
              {linkIndex !== 0 && (
                <IconButton onClick={() => removeLink(linkIndex)}>
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between', padding: '24px' }}>
        <Button
          variant="outlined"
          style={{
            borderColor: palette.button.primary,
            color: palette.button.primary,
          }}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: palette.button.primary,
            color: palette.text.contrast,
          }}
          onClick={() => {
            saveLinks(links);
            close();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLinksDialog;
