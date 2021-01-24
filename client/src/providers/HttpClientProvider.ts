import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';
const BASE_URL = 'http://0.0.0.0:8082/api/v1';

const getUrl = (url: string): string => `${BASE_URL}${url}`;

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

const getHeaders = () => {
    const cookie = new Cookies();

    const token = cookie.get('access_token');

    return token
        ? {
              ...DEFAULT_HEADERS,
              Authorization: `Bearer ${token}`,
          }
        : DEFAULT_HEADERS;
};

export const HttpClientProvider = {
    post: async (url: string, data: any, options?: AxiosRequestConfig) => {
        return axios.post(getUrl(url), data, {
            ...options,
            headers: getHeaders(),
        });
    },
    get: async (url: string, options?: AxiosRequestConfig) => {
        return axios.get(getUrl(url), {
            ...options,
            headers: getHeaders(),
        });
    },
    put: async (url: string, data?: any, options?: AxiosRequestConfig) => {
        return axios.put(getUrl(url), data, {
            ...options,
            headers: getHeaders(),
        });
    },
    delete: async (url: string, options?: AxiosRequestConfig) => {
        return axios.delete(getUrl(url), {
            ...options,
            headers: getHeaders(),
        });
    },
};
