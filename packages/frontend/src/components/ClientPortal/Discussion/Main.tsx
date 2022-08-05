import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import useSWR from 'swr';
import NewPost from '../NewPost';
import ReadPost from '../ReadPost';
import { Post } from '../../../types/Post';
import { Group } from '../../../types/Group';

interface MainProps {
  groupInfo: Group;
}

export const Main: FC<MainProps> = (props) => {
  const { groupInfo } = props;

  const { data: allGroupPosts } = useSWR<Post[]>(`/posts?group=${groupInfo.id}`, {
    suspense: true,
  });

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: '30px' }}>
        <NewPost groupInfo={groupInfo} />
        {allGroupPosts &&
          allGroupPosts.length &&
          allGroupPosts.map((post) => <ReadPost key={post.id} post={post} />)}
      </Grid>
    </Grid>
  );
};

export default Main;
