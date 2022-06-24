/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useContext } from 'react';
import { useAbility } from '@casl/react';
import { SessionContext } from '../context/SessionContext';
import { IS_LOADING, RELOAD_DATA_ON_REFRESH, UPDATE_USER } from '../constants/actions';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { AbilityContext } from '../context/AbilityContext';
import { Role } from '../types/Role';
import updateAbility from '../ability/updateAbility';

const AppDataFetcher: React.FC = ({ children }) => {
  const { user: currentUser, isLoading } = useCurrentUser();
  const {
    state: { user },
    dispatch,
  } = useContext(SessionContext);
  const ability = useAbility(AbilityContext);

  const currentRole = user?.role || currentUser?.role || Role.Guest;

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: IS_LOADING, payload: true });
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      if (currentUser) {
        dispatch({ type: UPDATE_USER, payload: currentUser });
      }
      updateAbility(ability, currentRole);
    }
    dispatch({ type: RELOAD_DATA_ON_REFRESH });
  }, [dispatch, isLoading, currentUser, ability, currentRole]);

  return <>{children}</>;
};

export default AppDataFetcher;
