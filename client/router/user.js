import FindUser from '.././components/users/FindUsers.vue';
import NewUser from '.././components/users/NewUser.vue';
import UpdateUser from '.././components/users/UpdateUser.vue';
import User from '.././components/users/User.vue';
import Users from '.././components/users/Users.vue';

export default {
  path: '/users',
  component: Users,
  children: [{
    path: '',
    component: FindUser,
    name: 'findUser'
  }, {
    path: 'new',
    component: NewUser,
    name: 'newUser',
    meta: { role: 'ADMIN' }
  }, {
    path: ':userId',
    component: User,
    name: 'user'
  }, {
    path: ':userId/update',
    component: UpdateUser,
    name: 'updateUser',
    meta: { role: 'ADMIN' }
  }]
};
