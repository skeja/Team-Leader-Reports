import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '.././components/Home.vue';
import Login from '.././components/auth/Login.vue';

import User from './user';
import Report from './report';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/login',
    component: Login,
    meta: { noAuth: true }
  },
  User,
  Report,
  { path: '*', redirect: '/' }
];

const router = new VueRouter({ mode: 'history', routes });

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user') || to.meta.noAuth) return next();
  return next('/login');
});

export default router;
