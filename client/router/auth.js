import Login from '../components/auth/Login';
import Profile from '../components/profile/index';
import ResetPassword from '../components/auth/ResetPassword';
import ForgotPassword from '../components/auth/ForgotPassword';
import UserStore from '../store';

export default [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { noAuth: true },
    beforeEnter: (to, from, next) => {
      if (UserStore.isLoggedIn()) return next('/users');
      return next();
    }
  }, {
    path: '/profile',
    component: Profile,
    name: 'profile'
  }, {
    path: '/reset-password',
    component: ResetPassword,
    name: 'resetPassword',
    meta: { noAuth: true }
  }, {
    path: '/forgot-password',
    component: ForgotPassword,
    name: 'forgotPassword',
    meta: { noAuth: true }
  }];
