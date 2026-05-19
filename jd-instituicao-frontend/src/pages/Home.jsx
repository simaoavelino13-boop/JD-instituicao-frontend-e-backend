// Página Inicial - Landing page com seções principais e destaques
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Carousel from '../components/Common/Carousel';
import { servicesService } from '../services/api';

const Home = () => {
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);

  // Variantes de animação para o Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Carregar dados da API (com fallback se falhar)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesService.getServices();
        // Pegar apenas os 3 primeiros para destaque
        setDestaques(response.data.slice(0, 3));
      } catch (error) {
        console.warn('Backend indisponível, usando dados mockados.');
        // Fallback robusto caso a API não esteja online
        setDestaques([
          {
            id: 1,
            titulo: 'Desenvolvimento Web',
            descricao: 'Criamos sites e aplicações web modernas, responsivas e otimizadas para SEO.',
            icone: 'ri-code-box-line',
            cor: '#4299e1'
          },
          {
            id: 2,
            titulo: 'Cibersegurança',
            descricao: 'Proteção avançada contra ameaças cibernéticas e auditoria de segurança.',
            icone: 'ri-shield-check-line',
            cor: '#e53e3e'
          },
          {
            id: 3,
            titulo: 'Análise de Dados',
            descricao: 'Transformamos dados em insights valiosos com dashboards interativos.',
            icone: 'ri-bar-chart-2-line',
            cor: '#ed8936'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop',
      title: 'Transformação Digital Angolana',
      description: 'Soluções de classe mundial, desenvolvidas localmente para impulsionar o seu negócio.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=600&fit=crop',
      title: 'Segurança e Inovação',
      description: 'Protegemos o seu maior ativo enquanto construímos o futuro digital da sua empresa.'
    }
  ];

  return (
    <div className="home-page">
      <Carousel slides={slides} autoPlay={true} interval={6000} />

      {/* Hero Section Premium */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="hero-badge">Bem-vindo à JD Tecnologia</span>
              <h1 className="hero-title">
                O Futuro Digital da sua Empresa <br/>
                <span className="highlight">Começa Aqui.</span>
              </h1>
              <p className="hero-subtitle">
                Combinamos engenharia de software de alto nível com design inovador para criar soluções tecnológicas que transformam negócios em Angola e no mundo.
              </p>
              <div className="hero-buttons">
                <Link to="/servicos" className="btn btn-primary btn-glow">
                  Explorar Serviços <i className="ri-arrow-right-line"></i>
                </Link>
                <Link to="/sobre" className="btn btn-secondary">
                  Nossa História
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="hero-illustration"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card main-glass">
                <div className="glass-header">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className="glass-body">
                  <div className="code-line w-70"></div>
                  <div className="code-line w-40"></div>
                  <div className="code-line w-90 mt-2"></div>
                  <div className="code-line w-60"></div>
                  <div className="code-line w-80 mt-2"></div>
                  <div className="code-line w-50"></div>
                </div>
              </div>
              
              <motion.div 
                className="floating-element float-1 glass-card"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <i className="ri-shield-star-line text-blue"></i>
                <span>Dados Seguros</span>
              </motion.div>

              <motion.div 
                className="floating-element float-2 glass-card"
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              >
                <i className="ri-rocket-line text-orange"></i>
                <span>Alta Performance</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destaques com Framer Motion */}
      <section className="destaques-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">O QUE FAZEMOS</span>
            <h2 className="section-title-modern">Nossas Especialidades</h2>
          </div>
          
          {loading ? (
            <div className="loading-skeleton">
              {[1, 2, 3].map(i => <div key={i} className="skeleton-card"></div>)}
            </div>
          ) : (
            <motion.div 
              className="destaques-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {destaques.map((destaque) => (
                <motion.div key={destaque.id} className="destaque-card-premium" variants={itemVariants}>
                  <div className="card-icon-wrapper" style={{ background: `linear-gradient(135deg, ${destaque.cor}22, ${destaque.cor}44)` }}>
                    <i className={destaque.icone} style={{ color: destaque.cor }}></i>
                  </div>
                  <h3>{destaque.titulo}</h3>
                  <p>{destaque.descricao}</p>
                  <Link to="/servicos" className="card-link-modern" style={{ color: destaque.cor }}>
                    Saiba mais <i className="ri-arrow-right-line"></i>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Estatísticas Premium */}
      <section className="stats-section-premium">
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="stat-item-modern" variants={itemVariants}>
              <div className="stat-number-gradient">150+</div>
              <div className="stat-label">Projetos Entregues</div>
            </motion.div>
            <motion.div className="stat-item-modern" variants={itemVariants}>
              <div className="stat-number-gradient">50+</div>
              <div className="stat-label">Clientes Satisfeitos</div>
            </motion.div>
            <motion.div className="stat-item-modern" variants={itemVariants}>
              <div className="stat-number-gradient">24/7</div>
              <div className="stat-label">Suporte Dedicado</div>
            </motion.div>
            <motion.div className="stat-item-modern" variants={itemVariants}>
              <div className="stat-number-gradient">100%</div>
              <div className="stat-label">Código Nacional</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx="true">{`
        /* Hero Section Premium */
        .hero-section {
          padding: 100px 0;
          position: relative;
          background: #0f172a;
          overflow: hidden;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(66, 153, 225, 0.1);
          color: #2b6cb0;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 25px;
          border: 1px solid rgba(66, 153, 225, 0.2);
        }

        .hero-title {
          font-size: 3.5rem;
          color: white;
          margin-bottom: 25px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .highlight {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: #94a3b8;
          margin-bottom: 35px;
          line-height: 1.7;
          max-width: 90%;
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
        }

        .btn {
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
          border: 1px solid #3b82f6;
        }

        .btn-glow:hover {
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: white;
          color: #0f172a;
          border: 1px solid #cbd5e1;
        }

        .btn-secondary:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        /* Hero Illustration - Glassmorphism */
        .hero-illustration {
          position: relative;
          height: 400px;
          perspective: 1000px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }

        .main-glass {
          width: 100%;
          height: 100%;
          transform: rotateY(-15deg) rotateX(10deg);
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .glass-header {
          display: flex;
          gap: 8px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #fc8181; }
        .yellow { background: #f6e05e; }
        .green { background: #68d391; }

        .code-line {
          height: 12px;
          background: rgba(15, 23, 42, 0.05);
          border-radius: 6px;
          margin-bottom: 15px;
        }
        .w-40 { width: 40%; }
        .w-50 { width: 50%; }
        .w-60 { width: 60%; }
        .w-70 { width: 70%; }
        .w-80 { width: 80%; }
        .w-90 { width: 90%; }
        .mt-2 { margin-top: 20px; }

        .floating-element {
          position: absolute;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          color: #0f172a;
          transform: translateZ(50px);
        }

        .floating-element i { font-size: 24px; }
        .text-blue { color: #3b82f6; }
        .text-orange { color: #f97316; }

        .float-1 { top: 15%; right: -10%; }
        .float-2 { bottom: 20%; left: -15%; }

        /* Destaques Section Premium */
        .destaques-section {
          padding: 100px 0;
          background: #ffffff;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-subtitle {
          color: #3b82f6;
          font-weight: 700;
          letter-spacing: 2px;
          font-size: 0.85rem;
          text-transform: uppercase;
          display: block;
          margin-bottom: 10px;
        }

        .section-title-modern {
          font-size: 2.8rem;
          color: #0f172a;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .destaques-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .destaque-card-premium {
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
          transition: all 0.4s ease;
        }

        .destaque-card-premium:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
          border-color: #e2e8f0;
        }

        .card-icon-wrapper {
          width: 65px;
          height: 65px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          margin-bottom: 25px;
        }

        .destaque-card-premium h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 15px;
        }

        .destaque-card-premium p {
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 25px;
          font-size: 0.95rem;
        }

        .card-link-modern {
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.3s ease;
        }

        .card-link-modern:hover {
          gap: 10px;
        }

        /* Loading Skeleton */
        .loading-skeleton {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        
        .skeleton-card {
          height: 300px;
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 24px;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Stats Section Premium */
        .stats-section-premium {
          padding: 80px 0;
          background: #0f172a;
          position: relative;
          overflow: hidden;
        }

        .stats-section-premium::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        .stat-item-modern {
          text-align: center;
        }

        .stat-number-gradient {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
          line-height: 1.1;
        }

        .stat-item-modern .stat-label {
          color: #cbd5e1;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-subtitle {
            margin: 0 auto 35px;
          }
          .hero-buttons {
            justify-content: center;
          }
          .hero-illustration {
            display: none;
          }
          .hero-title { font-size: 2.8rem; }
        }
      `}</style>
    </div>
  );
};

export default Home;