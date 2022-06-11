import React, { FC, useContext, useState } from 'react';
import { Typography, IconButton, Grid, Box } from '@material-ui/core';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useHistory } from 'react-router-dom';
import palette from '../../theme/palette';
import { SessionContext } from '../../context/SessionContext';
import { BlogPost } from '../../types/BlogPost';
import AddOrEditBlogPost from './AddOrEditBlogPost';

interface BlogPostCardProps {
  blogPost: BlogPost;
}

const BlogPostCard: FC<BlogPostCardProps> = (props) => {
  const { blogPost } = props;
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

  return (
    <>
      <Grid item container md={4} sm={6} xs={12}>
        <Grid item style={{ padding: '50px 50px 0 50px', width: '100%' }}>
          <IconButton
            style={{
              backgroundColor: palette.button.primary,
              color: palette.white,
              position: 'absolute',
            }}
            onClick={() => setOpenAddOrEditDialog(true)}
          >
            <EditIcon />
          </IconButton>
          <Card
            style={{
              boxShadow: 'none',
              borderRadius: 0,
            }}
          >
            {blogPost.image ? (
              <CardMedia
                style={{ borderRadius: '3px' }}
                component="img"
                height="250"
                image={blogPost.image}
                alt={blogPost.title}
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
                variant="h6"
                style={{
                  width: '100%',
                  borderBottom: `5px solid ${palette.paper.secondary}`,
                  paddingBottom: '20px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }}
              >
                {blogPost.title}
              </Typography>
              <Typography>{`${blogPost.post.substring(0, 150)}...`}</Typography>
              <Typography
                variant="subtitle2"
                style={{
                  cursor: 'pointer',
                  display: 'inline-flex',
                  marginTop: '15px',
                  textDecoration: 'underline',
                }}
                onClick={() => history.push(`/blog/${blogPost.id}`)}
              >
                Read More
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AddOrEditBlogPost
        open={openAddOrEditDialog}
        close={() => setOpenAddOrEditDialog(false)}
        blogPost={blogPost}
        updatedBlogPost={updatedBlogPost}
        setUpdatedBlogPost={setUpdatedBlogPost}
      />
    </>
  );
};

export default BlogPostCard;
