import React, { FC, useEffect, useMemo, useState } from 'react';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import useSWRInfinite from 'swr/infinite';
import { useSnackbar } from 'notistack';
import { useAbility } from '@casl/react';
import dayjs from 'dayjs';
import palette from '../../../../theme/palette';
import Rk9Api from '../../../../dataServices/Rk9Api';
import { GET } from '../../../../constants/requests';
import { AbilityContext } from '../../../../context/AbilityContext';
import NewJournalPost from './NewJournalPost';
import ReadJournalPost from './ReadJournalPost';
import { JournalPost } from '../../../../types/JournalPost';

interface JournalProps {
  oneOnOneId: string;
}

export const Journal: FC<JournalProps> = (props) => {
  const { oneOnOneId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isFetching, setIsFetching] = useState(false);
  const [usedSessionCount, setUsedSessionCount] = useState(0);
  const [usedSessionsList, setUsedSessionsList] = useState<string[]>([]);
  const ability = useAbility(AbilityContext);

  const path = `/journalPosts?oneOnOne=${oneOnOneId}`;

  const fetchAllOneOnOneJournalPosts = async (url: string) => {
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
    data: allOneOnOneJournalPosts,
    mutate,
    size,
    setSize,
  } = useSWRInfinite((index) => `${path}&page=${index + 1}`, fetchAllOneOnOneJournalPosts, {
    suspense: true,
  });

  const fetchMorePosts = async () => {
    if (allOneOnOneJournalPosts) {
      setIsFetching(true);
      await setSize(size + 1);
    }
  };

  const journalPosts = useMemo(
    () => (allOneOnOneJournalPosts ? [].concat(...allOneOnOneJournalPosts) : []),
    [allOneOnOneJournalPosts],
  );
  const isEmpty = allOneOnOneJournalPosts?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (allOneOnOneJournalPosts &&
      allOneOnOneJournalPosts[allOneOnOneJournalPosts.length - 1]?.length < 5);

  useEffect(() => {
    if (journalPosts && journalPosts.length) {
      const journalPostsDateMap: Record<string, number> = {};
      const filteredJournalPosts = journalPosts.filter((journalPost: JournalPost) => {
        if (journalPost.title.toLowerCase().includes('journal transfer')) return false;
        if (journalPost.date) {
          const readableDate = dayjs(journalPost.date).format('M/D');
          if (readableDate && !journalPostsDateMap[readableDate]) {
            journalPostsDateMap[readableDate] = 1;
            return true;
          }
        }
        return false;
      });

      setUsedSessionCount(filteredJournalPosts.length);
      setUsedSessionsList(Object.keys(journalPostsDateMap));
    }
  }, [journalPosts]);

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
          {!isEmpty && journalPosts && journalPosts.length && ability.can('create', 'All') ? (
            <Box
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                padding: '20px',
                border: `1px solid ${palette.disabled}`,
                borderRadius: '5px',
                marginBottom: '20px',
              }}
            >
              <Box
                style={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                }}
              >
                <Typography style={{ marginRight: '10px' }}>Sessions Used:</Typography>
                <Typography>{usedSessionCount}</Typography>
              </Box>
              <Box>
                {usedSessionsList.map((usedSessionDate: string, usedSessionIndex: number) => (
                  <span>
                    {usedSessionDate}
                    {usedSessionIndex !== usedSessionsList.length - 1 ? ', ' : ''}{' '}
                  </span>
                ))}
              </Box>
            </Box>
          ) : null}
          {ability.can('create', 'All') && (
            <NewJournalPost oneOnOneId={oneOnOneId} mutate={mutate} />
          )}
          {isEmpty && (
            <Typography variant="h5" style={{ marginTop: '30px' }}>
              There are no journal posts!
            </Typography>
          )}
          {!isEmpty && journalPosts && journalPosts.length
            ? journalPosts.map((journalPost: JournalPost) => (
                <ReadJournalPost
                  key={journalPost.id}
                  journalPost={journalPost}
                  oneOnOneId={oneOnOneId}
                  mutate={mutate}
                />
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
              Loading more journal posts...
            </Typography>
          )}
          {isReachingEnd && (
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              There are no more journal posts!
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Journal;
