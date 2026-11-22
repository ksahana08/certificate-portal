import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000/api`
});

api.interceptors.request.use(cfg => {
  const u = JSON.parse(localStorage.getItem('user') || 'null');
  if (u) cfg.headers.Authorization = `Bearer ${u.token}`;
  return cfg;
});

export default api;