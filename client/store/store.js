import axios from '../axios-auth';

const UserStore = {
  state: {
    currentUser: {
      id: '',
      email: ''
    }
  },
  removeUser() {
    this.state.currentUser = {};
  },
  addUser({ id, email }) {
    this.state.currentUser = { id, email };
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
