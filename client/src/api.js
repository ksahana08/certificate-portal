import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 90000
});

api.interceptors.request.use(cfg => {
  const u = JSON.parse(localStorage.getItem('user') || 'null');
  if (u) cfg.headers.Authorization = `Bearer ${u.token}`;
  return cfg;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const cfg = err.config;
    const serverAsleep = !err.response || [502, 503, 504].includes(err.response.status);
    cfg.retryCount = cfg.retryCount || 0;
    if (serverAsleep && cfg.retryCount < 4) {
      cfg.retryCount += 1;
      await new Promise(r => setTimeout(r, 8000));
      return api(cfg);
    }
    return Promise.reject(err);
  }
);

export default api;