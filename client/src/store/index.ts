import Vue from 'vue';
import Vuex from 'vuex';

import UserModel from '@/models/user.model';
import router from '@/router';
import { ApiService } from '@/services/api.service';
import { setAuthToken, setUserData } from '@/services/auth.service';
import {
  CONFIRM_ORDER,
  GET_BRANDS, GET_CATEGORIES, GET_CUSTOMER_ORDERS, GET_PRODUCTS,
  GET_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER,
} from '@/store/actions.type';
import {
  CLEAR_BASKET,
  SET_BRANDS, SET_CATEGORIES, SET_ERROR, SET_ORDERS,
  SET_PRODUCTS, SET_TOKEN, SET_USER, UPDATE_BASKET,
} from '@/store/mutations.type';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    errors: null,
    token: null,
    brands: null,
    categories: null,
    products: null,
    basket: [] as any,
    basketSum: 0,
    orders: [] as any,
  },
  getters: {
    user(state) {
      return state.user;
    },
    errors(state) {
      return state.errors;
    },
    token(state) {
      return state.token;
    },
    brands(state) {
      return state.brands;
    },
    categories(state) {
      return state.categories;
    },
    products(state) {
      return state.products;
    },
    basket(state) {
      return state.basket;
    },
    basketSum(state) {
      return state.basketSum;
    },
    orders(state) {
      return state.orders;
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
          context.commit(SET_ERROR, response.data);
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
          context.commit(SET_ERROR, response.data);
        });
    },
    [UPDATE_USER]: (context: any, user: UserModel) => {
      ApiService.patch('/me', user)
        .then((response) => {
          context.commit(SET_USER, response.data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    },
    [GET_BRANDS]: (context: any) => {
      ApiService.get('/brand')
        .then((response) => {
          context.commit(SET_BRANDS, response.data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    },
    [GET_CATEGORIES]: (context: any) => {
      ApiService.get('/category')
        .then((response) => {
          context.commit(SET_CATEGORIES, response.data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    },
    [GET_PRODUCTS]: (context: any) => {
      ApiService.get('/product')
        .then((response) => {
          context.commit(SET_PRODUCTS, response.data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    },
    [CONFIRM_ORDER]: (context: any, basket) => {
      ApiService.post('/order', basket)
        .then(() => {
          context.commit(CLEAR_BASKET);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    },
    [GET_CUSTOMER_ORDERS]: (context: any, basket) => {
      ApiService.get('/orders')
        .then((response) => {
          context.commit(SET_ORDERS, response.data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    },
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
      state.errors = null;
    },
    [SET_ERROR](state, errors) {
      state.errors = errors;
    },
    [SET_TOKEN](state, token) {
      state.token = token;
    },
    [SET_BRANDS](state, brands) {
      state.brands = brands;
    },
    [SET_CATEGORIES](state, categories) {
      state.categories = categories;
    },
    [SET_PRODUCTS](state, products) {
      state.products = products;
    },
    [UPDATE_BASKET](state, product) {
      state.basket.push(product);
      state.basketSum += parseFloat(product.price);
    },
    [CLEAR_BASKET](state) {
      state.basket = [];
      state.basketSum = 0;
    },
    [SET_ORDERS](state, orders) {
      state.orders = orders;
    },
  },
});
