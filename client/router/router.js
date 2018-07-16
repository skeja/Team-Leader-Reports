import Vue from 'vue';
import VueRouter from 'vue-router';
import UserStore from '../store';

import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';

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

router.beforeEach(({ meta }, from, next) => {
  const { currentUser: { id, role } = {} } = UserStore.state;

  if (!meta.noAuth && !id) return next('/login');
  if (!meta.role || meta.role === role) return next();
  return next('/');
});

export default router;
