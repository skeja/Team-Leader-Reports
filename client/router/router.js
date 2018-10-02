import Vue from 'vue';
import VueRouter from 'vue-router';
import UserStore from '../store';

import User from './user';
import Report from './report';
import Team from './team';
import Auth from './auth';

Vue.use(VueRouter);
const routes = [
  ...Auth,
  ...User,
  ...Report,
  ...Team,
  { path: '*', redirect: { name: 'userIndex' } }
];

const router = new VueRouter({ mode: 'history', routes });

router.beforeEach(({ meta }, from, next) => {
  const { currentUser: { id, role } = {} } = UserStore.state;

  if (!meta.noAuth && !id) return next('/login');
  if (!meta.role || meta.role === role) return next();
  return next('/users');
});

export default router;
