import axios from '../axios-auth';

const UserStore = {
  state: {
    currentUser: {
      id: '',
      email: '',
      role: ''
    }
  },
  removeUser() {
    this.state.currentUser = {};
  },
  addUser({ id, email, role }) {
    this.state.currentUser = { id, email, role };
  },
  login(user) {
    return axios.post('/login', user)
      .then(response => {
        if (typeof response.data === 'string') {
          return Promise.reject({ message: response.data });
        }
        localStorage.setItem('user', JSON.stringify(response.data));
        UserStore.addUser(response.data);
      });
  }
};

export default UserStore;

export function init() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.email && !UserStore.state.currentUser.email) UserStore.addUser(user);
}
