// Ponto de entrada principal da aplicação React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

// Criação da raiz da aplicação com suporte para React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderização da aplicação com Router para navegação entre páginas
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);