import React, { FC, useState } from 'react';
import { Typography, Grid, Card, CardContent, Box, Dialog, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import palette from '../../theme/palette';
import { Post } from '../../types/Post';

interface ReadPostProps {
  post: Post;
}

export const ReadPost: FC<ReadPostProps> = (props) => {
  const { post } = props;
  const [openExpanded, setOpenExpanded] = useState(false);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ marginTop: '40px' }}>
            <CardContent
              style={{
                marginTop: '10px',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
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
              {post.text && <Box style={{ marginTop: '25px' }}>{post.text}</Box>}
              {post.media && (
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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

export default ReadPost;
