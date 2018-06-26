import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default instance;
