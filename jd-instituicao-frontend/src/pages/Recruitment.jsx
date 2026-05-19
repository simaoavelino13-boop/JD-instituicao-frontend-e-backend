// Página Recrutamento - Listagem de vagas e formulário de candidatura
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../components/Common/Modal';
import ApplicationForm from '../components/Forms/ApplicationForm';
import { recruitmentService } from '../services/api';

const Recruitment = () => {
  const [vagas, setVagas] = useState([]);
  const [selectedVaga, setSelectedVaga] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await recruitmentService.getJobs();
        setVagas(response.data);
      } catch (error) {
        console.warn('Backend indisponível, usando dados mockados de vagas.');
        setVagas([
          { id: 1, titulo: 'Desenvolvedor Full Stack Pleno', descricao: 'Desenvolvimento de aplicações web completas, integrando front-end e back-end com tecnologias modernas.', requisitos: ['React.js ou Vue.js', 'Node.js ou PHP/Laravel', 'Banco de dados SQL', 'API RESTful', 'Git'], beneficios: ['Salário competitivo', 'Vale alimentação', 'Horário flexível', 'Home office parcial'], tipo: 'CLT', local: 'Luanda (Híbrido)', dataPublicacao: '2024-01-15' },
          { id: 2, titulo: 'Especialista em Cibersegurança', descricao: 'Implementação e manutenção de políticas de segurança, análise de vulnerabilidades e resposta a incidentes.', requisitos: ['Firewalls e IDS/IPS', 'Pentest', 'Certificações na área (diferencial)', 'Inglês avançado'], beneficios: ['Salário compatível', 'Bônus por desempenho', 'Treinamentos certificados'], tipo: 'CLT', local: 'Luanda (Presencial)', dataPublicacao: '2024-01-10' },
          { id: 3, titulo: 'UX/UI Designer', descricao: 'Criação de interfaces e experiências digitais centradas no usuário para web e mobile.', requisitos: ['Portfólio de projetos', 'Figma ou Adobe XD', 'Design system', 'Pesquisa com usuários'], beneficios: ['Salário competitivo', 'Equipamento fornecido', 'Ambiente criativo', 'Horário flexível'], tipo: 'PJ', local: 'Remoto', dataPublicacao: '2024-01-05' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-AO');

  return (
    <div className="recruitment-page">
      <section className="recruitment-hero-premium">
        <div className="hero-gradient-bg"></div>
        <div className="container relative-z">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="hero-badge">CARREIRAS</span>
            <h1>Faça Parte do Futuro</h1>
            <p>Junte-se a uma equipa de excelência que está a redefinir os padrões tecnológicos em Angola e no mundo.</p>
          </motion.div>
        </div>
      </section>

      <section className="culture-section-modern">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">PORQUÊ A JD TECNOLOGIA?</span>
            <h2 className="section-title-modern">A Nossa Cultura</h2>
          </div>
          
          <motion.div 
            className="culture-grid-modern"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className="culture-card-premium" variants={itemVariants}>
              <div className="culture-icon-wrapper"><i className="ri-team-line"></i></div>
              <h3>Colaboração Extrema</h3>
              <p>Ambiente onde as ideias fluem livremente e todos contribuem para o sucesso do projeto.</p>
            </motion.div>
            <motion.div className="culture-card-premium" variants={itemVariants}>
              <div className="culture-icon-wrapper"><i className="ri-lightbulb-flash-line"></i></div>
              <h3>Inovação Contínua</h3>
              <p>Investimos pesado em I&D. Terá espaço e ferramentas para testar novas tecnologias.</p>
            </motion.div>
            <motion.div className="culture-card-premium" variants={itemVariants}>
              <div className="culture-icon-wrapper"><i className="ri-rocket-line"></i></div>
              <h3>Crescimento Acelerado</h3>
              <p>Oportunidades reais de progressão de carreira com base no mérito e entrega.</p>
            </motion.div>
            <motion.div className="culture-card-premium" variants={itemVariants}>
              <div className="culture-icon-wrapper"><i className="ri-heart-pulse-line"></i></div>
              <h3>Bem-estar Integral</h3>
              <p>Políticas flexíveis de trabalho focadas na saúde física e mental da nossa equipa.</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="benefits-glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="benefits-header">
              <i className="ri-gift-line"></i>
              <h3>O Pacote JD</h3>
            </div>
            <div className="benefits-grid-modern">
              <span><i className="ri-shield-check-fill"></i> Seguro de Saúde Plus</span>
              <span><i className="ri-restaurant-line"></i> Subsídio de Refeição</span>
              <span><i className="ri-macbook-line"></i> Equipamento de Topo</span>
              <span><i className="ri-home-wifi-line"></i> Modelo Híbrido/Remoto</span>
              <span><i className="ri-book-read-line"></i> Budget Anual de Formação</span>
              <span><i className="ri-calendar-event-line"></i> Mais Dias de Férias</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="vagas-section-premium" id="vagas">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">OPORTUNIDADES EM ABERTO</span>
            <h2 className="section-title-modern">Junte-se a Nós</h2>
          </div>
          
          {loading ? (
             <div className="vagas-list-modern">
               {[1,2,3].map(i => <div key={i} className="skeleton-vaga"></div>)}
             </div>
          ) : (
            <motion.div 
              className="vagas-list-modern"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {vagas.length === 0 ? (
                 <div className="no-vagas-message">
                   <i className="ri-search-eye-line"></i>
                   <p>No momento não temos vagas abertas. Fique atento!</p>
                 </div>
              ) : (
                vagas.map(vaga => (
                  <motion.div key={vaga.id} className="vaga-card-premium" variants={itemVariants}>
                    <div className="vaga-card-body">
                      <div className="vaga-header-modern">
                        <div>
                          <span className="vaga-type-badge">{vaga.tipo}</span>
                          <h3>{vaga.titulo}</h3>
                        </div>
                        <div className="vaga-location-badge">
                          <i className="ri-map-pin-2-line"></i> {vaga.local}
                        </div>
                      </div>
                      <p className="vaga-description-modern">{vaga.descricao}</p>
                      
                      <div className="vaga-footer-modern">
                        <span className="vaga-date"><i className="ri-calendar-line"></i> {formatDate(vaga.dataPublicacao)}</span>
                        <button className="btn-view-job" onClick={() => setSelectedVaga(vaga)}>
                          Saber Mais <i className="ri-arrow-right-line"></i>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Modal isOpen={!!selectedVaga} onClose={() => setSelectedVaga(null)} title="" size="large">
        <AnimatePresence>
          {selectedVaga && (
            <motion.div 
              className="vaga-modal-premium"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            >
              <div className="vaga-modal-header">
                <span className="vaga-modal-type">{selectedVaga.tipo}</span>
                <h2>{selectedVaga.titulo}</h2>
                <div className="vaga-modal-meta">
                  <span><i className="ri-map-pin-2-fill"></i> {selectedVaga.local}</span>
                  <span><i className="ri-calendar-todo-fill"></i> Publicado em {formatDate(selectedVaga.dataPublicacao)}</span>
                </div>
              </div>

              <div className="vaga-modal-body">
                <div className="vaga-modal-section">
                  <h3><i className="ri-file-info-line"></i> Sobre a Função</h3>
                  <p>{selectedVaga.descricao}</p>
                </div>

                <div className="vaga-modal-section">
                  <h3><i className="ri-checkbox-multiple-line"></i> Requisitos</h3>
                  <ul className="vaga-requirements-list">
                    {selectedVaga.requisitos.map((req, idx) => (
                      <li key={idx}><i className="ri-check-line"></i> {req}</li>
                    ))}
                  </ul>
                </div>

                <div className="vaga-modal-section">
                  <h3><i className="ri-gift-line"></i> O que Oferecemos</h3>
                  <ul className="vaga-benefits-list">
                    {selectedVaga.beneficios.map((ben, idx) => (
                      <li key={idx}><i className="ri-star-s-fill"></i> {ben}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="vaga-modal-footer">
                <button className="btn-apply-premium" onClick={() => { setShowApplicationForm(true); setSelectedVaga(null); }}>
                  Candidatar-me Agora <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>

      <Modal isOpen={showApplicationForm} onClose={() => setShowApplicationForm(false)} title={`Candidatura: ${selectedVaga?.titulo || 'Vaga'}`} size="large">
        <ApplicationForm jobId={selectedVaga?.id} jobTitle={selectedVaga?.titulo} onSuccess={() => setShowApplicationForm(false)} onClose={() => setShowApplicationForm(false)} />
      </Modal>

      <style jsx="true">{`
        /* Hero Section Premium */
        .recruitment-hero-premium {
          position: relative;
          background: #0f172a;
          padding: 160px 0 100px;
          color: white;
          text-align: center;
          overflow: hidden;
        }

        .hero-gradient-bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.2) 0%, transparent 60%),
                      url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80') center/cover;
          opacity: 0.4; mix-blend-mode: overlay;
        }

        .relative-z { position: relative; z-index: 10; }

        .hero-badge {
          display: inline-block; padding: 6px 16px; background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 20px;
          font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; margin-bottom: 20px; backdrop-filter: blur(4px);
        }

        .recruitment-hero-premium h1 {
          font-size: 3.5rem; margin-bottom: 20px; font-weight: 800; letter-spacing: -1px;
        }

        .recruitment-hero-premium p {
          font-size: 1.25rem; max-width: 700px; margin: 0 auto; color: #cbd5e1; line-height: 1.6;
        }

        /* Section Global */
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-subtitle { display: block; color: #3b82f6; font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 15px; }
        .section-title-modern { font-size: 2.8rem; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }

        /* Culture Section */
        .culture-section-modern { padding: 120px 0; background: #ffffff; }
        
        .culture-grid-modern { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; margin-bottom: 80px; }
        
        .culture-card-premium {
          background: #f8fafc; border-radius: 24px; padding: 40px 30px; text-align: center;
          border: 1px solid #f1f5f9; transition: all 0.4s ease;
        }
        .culture-card-premium:hover { transform: translateY(-10px); box-shadow: 0 20px 40px -10px rgba(15,23,42,0.1); background: white; }

        .culture-icon-wrapper {
          width: 80px; height: 80px; margin: 0 auto 25px; background: #eff6ff; border-radius: 24px;
          display: flex; align-items: center; justify-content: center; font-size: 36px; color: #3b82f6;
          transition: all 0.3s ease;
        }
        .culture-card-premium:hover .culture-icon-wrapper { background: #3b82f6; color: white; border-radius: 50%; transform: rotateY(180deg); }

        .culture-card-premium h3 { font-size: 1.3rem; color: #0f172a; margin-bottom: 15px; font-weight: 800; }
        .culture-card-premium p { color: #64748b; line-height: 1.6; font-size: 0.95rem; }

        /* Benefits Card Glassmorphism */
        .benefits-glass-card {
          background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 30px; padding: 60px;
          color: white; box-shadow: 0 25px 50px -12px rgba(15,23,42,0.3); position: relative; overflow: hidden;
        }
        .benefits-glass-card::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%); pointer-events: none;
        }

        .benefits-header { display: flex; align-items: center; gap: 15px; margin-bottom: 40px; }
        .benefits-header i { font-size: 32px; color: #60a5fa; }
        .benefits-header h3 { font-size: 2rem; font-weight: 800; margin: 0; }

        .benefits-grid-modern { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
        .benefits-grid-modern span {
          display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); padding: 16px 20px;
          border-radius: 16px; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }
        .benefits-grid-modern span:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
        .benefits-grid-modern span i { color: #10b981; font-size: 1.2rem; }

        /* Vagas Section */
        .vagas-section-premium { padding: 120px 0; background: #f8fafc; }
        .vagas-list-modern { display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; }

        .vaga-card-premium {
          background: white; border-radius: 20px; border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer;
        }
        .vaga-card-premium:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); border-color: #cbd5e1; }

        .vaga-card-body { padding: 30px; }

        .vaga-header-modern { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
        .vaga-type-badge {
          display: inline-block; padding: 4px 12px; background: #eff6ff; color: #2563eb;
          border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-bottom: 10px;
        }
        .vaga-header-modern h3 { font-size: 1.5rem; color: #0f172a; font-weight: 800; }
        
        .vaga-location-badge {
          display: flex; align-items: center; gap: 6px; background: #f1f5f9; color: #475569;
          padding: 8px 16px; border-radius: 12px; font-weight: 600; font-size: 0.9rem;
        }

        .vaga-description-modern { color: #64748b; line-height: 1.6; margin-bottom: 25px; }

        .vaga-footer-modern { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid #f1f5f9; }
        .vaga-date { color: #94a3b8; font-size: 0.9rem; display: flex; align-items: center; gap: 6px; }
        
        .btn-view-job {
          background: transparent; border: none; color: #3b82f6; font-weight: 700; font-size: 1rem;
          display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
        }
        .vaga-card-premium:hover .btn-view-job { color: #1d4ed8; gap: 12px; }

        .no-vagas-message { text-align: center; padding: 60px 0; color: #94a3b8; }
        .no-vagas-message i { font-size: 48px; margin-bottom: 15px; display: block; }

        .skeleton-vaga { height: 220px; background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: loading 1.5s infinite; border-radius: 20px; }

        /* Modal Premium */
        .vaga-modal-premium { background: white; }
        
        .vaga-modal-header { background: #f8fafc; padding: 40px; border-bottom: 1px solid #e2e8f0; }
        .vaga-modal-type { display: inline-block; padding: 6px 16px; background: #3b82f6; color: white; border-radius: 20px; font-size: 0.85rem; font-weight: 700; margin-bottom: 15px; }
        .vaga-modal-header h2 { font-size: 2.2rem; color: #0f172a; font-weight: 800; margin-bottom: 20px; line-height: 1.2; }
        .vaga-modal-meta { display: flex; gap: 24px; color: #64748b; font-weight: 500; }
        .vaga-modal-meta span { display: flex; align-items: center; gap: 8px; }
        .vaga-modal-meta i { font-size: 1.2rem; color: #94a3b8; }

        .vaga-modal-body { padding: 40px; }
        .vaga-modal-section { margin-bottom: 35px; }
        .vaga-modal-section:last-child { margin-bottom: 0; }
        .vaga-modal-section h3 { font-size: 1.3rem; color: #0f172a; font-weight: 800; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        .vaga-modal-section h3 i { color: #3b82f6; }
        .vaga-modal-section p { color: #475569; line-height: 1.8; font-size: 1.05rem; }

        .vaga-requirements-list, .vaga-benefits-list { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .vaga-requirements-list li, .vaga-benefits-list li { display: flex; align-items: flex-start; gap: 10px; color: #475569; line-height: 1.5; }
        .vaga-requirements-list i { color: #10b981; margin-top: 2px; }
        .vaga-benefits-list i { color: #f59e0b; margin-top: 2px; }

        .vaga-modal-footer { padding: 30px 40px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: right; }
        .btn-apply-premium {
          display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none;
          border-radius: 12px; font-weight: 700; font-size: 1.1rem; cursor: pointer;
          transition: all 0.3s ease; box-shadow: 0 10px 20px -5px rgba(37,99,235,0.4);
        }
        .btn-apply-premium:hover { transform: translateY(-3px); box-shadow: 0 15px 25px -5px rgba(37,99,235,0.5); }

        @media (max-width: 768px) {
          .recruitment-hero-premium h1 { font-size: 2.5rem; }
          .benefits-glass-card { padding: 40px 25px; }
          .vaga-header-modern { flex-direction: column; gap: 15px; }
          .vaga-requirements-list, .vaga-benefits-list { grid-template-columns: 1fr; }
          .vaga-modal-meta { flex-direction: column; gap: 10px; }
          .btn-apply-premium { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default Recruitment;