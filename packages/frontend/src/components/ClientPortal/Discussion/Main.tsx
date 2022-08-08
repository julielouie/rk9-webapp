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

  const path = `/posts?group=${groupInfo.id}`;
  const { data: allGroupPosts } = useSWR<Post[]>(path, {
    suspense: true,
  });

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: '30px' }}>
        <NewPost groupInfo={groupInfo} updatePath={path} />
        {allGroupPosts &&
          allGroupPosts.length &&
          allGroupPosts.map((post) => <ReadPost key={post.id} post={post} />)}
      </Grid>
    </Grid>
  );
};

export default Main;
