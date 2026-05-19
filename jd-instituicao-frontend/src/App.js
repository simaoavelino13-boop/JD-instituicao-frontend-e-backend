// Componente principal da aplicação - Gerencia rotas e layout global
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Recruitment from './pages/Recruitment';
import Portfolio from './pages/Portfolio';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Register';
import LoadingSpinner from './components/Common/LoadingSpinner';
import ScrollToTop from './components/Common/ScrollToTop';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin — layout próprio, sem Header/Footer */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Site público */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/recrutamento" element={<Recruitment />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;