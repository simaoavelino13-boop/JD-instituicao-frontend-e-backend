// Página Portfólio - Listagem de projetos realizados
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../components/Common/Modal';
import Carousel from '../components/Common/Carousel';
import { portfolioService } from '../services/api';

const Portfolio = () => {
  const [projetos, setProjetos] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('todos');
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await portfolioService.getProjects();
        setProjetos(response.data);
      } catch (error) {
        console.warn('Backend indisponível, usando dados mockados de portfólio.');
        setProjetos([
          { 
            id: 1, 
            titulo: 'E-commerce JDStore', 
            descricao: 'Plataforma de e-commerce completa para loja de tecnologia com integração de pagamentos locais.', 
            descricaoCompleta: 'Desenvolvemos uma plataforma de e-commerce robusta e escalável, focada em alta conversão e performance. Integra sistemas de pagamento angolanos e gestão de estoque em tempo real.', 
            cliente: 'TechStore Angola', 
            data: '2023-12', 
            tecnologias: ['React', 'Node.js', 'PostgreSQL'], 
            imagens: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop'], 
            depoimentos: [{ nome: 'João Santos', cargo: 'CEO da TechStore', texto: 'A JD Tecnologia revolucionou as nossas vendas online!' }] 
          },
          { 
            id: 2, 
            titulo: 'App Mobile Banco Digital', 
            descricao: 'Aplicativo financeiro com biometria, transferências instantâneas e gestão de cartões.', 
            descricaoCompleta: 'Um aplicativo bancário de nova geração focado em segurança extrema e usabilidade. Autenticação por reconhecimento facial e arquitetura zero-trust.', 
            cliente: 'Fintech Nacional', 
            data: '2023-10', 
            tecnologias: ['React Native', 'TypeScript', 'AWS'], 
            imagens: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop'], 
            depoimentos: [{ nome: 'Maria Silva', cargo: 'Diretora de TI', texto: 'O app mais estável e seguro que já lançámos no mercado.' }] 
          },
          { 
            id: 3, 
            titulo: 'Portal Governamental', 
            descricao: 'Plataforma unificada para serviços públicos e atendimento ao cidadão.', 
            descricaoCompleta: 'Sistema de alta disponibilidade para servir milhões de acessos simultâneos, integrando dezenas de serviços legados numa interface moderna e acessível.', 
            cliente: 'Ministério Público', 
            data: '2023-08', 
            tecnologias: ['Next.js', 'Go', 'Kubernetes'], 
            imagens: ['https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop'], 
            depoimentos: [{ nome: 'Carlos Alberto', cargo: 'Gestor de Projetos', texto: 'Uma verdadeira transformação na forma como o cidadão interage com o estado.' }] 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredProjects = filter === 'todos' 
    ? projetos 
    : projetos.filter(p => p.tecnologias.some(tech => tech.toLowerCase().includes(filter.toLowerCase())));
    
  const categories = ['todos', 'React', 'React Native', 'Next.js', 'Node.js'];

  const slidesToCarousel = (project) => project.imagens.map((img, idx) => ({ id: idx, image: img, title: `${project.titulo} - Imagem ${idx + 1}`, description: '' }));

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero-premium">
        <div className="hero-grid-bg"></div>
        <div className="container relative-z">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="hero-badge">CASOS DE SUCESSO</span>
            <h1>O Nosso Portfólio</h1>
            <p>Conheça os projetos onde aplicámos inovação e engenharia de excelência para transformar o negócio dos nossos clientes.</p>
          </motion.div>
        </div>
      </section>

      <section className="portfolio-content-section">
        <div className="container">
          
          <motion.div 
            className="portfolio-filters-modern"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-pill ${filter === cat ? 'active' : ''}`} 
                onClick={() => setFilter(cat)}
              >
                {cat === 'todos' ? 'Todos os Projetos' : cat}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="portfolio-grid-modern">
              {[1,2,3].map(i => <div key={i} className="skeleton-project"></div>)}
            </div>
          ) : (
            <motion.div 
              className="portfolio-grid-modern"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode='popLayout'>
                {filteredProjects.map(projeto => (
                  <motion.div 
                    key={projeto.id} 
                    className="project-card-premium" 
                    variants={itemVariants}
                    layout
                    onClick={() => setSelectedProject(projeto)}
                  >
                    <div className="project-image-premium">
                      <img src={projeto.imagens[0]} alt={projeto.titulo} />
                      <div className="project-overlay-premium">
                        <div className="overlay-btn">Ver Estudo de Caso</div>
                      </div>
                      <div className="project-date-badge">{projeto.data}</div>
                    </div>
                    <div className="project-info-premium">
                      <span className="project-client">{projeto.cliente}</span>
                      <h3>{projeto.titulo}</h3>
                      <p>{projeto.descricao}</p>
                      <div className="project-tech-modern">
                        {projeto.tecnologias.slice(0,3).map(tech => (
                          <span key={tech} className="tech-badge-modern">{tech}</span>
                        ))}
                        {projeto.tecnologias.length > 3 && <span className="tech-badge-modern">+{projeto.tecnologias.length - 3}</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredProjects.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-projects-found">
                  <i className="ri-folder-info-line"></i>
                  <p>Nenhum projeto encontrado para esta categoria.</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title="" size="large">
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="project-modal-premium"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            >
              <div className="project-modal-gallery">
                <Carousel slides={slidesToCarousel(selectedProject)} autoPlay={true} interval={4000} />
              </div>
              <div className="project-modal-body">
                <div className="modal-header-meta">
                  <h2>{selectedProject.titulo}</h2>
                  <span className="modal-client"><i className="ri-building-4-line"></i> {selectedProject.cliente}</span>
                </div>
                
                <p className="project-full-description">{selectedProject.descricaoCompleta}</p>
                
                <div className="project-tech-stack">
                  <h4>Tecnologias Core</h4>
                  <div className="tech-pills">
                    {selectedProject.tecnologias.map(tech => (
                      <span key={tech} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                </div>

                {selectedProject.depoimentos && selectedProject.depoimentos.length > 0 && (
                  <div className="project-testimonial-modern">
                    <i className="ri-double-quotes-l quote-icon"></i>
                    <p className="testimonial-text">"{selectedProject.depoimentos[0].texto}"</p>
                    <div className="testimonial-author-modern">
                      <strong>{selectedProject.depoimentos[0].nome}</strong>
                      <span>{selectedProject.depoimentos[0].cargo}</span>
                    </div>
                  </div>
                )}
                
                <Link to="/contato" className="modal-cta-btn">
                  Iniciar um Projeto Semelhante <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>

      <section className="portfolio-cta-section">
        <div className="cta-glass-card">
          <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <h2>Pronto para escalar o seu negócio?</h2>
            <p>Junte-se às empresas que já transformaram a sua operação com as nossas soluções tecnológicas.</p>
            <Link to="/contato" className="btn-cta-premium">
              Falar com Especialistas <i className="ri-rocket-line"></i>
            </Link>
          </motion.div>
        </div>
      </section>

      <style jsx="true">{`
        /* Hero Section */
        .portfolio-hero-premium {
          position: relative;
          background: #0f172a;
          padding: 160px 0 100px;
          color: white;
          text-align: center;
          overflow: hidden;
        }

        .hero-grid-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
          background-position: center center;
          opacity: 0.5;
        }

        .hero-grid-bg::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 60%);
        }

        .relative-z { position: relative; z-index: 10; }

        .hero-badge {
          display: inline-block; padding: 6px 16px; background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; border-radius: 20px;
          font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; margin-bottom: 20px;
        }

        .portfolio-hero-premium h1 {
          font-size: 3.5rem; margin-bottom: 20px; font-weight: 800; letter-spacing: -1px;
        }

        .portfolio-hero-premium p {
          font-size: 1.2rem; max-width: 650px; margin: 0 auto; color: #94a3b8; line-height: 1.6;
        }

        /* Filters */
        .portfolio-content-section { padding: 60px 0 120px; background: #f8fafc; min-height: 500px; }
        
        .portfolio-filters-modern {
          display: flex; justify-content: center; gap: 12px; margin-bottom: 50px; flex-wrap: wrap;
        }

        .filter-pill {
          padding: 10px 24px; background: white; border: 1px solid #e2e8f0; border-radius: 30px;
          color: #475569; font-weight: 600; font-size: 0.95rem; cursor: pointer;
          transition: all 0.3s ease; box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }

        .filter-pill:hover { border-color: #cbd5e1; transform: translateY(-2px); }
        .filter-pill.active { background: #0f172a; color: white; border-color: #0f172a; box-shadow: 0 10px 20px -5px rgba(15,23,42,0.3); }

        /* Grid & Cards */
        .portfolio-grid-modern {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 40px;
        }

        .project-card-premium {
          background: white; border-radius: 24px; overflow: hidden; cursor: pointer;
          border: 1px solid #f1f5f9; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05); transition: all 0.4s ease;
          display: flex; flex-direction: column;
        }
        
        .project-card-premium:hover {
          transform: translateY(-10px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); border-color: #e2e8f0;
        }

        .project-image-premium { position: relative; height: 260px; overflow: hidden; }
        .project-image-premium img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .project-card-premium:hover .project-image-premium img { transform: scale(1.05); }

        .project-overlay-premium {
          position: absolute; top:0; left:0; right:0; bottom:0;
          background: rgba(15,23,42,0.7); display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.4s ease; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
        }
        .project-card-premium:hover .project-overlay-premium { opacity: 1; }

        .overlay-btn {
          padding: 12px 24px; background: white; color: #0f172a; border-radius: 30px; font-weight: 700;
          transform: translateY(20px); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .project-card-premium:hover .overlay-btn { transform: translateY(0); }

        .project-date-badge {
          position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.6); color: white;
          padding: 6px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; backdrop-filter: blur(4px);
        }

        .project-info-premium { padding: 30px; flex-grow: 1; display: flex; flex-direction: column; }
        .project-client { display: block; color: #3b82f6; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; }
        .project-info-premium h3 { font-size: 1.4rem; color: #0f172a; margin-bottom: 12px; font-weight: 800; line-height: 1.3; }
        .project-info-premium p { color: #64748b; line-height: 1.6; font-size: 1rem; margin-bottom: 20px; flex-grow: 1; }

        .project-tech-modern { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 20px; border-top: 1px solid #f1f5f9; }
        .tech-badge-modern { background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; }

        .no-projects-found { grid-column: 1 / -1; text-align: center; padding: 60px 0; color: #94a3b8; }
        .no-projects-found i { font-size: 48px; margin-bottom: 15px; display: block; }

        /* Loading Skeletons */
        .skeleton-project { height: 500px; background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: loading 1.5s infinite; border-radius: 24px; }

        /* Modal Premium */
        .project-modal-premium { display: flex; flex-direction: column; max-height: 90vh;}
        .project-modal-gallery { height: 350px; background: #0f172a; }
        .project-modal-body { padding: 40px; overflow-y: auto; background: white;}
        
        .modal-header-meta { margin-bottom: 25px; }
        .modal-header-meta h2 { font-size: 2.2rem; color: #0f172a; font-weight: 800; margin-bottom: 10px; line-height: 1.2;}
        .modal-client { display: inline-flex; align-items: center; gap: 8px; color: #64748b; font-weight: 600; font-size: 1rem; }
        
        .project-full-description { color: #475569; line-height: 1.8; font-size: 1.1rem; margin-bottom: 40px; }

        .project-tech-stack { margin-bottom: 40px; }
        .project-tech-stack h4 { font-size: 1.1rem; color: #0f172a; margin-bottom: 15px; font-weight: 700; }
        .tech-pills { display: flex; flex-wrap: wrap; gap: 10px; }
        .tech-pill { background: #eff6ff; color: #2563eb; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 0.9rem; }

        .project-testimonial-modern {
          background: #f8fafc; padding: 30px; border-radius: 20px; border-left: 4px solid #3b82f6; position: relative; margin-bottom: 40px;
        }
        .quote-icon { position: absolute; top: 20px; right: 20px; font-size: 60px; color: rgba(59,130,246,0.1); }
        .testimonial-text { font-size: 1.15rem; color: #1e293b; font-style: italic; line-height: 1.6; margin-bottom: 20px; position: relative; z-index: 2; }
        .testimonial-author-modern strong { display: block; color: #0f172a; font-size: 1rem; }
        .testimonial-author-modern span { color: #64748b; font-size: 0.9rem; }

        .modal-cta-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%;
          padding: 18px; background: #0f172a; color: white; text-decoration: none; border-radius: 16px;
          font-weight: 700; font-size: 1.1rem; transition: all 0.3s ease;
        }
        .modal-cta-btn:hover { background: #1e293b; transform: translateY(-3px); box-shadow: 0 10px 20px -5px rgba(15,23,42,0.4); }

        /* CTA Section */
        .portfolio-cta-section { padding: 0 0 120px; background: #f8fafc; }
        .cta-glass-card {
          max-width: 1000px; margin: 0 auto; background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 40px; padding: 80px 40px; text-align: center; color: white;
          box-shadow: 0 25px 50px -12px rgba(37,99,235,0.4); position: relative; overflow: hidden;
        }
        
        .cta-glass-card::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
        }

        .cta-glass-card h2 { font-size: 2.8rem; font-weight: 800; margin-bottom: 20px; letter-spacing: -0.5px; position: relative; z-index: 2; }
        .cta-glass-card p { font-size: 1.2rem; color: rgba(255,255,255,0.9); margin-bottom: 40px; position: relative; z-index: 2; }
        
        .btn-cta-premium {
          display: inline-flex; align-items: center; gap: 10px; padding: 18px 40px; background: white; color: #1d4ed8;
          border-radius: 40px; font-weight: 800; font-size: 1.1rem; text-decoration: none;
          transition: all 0.3s ease; box-shadow: 0 10px 20px rgba(0,0,0,0.1); position: relative; z-index: 2;
        }
        .btn-cta-premium:hover { transform: translateY(-5px); box-shadow: 0 20px 30px rgba(0,0,0,0.15); }

        @media (max-width: 992px) {
          .portfolio-hero-premium h1 { font-size: 2.5rem; }
          .portfolio-grid-modern { grid-template-columns: 1fr 1fr; }
          .cta-glass-card { border-radius: 30px; padding: 50px 20px; margin: 0 20px; }
          .cta-glass-card h2 { font-size: 2rem; }
        }

        @media (max-width: 768px) {
          .portfolio-grid-modern { grid-template-columns: 1fr; }
          .project-modal-gallery { height: 250px; }
          .project-modal-body { padding: 25px; }
          .modal-header-meta h2 { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;