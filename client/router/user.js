import index from '.././components/users/index';
import Create from '.././components/users/Create';
import Update from '.././components/users/Update';
import User from '.././components/users/User.vue';

export default [
  {
    path: '/users',
    component: index,
    name: 'userIndex'
  }, {
    path: '/users/new',
    component: Create,
    name: 'newUser',
    meta: { role: 'ADMIN' }
  }, {
    path: '/users/:userId',
    component: User,
    name: 'user'
  }, {
    path: '/users/:userId/update',
    component: Update,
    name: 'updateUser',
    meta: { role: 'ADMIN' }
  }];
