import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import palette from '../../theme/palette';
import { BlogPost } from '../../types/BlogPost';

interface ReadBlogPostProps {
  blogPost: BlogPost;
}

export const ReadBlogPost: FC<ReadBlogPostProps> = (props) => {
  const { blogPost } = props;

  return (
    <Box>
      <Box style={{ padding: '30px' }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: `5px solid ${palette.paper.secondary}`,
          }}
        >
          <Typography variant="h4">{blogPost.title}</Typography>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <img alt={blogPost.title} src={blogPost.image || ''} style={{ borderRadius: '3px' }} />
        </Box>
        <Typography style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          {blogPost.post}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReadBlogPost;
