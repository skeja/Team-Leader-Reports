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
    component: NewUser
  }, {
    path: 'updateUser',
    component: UpdateUser
  }, {
    path: ':userId',
    component: User
  }]
};
