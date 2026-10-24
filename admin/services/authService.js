import { apiRequest } from './api';

export const authService = {
  async login(username, password) {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (res.token) {
      localStorage.setItem('sky_admin_token', res.token);
    }
    return res;
  },

  async verify() {
    return apiRequest('/auth/verify', { method: 'GET' });
  },

  logout() {
    localStorage.removeItem('sky_admin_token');
    window.location.href = '/admin/login';
  },

  getToken() {
    return localStorage.getItem('sky_admin_token');
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('sky_admin_token'));
  },
};
