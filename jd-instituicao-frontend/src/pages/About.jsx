// Página Sobre - Informações institucionais, equipe, missão, visão e valores
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../components/Common/Modal';
import Carousel from '../components/Common/Carousel';
import { teamService } from '../services/api';

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [equipe, setEquipe] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Dados da equipe da API com fallback
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await teamService.getMembers();
        setEquipe(response.data);
      } catch (error) {
        console.warn('Backend indisponível, usando dados mockados.');
        setEquipe([
          {
            id: 1,
            nome: 'J.D',
            cargo: 'CEO & Fundador',
            bio: 'Especialista em transformação digital com mais de 15 anos de experiência no mercado angolano.',
            foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
            redesSociais: { linkedin: '#', email: 'joao@jdtecnologia.ao' },
            galeria: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop']
          },
          {
            id: 2,
            nome: 'Maria Santos',
            cargo: 'Diretora de Tecnologia',
            bio: 'Arquiteta de soluções cloud e especialista em cibersegurança.',
            foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
            redesSociais: { linkedin: '#', email: 'maria@jdtecnologia.ao' },
            galeria: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop']
          },
          {
            id: 3,
            nome: 'Helmer Capasola',
            cargo: 'Lead Developer',
            bio: 'Desenvolvedor full-stack especializado em React, Node.js e arquitetura de microsserviços.',
            foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
            redesSociais: { linkedin: '#', github: '#', email: 'carlos@jdtecnologia.ao' },
            galeria: ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop']
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const mvv = [
    {
      titulo: 'Missão',
      descricao: 'Fornecer soluções tecnológicas inovadoras que impulsionem o crescimento e a transformação digital das empresas em Angola.',
      icone: 'ri-rocket-line',
      cor: '#3b82f6' // Azul
    },
    {
      titulo: 'Visão',
      descricao: 'Ser referência em tecnologia e inovação em Angola, reconhecida pela excelência e impacto positivo nos negócios locais.',
      icone: 'ri-eye-line',
      cor: '#10b981' // Verde
    },
    {
      titulo: 'Valores',
      descricao: 'Inovação, integridade, excelência, colaboração e compromisso inabalável com o cliente e o ecossistema tecnológico angolano.',
      icone: 'ri-heart-pulse-line',
      cor: '#f59e0b' // Laranja
    }
  ];

  const historySlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop', title: 'Fundação', description: 'JD Tecnologia nasce em Luanda' },
    { id: 2, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop', title: 'Expansão', description: 'Abertura de novo escritório' },
    { id: 3, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop', title: 'Inovação', description: 'Lançamento de novos serviços' },
    { id: 4, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop', title: 'Liderança', description: 'Referência em TI em Angola' }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="hero-gradient-overlay"></div>
        <div className="container relative-z">
          <motion.h1 initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            Sobre a Nossa Empresa
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.2 }}>
            A JD Tecnologia é uma empresa angolana especializada em soluções de engenharia de software,
            comprometida com a inovação, segurança e excelência a nível global.
          </motion.p>
        </div>
      </section>

      <section className="institutional-section">
        <div className="container">
          <div className="institutional-content">
            <motion.div 
              className="institutional-text"
              initial={{ opacity:0, x:-50 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            >
              <span className="section-subtitle">QUEM SOMOS</span>
              <h2>Transformando o panorama digital em Angola</h2>
              <p>
                Fundada em 2010, a JD Tecnologia nasceu com o propósito de elevar o nível de inovação e tecnologia
                disponível para as empresas angolanas. Ao longo dos anos, consolidámos uma reputação inabalável
                baseada na qualidade técnica e entrega de valor real.
              </p>
              <p>
                A nossa equipa é composta por engenheiros de software, designers e arquitetos de soluções apaixonados
                por tecnologia, sempre alinhados com o estado da arte do mercado global para
                construir soluções de classe mundial adaptadas ao contexto africano.
              </p>
            </motion.div>
            
            <motion.div 
              className="institutional-image"
              initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            >
              <div className="image-wrapper-premium">
                <i className="ri-team-line main-icon"></i>
                <div className="floating-elements">
                  <div className="float-icon-glass f-1"><i className="ri-code-s-slash-line text-blue-500"></i></div>
                  <div className="float-icon-glass f-2"><i className="ri-shield-keyhole-line text-green-500"></i></div>
                  <div className="float-icon-glass f-3"><i className="ri-server-line text-purple-500"></i></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mvv-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title-modern">O Nosso ADN</h2>
          </div>
          
          <motion.div 
            className="mvv-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once:true, margin:"-50px" }}
          >
            {mvv.map((item, index) => (
              <motion.div key={index} className="mvv-card-premium" variants={itemVariants}>
                <div className="mvv-icon-glow" style={{ background: `linear-gradient(135deg, ${item.cor}, ${item.cor}dd)`, boxShadow: `0 10px 20px -5px ${item.cor}80` }}>
                  <i className={item.icone}></i>
                </div>
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="history-section">
        <div className="container">
          <div className="history-content">
            <motion.div 
              className="history-text"
              initial={{ opacity:0, x:-50 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            >
              <span className="section-subtitle">NOSSO LEGADO</span>
              <h2>A Jornada até Aqui</h2>
              <p>
                A JD Tecnologia iniciou as suas atividades num modesto escritório em Luanda, impulsionada por uma
                visão audaciosa de 5 profissionais. Hoje, operamos infraestruturas críticas e desenvolvemos software
                para as maiores instituições do país.
              </p>
              <p>
                A nossa história é marcada por superação e marcos históricos: a modernização de data centers em 2015,
                o desenvolvimento de plataformas governamentais em 2018 e a liderança em cibersegurança em 2022.
              </p>
            </motion.div>
            <motion.div 
              className="history-carousel-wrapper"
              initial={{ opacity:0, x:50 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            >
              <div className="carousel-glass-frame">
                <Carousel slides={historySlides} autoPlay={true} interval={4000} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="team-section-premium">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">TALENTO HUMANO</span>
            <h2 className="section-title-modern">A Nossa Equipa</h2>
            <p className="section-description">As mentes brilhantes por trás de cada linha de código.</p>
          </div>
          
          {loading ? (
             <div className="team-grid">
               {[1,2,3].map(i => <div key={i} className="skeleton-card"></div>)}
             </div>
          ) : (
            <motion.div 
              className="team-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once:true, margin:"-50px" }}
            >
              {equipe.map((membro) => (
                <motion.div key={membro.id} className="team-card-modern" variants={itemVariants} onClick={() => setSelectedMember(membro)}>
                  <div className="team-photo-modern">
                    <img src={membro.foto} alt={membro.nome} />
                    <div className="team-overlay-modern">
                      <div className="view-profile-btn">
                        <span>Ver Perfil</span>
                        <i className="ri-arrow-right-up-line"></i>
                      </div>
                    </div>
                  </div>
                  <div className="team-info-modern">
                    <h3>{membro.nome}</h3>
                    <p className="team-role">{membro.cargo}</p>
                    <div className="team-social-modern">
                      {membro.redesSociais.linkedin && (
                        <a href={membro.redesSociais.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <i className="ri-linkedin-fill"></i>
                        </a>
                      )}
                      {membro.redesSociais.github && (
                        <a href={membro.redesSociais.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <i className="ri-github-fill"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title=""
        size="large"
      >
        <AnimatePresence>
          {selectedMember && (
            <motion.div 
              className="team-modal-content-modern"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            >
              <div className="modal-gallery-modern">
                {selectedMember.galeria && selectedMember.galeria.length > 0 ? (
                  <Carousel 
                    slides={selectedMember.galeria.map((img, idx) => ({
                      id: idx, image: img, title: '', description: ''
                    }))}
                    autoPlay={true}
                    interval={3000}
                  />
                ) : (
                   <img src={selectedMember.foto} alt={selectedMember.nome} className="modal-fallback-img" />
                )}
              </div>
              <div className="modal-info-modern">
                <h2>{selectedMember.nome}</h2>
                <div className="modal-badge">{selectedMember.cargo}</div>
                <p className="modal-bio-modern">{selectedMember.bio}</p>
                
                <div className="modal-social-grid">
                  {selectedMember.redesSociais.linkedin && (
                    <a href={selectedMember.redesSociais.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill linkedin">
                      <i className="ri-linkedin-fill"></i> LinkedIn
                    </a>
                  )}
                  {selectedMember.redesSociais.github && (
                    <a href={selectedMember.redesSociais.github} target="_blank" rel="noopener noreferrer" className="social-pill github">
                      <i className="ri-github-fill"></i> GitHub
                    </a>
                  )}
                  {selectedMember.redesSociais.email && (
                    <a href={`mailto:${selectedMember.redesSociais.email}`} className="social-pill email">
                      <i className="ri-mail-send-line"></i> Contactar
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>

      <style jsx="true">{`
        /* Hero Section Premium */
        .about-hero {
          position: relative;
          background: #0f172a;
          padding: 160px 0 100px;
          color: white;
          text-align: center;
          overflow: hidden;
        }

        .hero-gradient-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        }

        .relative-z { position: relative; z-index: 10; }

        .about-hero h1 {
          font-size: 3.5rem;
          margin-bottom: 25px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .about-hero p {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
          color: #94a3b8;
          line-height: 1.6;
        }

        /* Institutional Section */
        .institutional-section { padding: 120px 0; background: #ffffff; }
        .institutional-content { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }

        .section-subtitle {
          color: #3b82f6; font-weight: 700; letter-spacing: 2px;
          font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 15px;
        }

        .institutional-text h2 { font-size: 2.5rem; color: #0f172a; margin-bottom: 25px; font-weight: 800; line-height: 1.2; letter-spacing:-0.5px;}
        .institutional-text p { color: #475569; line-height: 1.8; margin-bottom: 20px; font-size: 1.05rem; }

        .image-wrapper-premium {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          border-radius: 30px;
          padding: 40px;
          position: relative;
          min-height: 450px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.3);
        }

        .main-icon { font-size: 140px; color: rgba(255,255,255,0.1); }
        .floating-elements { position: absolute; top:0; left:0; right:0; bottom:0; }
        
        .float-icon-glass {
          position: absolute; width: 70px; height: 70px;
          background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2); border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 30px;
        }

        .text-blue-500 { color: #3b82f6; }
        .text-green-500 { color: #10b981; }
        .text-purple-500 { color: #a855f7; }

        .f-1 { top: 15%; left: -20px; animation: float 4s ease-in-out infinite; }
        .f-2 { bottom: 15%; right: -20px; animation: float 5s ease-in-out infinite 1s; }
        .f-3 { top: 50%; right: 20px; animation: float 4.5s ease-in-out infinite 0.5s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        /* MVV Section */
        .mvv-section { padding: 100px 0; background: #f8fafc; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-title-modern { font-size: 2.8rem; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }

        .mvv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        
        .mvv-card-premium {
          background: white; padding: 50px 40px; border-radius: 24px;
          text-align: center; border: 1px solid #f1f5f9;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05); transition: all 0.4s ease;
        }
        .mvv-card-premium:hover { transform: translateY(-10px); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); }

        .mvv-icon-glow {
          width: 80px; height: 80px; margin: 0 auto 30px; border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 40px; color: white;
        }

        .mvv-card-premium h3 { font-size: 1.6rem; margin-bottom: 20px; color: #0f172a; font-weight: 800; }
        .mvv-card-premium p { color: #64748b; line-height: 1.7; font-size: 1.05rem; }

        /* History Section */
        .history-section { padding: 120px 0; background: white; }
        .history-content { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .history-text h2 { font-size: 2.5rem; color: #0f172a; margin-bottom: 25px; font-weight: 800; line-height: 1.2; letter-spacing:-0.5px;}
        .history-text p { color: #475569; line-height: 1.8; margin-bottom: 20px; font-size: 1.05rem; }
        
        .carousel-glass-frame {
          padding: 15px; background: #f8fafc; border-radius: 30px; border: 1px solid #e2e8f0;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); overflow: hidden;
        }

        /* Team Section Premium */
        .team-section-premium { padding: 120px 0; background: #f8fafc; }
        .section-description { color: #64748b; font-size: 1.1rem; margin-top: 15px; }

        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; }
        
        .team-card-modern {
          background: white; border-radius: 24px; overflow: hidden; cursor: pointer;
          border: 1px solid #f1f5f9; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05); transition: all 0.4s ease;
        }
        .team-card-modern:hover { transform: translateY(-10px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); border-color: #e2e8f0; }

        .team-photo-modern { position: relative; height: 320px; overflow: hidden; }
        .team-photo-modern img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .team-card-modern:hover .team-photo-modern img { transform: scale(1.05); }

        .team-overlay-modern {
          position: absolute; top:0; left:0; right:0; bottom:0;
          background: linear-gradient(to top, rgba(15,23,42,0.9), transparent);
          display: flex; align-items: flex-end; justify-content: center; padding-bottom: 30px;
          opacity: 0; transition: opacity 0.4s ease;
        }
        .team-card-modern:hover .team-overlay-modern { opacity: 1; }

        .view-profile-btn {
          background: white; color: #0f172a; padding: 10px 20px; border-radius: 30px;
          font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 0.9rem;
          transform: translateY(20px); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .team-card-modern:hover .view-profile-btn { transform: translateY(0); }

        .team-info-modern { padding: 30px 25px; text-align: center; }
        .team-info-modern h3 { font-size: 1.4rem; color: #0f172a; font-weight: 800; margin-bottom: 5px; }
        .team-role { color: #3b82f6; font-weight: 600; font-size: 0.95rem; margin-bottom: 20px; }
        
        .team-social-modern { display: flex; justify-content: center; gap: 15px; }
        .team-social-modern a { 
          width: 40px; height: 40px; border-radius: 50%; background: #f1f5f9;
          display: flex; align-items: center; justify-content: center; color: #475569;
          transition: all 0.3s; font-size: 1.2rem;
        }
        .team-social-modern a:hover { background: #0f172a; color: white; transform: translateY(-3px); }

        /* Loading Skeletons */
        .skeleton-card { height: 450px; background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: loading 1.5s infinite; border-radius: 24px; }

        /* Modal Premium */
        .team-modal-content-modern { display: grid; grid-template-columns: 1.2fr 1fr; gap: 0; }
        .modal-gallery-modern { height: 100%; background: #f8fafc; }
        .modal-fallback-img { width: 100%; height: 100%; object-fit: cover; }
        
        .modal-info-modern { padding: 50px 40px; display: flex; flex-direction: column; justify-content: center;}
        .modal-info-modern h2 { font-size: 2.2rem; color: #0f172a; font-weight: 800; margin-bottom: 10px; line-height: 1.1; }
        
        .modal-badge {
          display: inline-block; padding: 6px 16px; background: rgba(59, 130, 246, 0.1); color: #3b82f6;
          border-radius: 20px; font-weight: 700; font-size: 0.9rem; margin-bottom: 30px;
        }

        .modal-bio-modern { color: #475569; line-height: 1.8; font-size: 1.05rem; margin-bottom: 40px; }

        .modal-social-grid { display: flex; flex-direction: column; gap: 12px; }
        .social-pill {
          display: flex; align-items: center; gap: 12px; padding: 14px 20px;
          border-radius: 12px; font-weight: 600; text-decoration: none; transition: all 0.3s ease;
        }
        .social-pill i { font-size: 1.2rem; }
        
        .linkedin { background: #f0f7ff; color: #0077b5; }
        .linkedin:hover { background: #0077b5; color: white; }
        
        .github { background: #f1f5f9; color: #0f172a; }
        .github:hover { background: #0f172a; color: white; }
        
        .email { background: #fff7ed; color: #ea580c; }
        .email:hover { background: #ea580c; color: white; }

        @media (max-width: 992px) {
          .about-hero h1 { font-size: 2.5rem; }
          .institutional-content, .history-content { grid-template-columns: 1fr; gap: 50px; text-align: center; }
          .image-wrapper-premium { margin-top: 30px; }
          .float-icon-glass { display: none; } /* Hide floating elements on mobile to prevent overflow */
          .team-modal-content-modern { grid-template-columns: 1fr; }
          .modal-gallery-modern { height: 300px; }
          .modal-info-modern { padding: 30px 20px; }
        }
      `}</style>
    </div>
  );
};

export default About;