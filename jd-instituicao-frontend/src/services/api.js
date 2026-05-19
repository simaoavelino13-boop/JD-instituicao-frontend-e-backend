// Serviço de API - Configuração e requisições HTTP
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export const contentService = {
  getContent: (page, section) => api.get(`/content/${page}/${section}`),
  updateContent: (page, section, content) => api.put(`/content/${page}/${section}`, { content })
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  getCurrentUser: () => api.get('/auth/me')
};

export const contactService = {
  sendMessage: (data) => api.post('/contact', data),
  getMessages: (params) => api.get('/admin/contacts', { params })
};

export const blogService = {
  getPosts: (params) => api.get('/blog/posts', { params }),
  getPost: (slug) => api.get(`/blog/posts/${slug}`),
  getCategories: () => api.get('/blog/categories'),
  createPost: (data) => api.post('/admin/blog/posts', data),
  updatePost: (id, data) => api.put(`/admin/blog/posts/${id}`, data),
  deletePost: (id) => api.delete(`/admin/blog/posts/${id}`)
};

export const recruitmentService = {
  getJobs: () => api.get('/jobs'),
  getJob: (id) => api.get(`/jobs/${id}`),
  apply: (jobId, formData) => api.post(`/jobs/${jobId}/apply`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getApplications: (params) => api.get('/admin/applications', { params }),
  updateApplicationStatus: (id, status) => api.put(`/admin/applications/${id}/status`, { status })
};

export const portfolioService = {
  getProjects: () => api.get('/portfolio'),
  getProject: (id) => api.get(`/portfolio/${id}`),
  getTestimonials: () => api.get('/testimonials')
};

export const servicesService = {
  getServices: () => api.get('/services'),
  getService: (id) => api.get(`/services/${id}`)
};

export const teamService = {
  getMembers: () => api.get('/team'),
  getMember: (id) => api.get(`/team/${id}`)
};

export const mediaService = {
  upload: (file) => { const formData = new FormData(); formData.append('file', file); return api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); },
  delete: (id) => api.delete(`/media/${id}`)
};

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getLogs: (params) => api.get('/admin/logs', { params }),
  getStats: () => api.get('/admin/stats')
};

export default api;