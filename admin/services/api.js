const API_BASE = '/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('sky_admin_token');

  const headers = {
    ...(options.headers || {}),
  };

  // Only set Content-Type to application/json if not sending FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // If not on login page, remove expired token and notify
    if (!window.location.pathname.includes('/admin/login')) {
      localStorage.removeItem('sky_admin_token');
      window.location.href = '/admin/login';
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}
