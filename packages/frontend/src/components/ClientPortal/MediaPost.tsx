import React, { FC } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Post } from '../../types/Post';

interface MediaPostProps {
  post: Post;
}

export const MediaPost: FC<MediaPostProps> = (props) => {
  const { post } = props;

  return (
    <Card
      variant="outlined"
      style={{
        display: 'inline-block',
        verticalAlign: 'top',
        cursor: 'pointer',
        margin: '20px 20px 0 0',
      }}
    >
      <CardContent style={{ padding: '15px', maxWidth: '350px' }}>
        {post.media && (
          <div style={{ maxWidth: '400px' }}>
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
      </CardContent>
    </Card>
  );
};

export default MediaPost;
