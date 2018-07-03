import axios from '../axios-auth';

const UserStore = {
  state: {
    currentUser: {
      email: ''
    }
  },
  removeUser() {
    this.state.currentUser = {};
  },
  addUser({ email }) {
    this.state.currentUser = { email };
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
