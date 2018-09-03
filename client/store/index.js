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
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        UserStore.addUser(data);
      });
  },
  isAdmin() {
    if (this.state.currentUser.role === 'ADMIN') return true;
    return false;
  }
};

export default UserStore;

export function init() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.email && !UserStore.state.currentUser.email) UserStore.addUser(user);
}
