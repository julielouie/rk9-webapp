import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import useSWR from 'swr';
import { useHistory, useParams } from 'react-router-dom';
import palette from '../../theme/palette';
import { BlogPost } from '../../types/BlogPost';

export const SingleBlogPost: FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const { data: blogPost } = useSWR<BlogPost>(`/blogPosts/${id}`, { suspense: true });

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
        <Grid item md={12}>
          <Typography
            variant="h6"
            style={{
              display: 'inline-flex',
              textDecoration: 'underline',
              fontWeight: 'bold',
              color: palette.paper.secondary,
              marginTop: '70px',
              cursor: 'pointer',
            }}
            onClick={() => history.push('/blog')}
          >
            BACK TO ALL BLOG POSTS
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleBlogPost;
