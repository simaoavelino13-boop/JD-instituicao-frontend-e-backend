// Componente Header - Navegação principal da aplicação
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Links de navegação do site (para Angola - AO) - incluindo Galeria
  const navLinks = [
    { path: '/', label: 'Início', icon: 'ri-home-line' },
    { path: '/sobre', label: 'Sobre', icon: 'ri-information-line' },
    { path: '/servicos', label: 'Serviços', icon: 'ri-service-line' },
    { path: '/portfolio', label: 'Portfólio', icon: 'ri-briefcase-line' },
    { path: '/galeria', label: 'Galeria', icon: 'ri-image-line' },
    { path: '/blog', label: 'Blog', icon: 'ri-article-line' },
    { path: '/recrutamento', label: 'Carreiras', icon: 'ri-user-search-line' },
    { path: '/contato', label: 'Contato', icon: 'ri-customer-service-line' },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <i className="ri-computer-line"></i>
            </div>
            <div className="logo-text">
              <span className="logo-jd">JD</span>
              <span className="logo-sub">Tecnologia & Serviço</span>
            </div>
          </Link>

          <nav className="nav-menu">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="nav-link">
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="auth-area">
            {isAuthenticated ? (
              <div className="user-menu">
                <i className="ri-user-circle-line"></i>
                <span>Olá, {user?.name || 'Utilizador'}</span>
                {user?.role === 'admin' && (
                  <Link to="/admin" style={{ background:'rgba(139,92,246,0.2)', color:'#a78bfa', padding:'4px 12px', borderRadius:20, fontSize:'0.8rem', fontWeight:700, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:4 }}>
                    <i className="ri-dashboard-line" style={{ fontSize:14 }}></i> Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="logout-btn">
                  <i className="ri-logout-box-line"></i>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">
                  <i className="ri-login-circle-line"></i> Login
                </Link>
                <Link to="/registro" className="btn-register">
                  <i className="ri-user-add-line"></i> Criar Conta
                </Link>
              </div>
            )}
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <i className="ri-login-circle-line"></i> Login
                </Link>
                <Link to="/registro" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <i className="ri-user-add-line"></i> Criar Conta
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <style jsx="true">{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 16, 32, 0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(59, 130, 246, 0.12);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
          padding: 14px 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-icon {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #4299e1, #2b6cb0);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon i {
          font-size: 24px;
          color: white;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-jd {
          font-size: 26px;
          font-weight: 800;
          color: #3b82f6;
          line-height: 1;
          letter-spacing: -1px;
        }

        .logo-sub {
          font-size: 10px;
          color: #94a3b8;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .nav-menu {
          display: flex;
          gap: 20px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #cbd5e1;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #3b82f6;
        }

        .nav-link i {
          font-size: 18px;
        }

        .auth-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-login, .btn-register {
          padding: 8px 18px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .btn-login {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          backdrop-filter: blur(10px);
        }

        .btn-login:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .btn-register {
          background: #3b82f6;
          color: white;
          border: 1px solid #3b82f6;
        }

        .btn-register:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px 16px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          white-space: nowrap;
        }

        .user-menu i {
          font-size: 20px;
          color: #60a5fa;
        }

        .logout-btn {
          background: none;
          color: #ef4444;
          font-size: 18px;
          padding: 0;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
        }
        
        .logout-btn:hover {
          color: #dc2626;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          font-size: 28px;
          color: #e2e8f0;
          border: none;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 20px;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 1024px) {
          .nav-menu {
            gap: 12px;
          }
          .nav-link {
            font-size: 0.85rem;
          }
          .btn-login, .btn-register {
            padding: 8px 12px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 968px) {
          .nav-menu, .auth-area {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .mobile-menu {
            display: flex;
          }
          
          .mobile-nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            color: #cbd5e1;
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          
          .mobile-nav-link:hover {
            background: rgba(255, 255, 255, 0.05);
            color: #60a5fa;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;