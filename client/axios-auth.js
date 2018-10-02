import axios from 'axios';

const BASE_URL = '/api';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default instance;
