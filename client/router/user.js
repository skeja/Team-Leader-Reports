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
    component: FindUser
  }, {
    path: 'newUser',
    component: NewUser,
    meta: { role: 'ADMIN' }
  }, {
    path: 'updateUser',
    component: UpdateUser,
    meta: { role: 'ADMIN' }
  }, {
    path: ':userId',
    component: User
  }]
};
