// Serviço de Autenticação - Gerenciamento de sessão e tokens
import api from './api';

export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  const tokenExpiry = localStorage.getItem('auth_token_expiry');
  if (!token || !tokenExpiry) return false;
  return new Date() < new Date(tokenExpiry);
};

export const getToken = () => localStorage.getItem('auth_token');

export const setToken = (token, remember = false) => {
  localStorage.setItem('auth_token', token);
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + (remember ? 30 : 1));
  localStorage.setItem('auth_token_expiry', expiryDate.toISOString());
};

export const removeToken = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_token_expiry');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_role');
};

export const getUserInfo = () => ({
  name: localStorage.getItem('user_name'),
  role: localStorage.getItem('user_role'),
  email: localStorage.getItem('user_email')
});

export const setUserInfo = (user) => {
  if (user.name) localStorage.setItem('user_name', user.name);
  if (user.role) localStorage.setItem('user_role', user.role);
  if (user.email) localStorage.setItem('user_email', user.email);
};

export const login = async (email, password, remember = false) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success && response.data.token) {
      setToken(response.data.token, remember);
      setUserInfo(response.data.user);
      return { success: true, user: response.data.user };
    }
    return { success: false, message: response.data.message || 'Erro ao fazer login' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Erro de conexão' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.success && response.data.token) {
      setToken(response.data.token, false);
      setUserInfo(response.data.user);
      return { success: true, user: response.data.user };
    }
    return { success: false, message: response.data.message || 'Erro ao criar conta' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Erro de conexão' };
  }
};

export const logout = async () => {
  try { await api.post('/auth/logout'); } catch (error) { console.error('Erro no logout:', error); }
  finally { removeToken(); window.location.href = '/'; }
};

export const isAdmin = () => localStorage.getItem('user_role') === 'admin';

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Erro ao solicitar recuperação' };
  }
};

export const resetPassword = async (token, password, passwordConfirmation) => {
  try {
    const response = await api.post('/auth/reset-password', { token, password, password_confirmation: passwordConfirmation });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Erro ao redefinir senha' };
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/profile', userData);
    if (response.data.success) {
      if (response.data.user.name) localStorage.setItem('user_name', response.data.user.name);
      if (response.data.user.email) localStorage.setItem('user_email', response.data.user.email);
      return { success: true, user: response.data.user };
    }
    return { success: false, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Erro ao atualizar perfil' };
  }
};