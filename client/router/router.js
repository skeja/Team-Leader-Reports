import Vue from 'vue';
import VueRouter from 'vue-router';
import UserStore from '../store';

import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';

import User from './user';
import Report from './report';
import Team from './team';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  }, {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { noAuth: true }
  },
  User,
  Report,
  Team,
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
