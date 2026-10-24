import { apiRequest } from './api';

export const mediaService = {
  async upload(file) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await apiRequest('/media/upload', {
      method: 'POST',
      body: formData,
    });

    return res;
  },
};
