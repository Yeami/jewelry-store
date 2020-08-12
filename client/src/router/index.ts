import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { isAuthenticated, isNotAuthenticated } from '@/services/auth.service';
import TheBasketPage from '@/views/TheBasketPage.vue';
import TheLoginPage from '@/views/TheLoginPage.vue';
import TheOrdersPage from '@/views/TheOrdersPage.vue';
import TheProductsPage from '@/views/TheProductsPage.vue';
import TheProfilePage from '@/views/TheProfilePage.vue';
import TheRouterView from '@/views/TheRouterView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: TheLoginPage,
    beforeEnter: (to, from, next) => isNotAuthenticated(to, from, next),
  },
  {
    path: '/',
    redirect: '/profile',
  },
  {
    path: '/',
    component: TheRouterView,
    beforeEnter: (to, from, next) => isAuthenticated(to, from, next),
    children: [
      {
        path: 'products',
        name: 'products',
        component: TheProductsPage,
      },
      {
        path: 'basket',
        name: 'basket',
        component: TheBasketPage,
      },
      {
        path: 'profile',
        name: 'profile',
        component: TheProfilePage,
      },
      {
        path: 'orders',
        name: 'orders',
        component: TheOrdersPage,
      },
    ],
  },
  {
    path: '/*',
    redirect: '/profile',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
