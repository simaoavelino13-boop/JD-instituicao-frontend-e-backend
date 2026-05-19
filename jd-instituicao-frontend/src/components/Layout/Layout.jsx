// Componente Layout - Estrutura base para todas as páginas
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet /> {/* Renderiza o conteúdo específico de cada página */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;