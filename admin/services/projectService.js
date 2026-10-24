import { apiRequest } from './api';

export const projectService = {
  async getAll() {
    const res = await apiRequest('/projects');
    return res.data || [];
  },

  async getById(id) {
    const res = await apiRequest(`/projects/${id}`);
    return res.data;
  },

  async create(data) {
    const res = await apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async update(id, data) {
    const res = await apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async reorderStack(items) {
    // items: [{ id, stackOrder, isPinned }]
    const res = await apiRequest('/projects/reorder-stack', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    });
    return res.data;
  },

  async delete(id) {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};
