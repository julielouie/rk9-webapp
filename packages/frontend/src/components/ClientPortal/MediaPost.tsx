import React, { FC } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Post } from '../../types/Post';

interface MediaPostProps {
  post: Post;
}

export const MediaPost: FC<MediaPostProps> = (props) => {
  const { post } = props;

  return (
    <Card variant="outlined" style={{ cursor: 'pointer', margin: '20px 20px 0 0' }}>
      <CardContent style={{ padding: '15px', maxWidth: '350px' }}>
        {post.media && post.mediaType === 'photo' && (
          <img style={{ height: '100%', width: '100%' }} src={post.media} alt="Post Media" />
        )}
      </CardContent>
    </Card>
  );
};

export default MediaPost;
