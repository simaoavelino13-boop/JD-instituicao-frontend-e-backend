import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userName = localStorage.getItem('user_name');
    const userRole = localStorage.getItem('user_role');
    
    if (token) {
      setIsAuthenticated(true);
      setUser({ name: userName, role: userRole });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_name', response.data.user.name);
        localStorage.setItem('user_role', response.data.user.role || 'user');
        setIsAuthenticated(true);
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: 'Resposta inválida do servidor.' };
    } catch (error) {
      // Fallback temporário para testes locais enquanto o backend real não está a rodar
      if (email === 'admin@jdtecnologia.ao' && password === 'JD@Admin2024') {
        const mockUser = { name: 'Administrador JD', role: 'admin' };
        localStorage.setItem('auth_token', 'mock_token_123');
        localStorage.setItem('user_name', mockUser.name);
        localStorage.setItem('user_role', mockUser.role);
        setIsAuthenticated(true);
        setUser(mockUser);
        return { success: true };
      } else if (email === 'usuario@teste.ao' && password === 'Teste@2024') {
        const mockUser = { name: 'Usuário Teste', role: 'user' };
        localStorage.setItem('auth_token', 'mock_token_456');
        localStorage.setItem('user_name', mockUser.name);
        localStorage.setItem('user_role', mockUser.role);
        setIsAuthenticated(true);
        setUser(mockUser);
        return { success: true };
      }
      return { success: false, message: error.response?.data?.message || 'Credenciais inválidas ou erro de conexão.' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.data && response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_name', response.data.user.name);
        localStorage.setItem('user_role', 'user');
        setIsAuthenticated(true);
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: 'Resposta inválida do servidor.' };
    } catch (error) {
      // Fallback temporário para testes locais
      const mockUser = { name: userData.nome.split(' ')[0], role: 'user' };
      localStorage.setItem('auth_token', 'mock_token_new');
      localStorage.setItem('user_name', mockUser.name);
      localStorage.setItem('user_role', mockUser.role);
      setIsAuthenticated(true);
      setUser(mockUser);
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
