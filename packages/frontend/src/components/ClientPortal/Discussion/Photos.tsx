import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import useSWR from 'swr';
import { Post } from '../../../types/Post';
import { Group } from '../../../types/Group';
import MediaPost from '../MediaPost';

interface PhotosProps {
  groupInfo: Group;
}

export const Photos: FC<PhotosProps> = (props) => {
  const { groupInfo } = props;

  const { data: allGroupPosts } = useSWR<Post[]>(`/posts?group=${groupInfo.id}&mediaType=photo`, {
    suspense: true,
  });

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: '30px' }}>
        {allGroupPosts &&
          allGroupPosts.length &&
          allGroupPosts.map((post) => <MediaPost key={post.id} post={post} />)}
      </Grid>
    </Grid>
  );
};

export default Photos;
