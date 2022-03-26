/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import { IS_LOADING, RELOAD_DATA_ON_REFRESH, UPDATE_USER } from '../constants/actions';
import { useCurrentUser } from '../hooks/useCurrentUser';

const AppDataFetcher: React.FC = (children) => {
  const { user: currentUser, isLoading } = useCurrentUser();
  const { dispatch } = useContext(SessionContext);

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: IS_LOADING, payload: true });
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      if (currentUser) {
        dispatch({ type: UPDATE_USER, payload: currentUser });
      }
    }
    dispatch({ type: RELOAD_DATA_ON_REFRESH });
  }, [dispatch, isLoading, currentUser]);

  return <>{children}</>;
};

export default AppDataFetcher;
