import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import palette from '../../theme/palette';
import { BlogPost } from '../../types/BlogPost';

export const SingleBlogPost: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: blogPost } = useSWR<BlogPost>(`/blogPosts/${id}`, { suspense: true });

  const value = `Lorem ipsum dolor sit amet\nconsectetur adipiscing elit.`;

  return (
    <Grid container>
      <Grid
        item
        md={12}
        style={{
          margin: '120px 0 50px 0',
          height: '50vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img alt={blogPost?.title} src={blogPost?.image || ''} style={{ borderRadius: '3px' }} />
      </Grid>
      <Grid item container style={{ padding: '50px' }}>
        <Grid item md={12}>
          <Typography
            variant="h3"
            style={{ fontWeight: 'bold', color: palette.paper.secondary, marginBottom: '20px' }}
          >
            {blogPost?.title}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {blogPost?.post}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleBlogPost;
