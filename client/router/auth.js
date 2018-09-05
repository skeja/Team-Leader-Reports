import Login from '../components/auth/Login';
import Profile from '../components/profile/index';
import ResetPassword from '../components/auth/ResetPassword';
import ForgotPassword from '../components/auth/ForgotPassword';

export default [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { noAuth: true }
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
