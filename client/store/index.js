import axios from '../axios-auth';

const UserStore = {
  state: {
    currentUser: {
      id: '',
      email: '',
      role: '',
      team: ''
    }
  },
  removeUser() {
    this.state.currentUser = {};
  },
  addUser({ id, email, role, team }) {
    this.state.currentUser = { id, email, role, team };
  },
  login(user) {
    return axios.post('/login', user)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        UserStore.addUser(data);
      });
  },
  forgotPassword(email) {
    return axios.post('/forgotPassword', email);
  },
  isLoggedIn() {
    if (this.state.currentUser.id) return true;
    return false;
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
