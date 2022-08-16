import React, { FC, useState } from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import useSWRInfinite from 'swr/infinite';
import { useSnackbar } from 'notistack';
import { useAbility } from '@casl/react';
import { Post } from '../../../types/Post';
import { Group } from '../../../types/Group';
import MediaPost from '../MediaPost';
import Rk9Api from '../../../dataServices/Rk9Api';
import { GET } from '../../../constants/requests';
import palette from '../../../theme/palette';
import { AbilityContext } from '../../../context/AbilityContext';

interface PhotosProps {
  groupInfo: Group;
}

export const Photos: FC<PhotosProps> = (props) => {
  const { groupInfo } = props;
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);

  const path = `/posts?group=${groupInfo.id}&mediaType=photo`;

  const fetchAllGroupPhotoPosts = async (url: string) => {
    const data = await Rk9Api(GET, url).catch(() =>
      enqueueSnackbar('There was a problem getting the photos. Please let someone know!', {
        persist: false,
        variant: 'error',
      }),
    );

    setIsFetching(false);
    return data;
  };

  const {
    data: allGroupPhotoPosts,
    size,
    setSize,
  } = useSWRInfinite((index) => `${path}&page=${index + 1}`, fetchAllGroupPhotoPosts, {
    suspense: true,
  });

  const fetchMorePhotos = async () => {
    if (allGroupPhotoPosts) {
      setIsFetching(true);
      await setSize(size + 1);
    }
  };

  const photos = allGroupPhotoPosts ? [].concat(...allGroupPhotoPosts) : [];
  const isEmpty = allGroupPhotoPosts?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (allGroupPhotoPosts && allGroupPhotoPosts[allGroupPhotoPosts.length - 1]?.length < 5);

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: '30px' }}>
        {isEmpty && (
          <Typography variant="h5" style={{ marginTop: '30px' }}>
            There are no photos!
          </Typography>
        )}
        {photos && photos.length
          ? photos.map((post: Post) => <MediaPost key={post.id} post={post} />)
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
            onClick={fetchMorePhotos}
          >
            Load More
          </Button>
          {isFetching && (
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              Loading more photos...
            </Typography>
          )}
          {isReachingEnd && (
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              There are no more photos!
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Photos;
