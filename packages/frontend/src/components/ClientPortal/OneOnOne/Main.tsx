import React, { FC, useState } from 'react';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import useSWRInfinite from 'swr/infinite';
import { useSnackbar } from 'notistack';
import { useAbility } from '@casl/react';
import NewPost from '../NewPost';
import ReadPost from '../ReadPost';
import { Post } from '../../../types/Post';
import palette from '../../../theme/palette';
import Rk9Api from '../../../dataServices/Rk9Api';
import { GET } from '../../../constants/requests';
import { AbilityContext } from '../../../context/AbilityContext';

interface MainProps {
  oneOnOneId: string;
}

export const Main: FC<MainProps> = (props) => {
  const { oneOnOneId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isFetching, setIsFetching] = useState(false);
  const ability = useAbility(AbilityContext);

  const path = `/posts?oneOnOne=${oneOnOneId}`;

  const fetchAllOneOnOnePosts = async (url: string) => {
    const data = await Rk9Api(GET, url).catch(() =>
      enqueueSnackbar('There was a problem getting the posts. Please let someone know!', {
        persist: false,
        variant: 'error',
      }),
    );

    setIsFetching(false);
    return data;
  };

  const {
    data: allOneOnOnePosts,
    mutate,
    size,
    setSize,
  } = useSWRInfinite((index) => `${path}&page=${index + 1}`, fetchAllOneOnOnePosts, {
    suspense: true,
  });

  const fetchMorePosts = async () => {
    if (allOneOnOnePosts) {
      setIsFetching(true);
      await setSize(size + 1);
    }
  };

  const posts = allOneOnOnePosts ? [].concat(...allOneOnOnePosts) : [];
  const isEmpty = allOneOnOnePosts?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (allOneOnOnePosts && allOneOnOnePosts[allOneOnOnePosts.length - 1]?.length < 5);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{
          marginBottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            width: '60%',
          }}
        >
          <NewPost oneOnOneId={oneOnOneId} mutate={mutate} />
          {isEmpty && (
            <Typography variant="h5" style={{ marginTop: '30px' }}>
              There are no posts!
            </Typography>
          )}
          {!isEmpty && posts && posts.length
            ? posts.map((post: Post) => (
                <ReadPost key={post.id} post={post} oneOnOneId={oneOnOneId} mutate={mutate} />
              ))
            : null}
        </Box>
        <Box style={{ width: '60%', marginTop: '30px', display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: isReachingEnd ? palette.disabled : palette.button.primary,
              color: palette.text.contrast,
              marginRight: '30px',
            }}
            disabled={isFetching || isReachingEnd || !ability.can('read', 'All')}
            onClick={fetchMorePosts}
          >
            Load More
          </Button>
          {isFetching && (
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              Loading more posts...
            </Typography>
          )}
          {isReachingEnd && (
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              There are no more posts!
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Main;
