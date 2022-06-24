import useSWR from 'swr';
import Cookies from 'js-cookie';
import { User } from '../types/User';
import Rk9Api from '../dataServices/Rk9Api';
import { GET } from '../constants/requests';
import { LEVEL_ERROR, LogError } from '../dataServices/Logger';

export const useCurrentUser = (): {
  user: User;
  isLoading: boolean;
  isError: boolean;
  mutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
} => {
  const token = Cookies.get('token');

  const fetchCurrentUser = async (url: string) => {
    let data = null;

    if (token) {
      data = await Rk9Api(GET, url).catch((error: any) =>
        LogError(LEVEL_ERROR, error, 'Get Current User'),
      );
    }

    return data;
  };

  const { data, error, mutate } = useSWR('/users/me', fetchCurrentUser, {
    shouldRetryOnError: false,
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
