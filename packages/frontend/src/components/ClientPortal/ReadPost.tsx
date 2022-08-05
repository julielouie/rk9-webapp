import React, { FC } from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import dayjs from 'dayjs';
import palette from '../../theme/palette';
import { Post } from '../../types/Post';

interface ReadPostProps {
  post: Post;
}

export const ReadPost: FC<ReadPostProps> = (props) => {
  const { post } = props;

  return (
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
            {post.media && <img style={{ marginTop: '25px' }} src={post.media} alt="Post Media" />}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ReadPost;
