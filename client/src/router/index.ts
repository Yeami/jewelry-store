import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { isAuthenticated, isNotAuthenticated } from '@/services/auth.service';
import TheLoginPage from '@/views/TheLoginPage.vue';
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
        path: 'profile',
        name: 'profile',
        component: TheProfilePage,
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
