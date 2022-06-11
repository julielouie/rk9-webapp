import React, { FC, useState, useContext } from 'react';
import { Typography, Grid, Button, Box, IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';
import palette from '../../theme/palette';
import { SessionContext } from '../../context/SessionContext';
import { BlogPost } from '../../types/BlogPost';
import AddOrEditBlogPost from './AddOrEditBlogPost';
import BlogPostCard from './BlogPostCard';

export const Blog: FC = () => {
  const [openAddOrEditDialog, setOpenAddOrEditDialog] = useState(false);
  const [updatedBlogPost, setUpdatedBlogPost] = useState<BlogPost>({
    title: '',
    date: new Date(),
    post: '',
    image: '',
  });
  const {
    state: { user },
  } = useContext(SessionContext);
  const history = useHistory();

  const { data: blogPosts } = useSWR<BlogPost[]>('/blogPosts', { suspense: true });

  return (
    <>
      <Grid container>
        <Grid
          item
          container
          style={{
            marginTop: '30px',
            padding: '50px 50px 0 50px',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            style={{ backgroundColor: palette.button.primary, color: palette.white }}
            onClick={() => {
              setUpdatedBlogPost({
                title: '',
                date: new Date(),
                post: '',
                image: '',
              });
              setOpenAddOrEditDialog(true);
            }}
          >
            Add Blog Post
          </Button>
        </Grid>
        <Grid
          item
          container
          style={{
            marginTop: '50px',
            display: 'flex',
            justifyContent: 'center',
            padding: '0 50px',
          }}
        >
          {blogPosts && blogPosts.length && blogPosts[0] ? (
            <Grid item>
              <IconButton
                style={{
                  backgroundColor: palette.button.primary,
                  color: palette.white,
                  position: 'absolute',
                }}
                onClick={() => {
                  setUpdatedBlogPost(blogPosts[0]);
                  setOpenAddOrEditDialog(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <Card
                style={{
                  boxShadow: 'none',
                  width: '100%',
                  borderRadius: 0,
                }}
              >
                {blogPosts[0].image ? (
                  <CardMedia
                    style={{ borderRadius: '3px' }}
                    component="img"
                    height="450"
                    image={blogPosts[0].image}
                    alt={blogPosts[0].title}
                  />
                ) : (
                  <Box
                    style={{
                      width: '100%',
                      height: '250px',
                      backgroundColor: palette.disabled,
                      color: palette.white,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '3px',
                    }}
                  >
                    <ImageNotSupportedIcon style={{ fontSize: '4rem' }} /> <span>No Photo</span>
                  </Box>
                )}
                <CardContent style={{ width: '100%', padding: '20px 0' }}>
                  <Typography
                    variant="h5"
                    style={{
                      width: '100%',
                      borderBottom: `5px solid ${palette.paper.secondary}`,
                      paddingBottom: '20px',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                    }}
                  >
                    {blogPosts[0].title}
                  </Typography>
                  <Typography>{`${blogPosts[0].post.substring(0, 450)}...`}</Typography>
                  <Typography
                    variant="subtitle2"
                    style={{
                      cursor: 'pointer',
                      display: 'inline-flex',
                      marginTop: '15px',
                      textDecoration: 'underline',
                    }}
                    onClick={() => history.push(`/blog/${blogPosts[0].id}`)}
                  >
                    Read More
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Typography variant="h5">No Blog Posts</Typography>
          )}
        </Grid>
      </Grid>
      <Grid item container style={{ paddingBottom: '50px', display: 'flex' }}>
        {blogPosts &&
          blogPosts.map((blogPost, blogPostIndex) => {
            if (blogPostIndex === 0) return;
            return <BlogPostCard key={blogPost.id} blogPost={blogPost} />;
          })}
      </Grid>
      <AddOrEditBlogPost
        open={openAddOrEditDialog}
        close={() => setOpenAddOrEditDialog(false)}
        blogPost={updatedBlogPost}
        updatedBlogPost={updatedBlogPost}
        setUpdatedBlogPost={setUpdatedBlogPost}
      />
    </>
  );
};

export default Blog;
