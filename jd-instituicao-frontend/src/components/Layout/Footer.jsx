// Componente Footer - Rodapé da aplicação com informações de contato e redes sociais
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Informações de contato para Angola (AO)
  const contactInfo = {
    address: 'Rua da Samba, 123 - Luanda, Angola',
    phone: '+244 929 431 541',
    email: 'jd.hrtecnogias@gmail.com',
    whatsapp: '+244 929 431 541'
  };

  const socialLinks = [
    { platform: 'Instagram', icon: 'ri-instagram-line', url: 'https://instagram.com/jdtecnologia' },
    { platform: 'LinkedIn', icon: 'ri-linkedin-line', url: 'https://linkedin.com/company/jdtecnologia' },
    { platform: 'Facebook', icon: 'ri-facebook-line', url: 'https://facebook.com/jdtecnologia' },
    { platform: 'WhatsApp', icon: 'ri-whatsapp-line', url: `https://wa.me/${contactInfo.whatsapp}` }
  ];

  const quickLinks = [
    { label: 'Início', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Serviços', path: '/servicos' },
    { label: 'Portfólio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Carreiras', path: '/recrutamento' }
  ];

  const services = [
    'Desenvolvimento Web',
    'Aplicativos Móveis',
    'Cibersegurança',
    'Análise de Dados',
    'Consultoria em TI',
    'Design UX/UI'
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Coluna 1 - Sobre a empresa */}
          <div className="footer-col">
            <div className="footer-logo">
              <i className="ri-computer-line"></i>
              <span>JD Tecnologia</span>
            </div>
            <p className="footer-description">
              Soluções inovadoras em Tecnologia da Informação para empresas em Angola. 
              Transformamos ideias em realidade digital.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a 
                  key={social.platform} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.platform}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2 - Links rápidos */}
          <div className="footer-col">
            <h3 className="footer-title">Links Rápidos</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>
                    <i className="ri-arrow-right-s-line"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Serviços */}
          <div className="footer-col">
            <h3 className="footer-title">Serviços</h3>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={index}>
                  <Link to="/servicos">
                    <i className="ri-arrow-right-s-line"></i>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div className="footer-col">
            <h3 className="footer-title">Contato</h3>
            <ul className="footer-contact">
              <li>
                <i className="ri-map-pin-line"></i>
                <span>{contactInfo.address}</span>
              </li>
              <li>
                <i className="ri-phone-line"></i>
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </li>
              <li>
                <i className="ri-mail-line"></i>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
              <li>
                <i className="ri-whatsapp-line"></i>
                <a href={`https://wa.me/${contactInfo.whatsapp}`}>WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} JD Tecnologia e Serviço - Angola. Todos os direitos reservados.</p>
          <div className="footer-bottom-links">
            <Link to="/privacidade">Política de Privacidade</Link>
            <Link to="/termos">Termos de Uso</Link>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .footer {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
          color: #e2e8f0;
          padding: 60px 0 20px;
          margin-top: auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .footer-logo i {
          font-size: 32px;
          color: #4299e1;
        }

        .footer-logo span {
          font-size: 20px;
          font-weight: bold;
          color: white;
        }

        .footer-description {
          line-height: 1.6;
          margin-bottom: 20px;
          color: #cbd5e0;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #cbd5e0;
        }

        .social-link:hover {
          background: #4299e1;
          color: white;
          transform: translateY(-3px);
        }

        .footer-title {
          color: white;
          font-size: 18px;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: #4299e1;
        }

        .footer-links, .footer-contact {
          list-style: none;
        }

        .footer-links li, .footer-contact li {
          margin-bottom: 12px;
        }

        .footer-links a, .footer-contact a {
          color: #cbd5e0;
          text-decoration: none;
          transition: color 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .footer-links a:hover, .footer-contact a:hover {
          color: #4299e1;
        }

        .footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-contact i {
          margin-top: 4px;
          color: #4299e1;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: #cbd5e0;
          text-decoration: none;
          font-size: 14px;
        }

        .footer-bottom-links a:hover {
          color: #4299e1;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;