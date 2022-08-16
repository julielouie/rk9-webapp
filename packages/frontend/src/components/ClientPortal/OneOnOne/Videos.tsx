import React, { FC, useState } from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import useSWRInfinite from 'swr/infinite';
import { useSnackbar } from 'notistack';
import { useAbility } from '@casl/react';
import { Post } from '../../../types/Post';
import MediaPost from '../MediaPost';
import Rk9Api from '../../../dataServices/Rk9Api';
import { GET } from '../../../constants/requests';
import palette from '../../../theme/palette';
import { AbilityContext } from '../../../context/AbilityContext';

interface VideosProps {
  oneOnOneId: string;
}

export const Videos: FC<VideosProps> = (props) => {
  const { oneOnOneId } = props;
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);

  const path = `/posts?oneOnOne=${oneOnOneId}&mediaType=video`;

  const fetchAllOneOnOneVideoPosts = async (url: string) => {
    const data = await Rk9Api(GET, url).catch(() =>
      enqueueSnackbar('There was a problem getting the videos. Please let someone know!', {
        persist: false,
        variant: 'error',
      }),
    );

    setIsFetching(false);
    return data;
  };

  const {
    data: allOneOnOneVideoPosts,
    size,
    setSize,
  } = useSWRInfinite((index) => `${path}&page=${index + 1}`, fetchAllOneOnOneVideoPosts, {
    suspense: true,
  });

  const fetchMoreVideos = async () => {
    if (allOneOnOneVideoPosts) {
      setIsFetching(true);
      await setSize(size + 1);
    }
  };

  const videos = allOneOnOneVideoPosts ? [].concat(...allOneOnOneVideoPosts) : [];
  const isEmpty = allOneOnOneVideoPosts?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (allOneOnOneVideoPosts && allOneOnOneVideoPosts[allOneOnOneVideoPosts.length - 1]?.length < 5);

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: '30px' }}>
        {isEmpty && (
          <Typography variant="h5" style={{ marginTop: '30px' }}>
            There are no videos!
          </Typography>
        )}
        {videos && videos.length
          ? videos.map((post: Post) => <MediaPost key={post.id} post={post} />)
          : null}
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '30px' }}>
        <Box style={{ width: '60%', marginTop: '30px', display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: isReachingEnd ? palette.disabled : palette.button.primary,
              color: palette.text.contrast,
              marginRight: '30px',
            }}
            disabled={isFetching || isReachingEnd || !ability.can('read', 'All')}
            onClick={fetchMoreVideos}
          >
            Load More
          </Button>
          {isFetching && (
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              Loading more videos...
            </Typography>
          )}
          {isReachingEnd && (
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              There are no more videos!
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Videos;
