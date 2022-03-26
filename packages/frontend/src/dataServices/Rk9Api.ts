/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { GET, POST, PATCH, PUT, DELETE } from '../constants/requests';
import basename from './Basename';

export const BASE_API_URL = `${basename}/api`;

// Creates our endpoint with any queries necessary
export const createQueryEndpointUrl = (
  endpoint: string,
  queries: Record<string, unknown>,
): string => {
  const queriesList: string[] = [];

  if (queries) {
    Object.keys(queries).forEach((queryKey) => {
      const query = queries[queryKey];
      if (query) queriesList.push(`${queryKey}=${query}`);
    });
  }

  if (queriesList.length > 0) {
    return `${endpoint}?${queriesList.join('&')}`;
  }

  return endpoint;
};

const createConfig = (customConfig: any) => {
  const headers = { 'content-type': 'application/json' };

  const config = {
    headers: {
      ...headers,
    },
    ...customConfig,
  };

  if (customConfig) {
    config.headers = {
      ...headers,
      ...customConfig.headers,
    };
  }

  return config;
};

export const Rk9Get = async (
  endpoint?: string,
  customConfig?: Record<string, unknown>,
): Promise<any> => {
  const config = createConfig(customConfig);

  try {
    const response = await axios.get(`${BASE_API_URL}${endpoint}`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};

export const Rk9Post = async (
  endpoint?: string,
  body?: any,
  customConfig?: Record<string, unknown>,
): Promise<any> => {
  const config = createConfig(customConfig);

  try {
    const response = await axios.post(`${BASE_API_URL}${endpoint}`, body, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};

export const Rk9Patch = async (
  endpoint?: string,
  body?: any,
  customConfig?: Record<string, unknown>,
): Promise<any> => {
  const config = createConfig(customConfig);

  try {
    const response = await axios.patch(`${BASE_API_URL}${endpoint}`, body, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};

export const Rk9Put = async (
  endpoint?: string,
  body?: any,
  customConfig?: Record<string, unknown>,
): Promise<any> => {
  const config = createConfig(customConfig);

  try {
    const response = await axios.put(`${BASE_API_URL}${endpoint}`, body, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};

export const Rk9Delete = async (
  endpoint?: string,
  customConfig?: Record<string, unknown>,
): Promise<any> => {
  const config = createConfig(customConfig);

  try {
    const response = await axios.delete(`${BASE_API_URL}${endpoint}`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};

const Rk9Api = (userMethod: string, ...options: any): any => {
  const method = userMethod.toLowerCase();
  switch (method) {
    case GET:
      return Rk9Get(...options);
    case POST:
      return Rk9Post(...options);
    case PATCH:
      return Rk9Patch(...options);
    case PUT:
      return Rk9Put(...options);
    case DELETE:
      return Rk9Delete(...options);
    default:
      throw Error(`Unrecognized HTTP request method ${userMethod}`);
  }
};

export default Rk9Api;
