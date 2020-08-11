import Vue from 'vue';
import Vuex from 'vuex';

import UserModel from '@/models/user.model';
import router from '@/router';
import { ApiService } from '@/services/api.service';
import { setAuthToken, setUserData } from '@/services/auth.service';
import {
  GET_BRANDS,
  GET_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER,
} from '@/store/actions.type';
import {
  SET_BRANDS, SET_TOKEN, SET_USER, SET_USER_ERROR,
} from '@/store/mutations.type';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    errors: null,
    token: null,
    brands: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    userErrors(state) {
      return state.errors;
    },
    token(state) {
      return state.token;
    },
    brands(state) {
      return state.brands;
    },
  },
  actions: {
    [LOGIN_USER]: (context: any, user: UserModel) => {
      ApiService.post('/login', user)
        .then((response) => {
          setUserData(context, response.data);
          router.push('/profile');
        })
        .catch(({ response }) => {
          context.commit(SET_USER_ERROR, response.data);
        });
    },
    [LOGOUT_USER]: (context: any) => {
      localStorage.removeItem('auth-token');
      setAuthToken();
      context.commit(SET_USER, null);
      context.commit(SET_TOKEN, null);
      router.push('/login');
    },
    [GET_USER]: (context: any, token: string) => {
      ApiService.get('/me')
        .then((response) => {
          context.commit(SET_USER, response.data);
          context.commit(SET_TOKEN, token);
        })
        .catch(({ response }) => {
          context.commit(SET_USER_ERROR, response.data);
        });
    },
    [UPDATE_USER]: (context: any, user: UserModel) => {
      ApiService.patch('/me', user)
        .then((response) => {
          context.commit(SET_USER, response.data);
        })
        .catch(({ response }) => {
          context.commit(SET_USER_ERROR, response.data);
        });
    },
    [GET_BRANDS]: (context: any) => {
      ApiService.get('/brand')
        .then((response) => {
          context.commit(SET_BRANDS, response.data);
        })
        .catch(({ response }) => {
          context.commit(SET_USER_ERROR, response.data);
        });
    },
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
      state.errors = null;
    },
    [SET_USER_ERROR](state, errors) {
      state.errors = errors;
    },
    [SET_TOKEN](state, token) {
      state.token = token;
    },
    [SET_BRANDS](state, brands) {
      state.brands = brands;
    },
  },
});
