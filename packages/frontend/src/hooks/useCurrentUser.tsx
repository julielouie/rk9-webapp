import useSWR from 'swr';
import { SWRFetcher } from '../dataServices/SWRFetcher';

// placeholder interface, this endpoint still needs to be made
interface IUser {
  id: string;
  name: string;
}

export const useCurrentUser = (): {
  user: IUser;
  isLoading: boolean;
  isError: boolean;
  mutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
} => {
  const { data, error, mutate } = useSWR('/users/me', SWRFetcher, {
    shouldRetryOnError: false,
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
