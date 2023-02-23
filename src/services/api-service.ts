import axios from 'axios';

import router from '../router';
import { ROUTE_NAMES } from '@/constants/route-names-constants';

import { refresh } from '@/api/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((request)=> {
  if (request.headers) {
    const storageToken = request.url === '/auth/refresh' ? localStorage.getItem('refreshToken') : localStorage.getItem('accessToken');
    request.headers.Authorization = `Bearer ${storageToken}` || null;
  }
  return request;
})

api.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.config.url === '/auth/refresh'
    ) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push({ name: ROUTE_NAMES.LOGIN });
      return Promise.reject(error);
    } else if (error.response && error.response.status === 401) {
      const { accessToken } = await refresh();
      localStorage.setItem('accessToken', accessToken);
      return axios({
        ...error.config,
        headers: {
          Authorization: `Bearer ${accessToken}` || null,
        },
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
