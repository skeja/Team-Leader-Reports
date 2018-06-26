import Vue from 'vue';
import VueRouter from 'vue-router';

import FindUser from './components/users/FindUsers.vue';
import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import NewUser from './components/users/NewUser.vue';
import UpdateUser from './components/users/UpdateUser.vue';
import User from './components/users/User.vue';
import Users from './components/users/Users.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/',
    component: Home },
  { path: '/users',
    component: Users,
    children: [{
      path: '',
      component: FindUser
    }, {
      path: 'newUser',
      component: NewUser
    }, {
      path: 'updateUser',
      component: UpdateUser
    }, {
      path: ':userId',
      component: User
    }] },
  { path: '/login',
    component: Login,
    meta: { noAuth: true } },
  { path: '*', redirect: '/users' }
];

const router = new VueRouter({ mode: 'history', routes });

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user') || to.meta.noAuth) return next();
  return next('/login');
});

export default router;
