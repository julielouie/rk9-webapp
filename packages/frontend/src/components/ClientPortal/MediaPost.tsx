import React, { FC, useState } from 'react';
import { Card, CardContent, Dialog, Box, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { Post } from '../../types/Post';

interface MediaPostProps {
  post: Post;
}

export const MediaPost: FC<MediaPostProps> = (props) => {
  const { post } = props;
  const [openExpanded, setOpenExpanded] = useState(false);

  return (
    <>
      <Card
        variant="outlined"
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          cursor: 'pointer',
          margin: '20px 20px 0 0',
        }}
        onClick={() => setOpenExpanded(true)}
      >
        <CardContent style={{ padding: '15px', maxWidth: '350px' }}>
          {post.media && (
            <div style={{ maxWidth: '400px' }}>
              {post.mediaType === 'photo' && (
                <img alt="post-media" src={post.media} style={{ height: '100%', width: '100%' }} />
              )}
              {post.mediaType === 'video' && (
                <video width="100%">
                  <source src={post.media} />
                  <track default kind="captions" srcLang="en" />
                </video>
              )}
            </div>
          )}
        </CardContent>
      </Card>
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
    </>
  );
};

export default MediaPost;
