import axios from 'axios';

import router from '@/router';
import store from '@/store';
import { GET_USER } from '@/store/actions.type';
import { SET_ERROR, SET_TOKEN, SET_USER } from '@/store/mutations.type';

export const setAuthInterceptor = () => {
  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('auth-token');
      delete axios.defaults.headers.common.Authorization;

      store.commit(SET_USER, null);
      store.commit(SET_TOKEN, null);

      router.push('/login');
    }
    // else if (error.response.status === 403) {
    //     store.commit(SHOW_FORBIDDEN, true);
    // }
    return Promise.reject(error);
  });
};

export const setAuthToken = (token?: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const setUserData = (context: any, data: any) => {
  const token = `Token ${data.token}`;

  localStorage.setItem('auth-token', token);
  setAuthToken(token);

  context.commit(SET_ERROR, {});
  context.commit(SET_USER, data.user);
  context.commit(SET_TOKEN, token);
};

export const isAuthenticated = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('auth-token');

  if (store.getters.token === null) {
    if (token === null) {
      next('/login');
      return;
    } else if (store.getters.user == null) {
      store.dispatch(GET_USER, token);
      next();
      return;
    }
  } else {
    next();
    return;
  }
};

export const isNotAuthenticated = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('auth-token');

  if (token === null) {
    return next();
  }

  return next('/');
};
