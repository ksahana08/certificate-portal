import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(cfg => {
  const u = JSON.parse(localStorage.getItem('user') || 'null');
  if (u) cfg.headers.Authorization = `Bearer ${u.token}`;
  return cfg;
});

export default api;