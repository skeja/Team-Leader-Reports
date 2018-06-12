import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Users from './components/users/Users.vue';
import User from './components/users/User.vue';
import Login from './components/auth/Login.vue';
import NewUser from './components/users/NewUser.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: Users },
  { path: '/users/:userId', component: User },
  { path: '/login', component: Login, meta: { noAuth: true } },
  { path: '/newUser', component: NewUser },
  { path: '*', redirect: '/users' }
];

const router = new VueRouter({ mode: 'history', routes });

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user') || to.meta.noAuth) return next();
  return next('/login');
});

export default router;
