// Página Serviços - Listagem de serviços oferecidos pela empresa
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesService } from '../services/api';

const Services = () => {
  const [servicos, setServicos] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
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
    const fetchServices = async () => {
      try {
        const response = await servicesService.getServices();
        setServicos(response.data);
      } catch (error) {
        console.warn('Backend indisponível, usando dados mockados.');
        setServicos([
          {
            id: 1,
            titulo: 'Desenvolvimento Web',
            descricao: 'Criamos sites institucionais, e-commerces, portais e aplicações web modernas, responsivas e otimizadas para SEO.',
            descricaoCompleta: 'Nossos projetos web são desenvolvidos com foco em performance, segurança e experiência do usuário. Trabalhamos com metodologias ágeis para entregar soluções que atendem exatamente às necessidades do seu negócio.',
            icone: 'ri-code-box-line',
            cor: '#4299e1',
            features: ['Responsivo', 'Otimizado para SEO', 'Alta performance', 'Seguro'],
            preco: 'Sob consulta'
          },
          {
            id: 2,
            titulo: 'Aplicativos Móveis',
            descricao: 'Desenvolvemos aplicativos nativos e híbridos para iOS e Android, com interfaces intuitivas e alta performance.',
            descricaoCompleta: 'Criamos apps para os mais diversos segmentos: e-commerce, saúde, educação, finanças, entre outros. Utilizamos React Native e Flutter para garantir qualidade e eficiência.',
            icone: 'ri-smartphone-line',
            cor: '#48bb78',
            features: ['iOS e Android', 'UI/UX otimizado', 'Push notifications', 'Offline first'],
            preco: 'Sob consulta'
          },
          {
            id: 3,
            titulo: 'Cibersegurança',
            descricao: 'Proteção avançada contra ameaças cibernéticas, auditoria de segurança e conformidade com LGPD.',
            descricaoCompleta: 'Oferecemos soluções completas em segurança da informação: pentest, análise de vulnerabilidades, proteção contra DDoS, backup e recuperação de dados.',
            icone: 'ri-shield-check-line',
            cor: '#e53e3e',
            features: ['Pentest', 'Monitoramento 24/7', 'Backup automatizado', 'LGPD compliance'],
            preco: 'Sob consulta'
          },
          {
            id: 4,
            titulo: 'Análise de Dados',
            descricao: 'Transformamos dados em insights valiosos para tomada de decisão com dashboards interativos.',
            descricaoCompleta: 'Utilizamos ferramentas de Business Intelligence e ciência de dados para ajudar sua empresa a tomar decisões mais assertivas baseadas em dados reais.',
            icone: 'ri-bar-chart-2-line',
            cor: '#ed8936',
            features: ['Dashboards customizados', 'ETL', 'Machine Learning', 'Relatórios automáticos'],
            preco: 'Sob consulta'
          },
          {
            id: 5,
            titulo: 'Consultoria em TI',
            descricao: 'Ajudamos sua empresa a definir a melhor estratégia tecnológica para alcançar seus objetivos.',
            descricaoCompleta: 'Nossa equipe de consultores experientes avalia sua infraestrutura, processos e necessidades para propor soluções alinhadas ao seu negócio.',
            icone: 'ri-group-line',
            cor: '#9f7aea',
            features: ['Análise de infraestrutura', 'Planejamento estratégico', 'Gestão de projetos', 'Treinamento'],
            preco: 'Sob consulta'
          },
          {
            id: 6,
            titulo: 'Design UX/UI',
            descricao: 'Criamos experiências digitais memoráveis com interfaces bonitas, intuitivas e centradas no usuário.',
            descricaoCompleta: 'Nossos designers criam protótipos interativos, realizam testes de usabilidade e garantem que seu produto digital ofereça a melhor experiência possível.',
            icone: 'ri-palette-line',
            cor: '#f6ad55',
            features: ['Pesquisa com usuários', 'Wireframes', 'Protótipos', 'Testes de usabilidade'],
            preco: 'Sob consulta'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="hero-gradient-overlay"></div>
        <div className="container relative-z">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nossos Serviços
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Soluções tecnológicas completas para impulsionar seu negócio no mercado digital
          </motion.p>
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/contato" className="btn btn-primary btn-glow">
              <i className="ri-calculator-line"></i> Solicitar Orçamento
            </Link>
            <Link to="/portfolio" className="btn btn-secondary">
              <i className="ri-briefcase-line"></i> Ver Portfólio
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="services-illustration">
        <div className="container">
          <div className="illustration-content">
            <motion.div 
              className="tech-icons"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="tech-circle float-anim-1"><i className="ri-settings-4-line"></i></div>
              <div className="tech-circle float-anim-2"><i className="ri-window-line"></i></div>
              <div className="tech-circle float-anim-3"><i className="ri-cloud-line"></i></div>
            </motion.div>
            <motion.div 
              className="diferenciais"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3>Por que escolher a JD Tecnologia?</h3>
              <ul>
                <li><i className="ri-checkbox-circle-fill text-green-500"></i> Equipe especializada e certificada</li>
                <li><i className="ri-checkbox-circle-fill text-green-500"></i> Metodologias ágeis e modernas</li>
                <li><i className="ri-checkbox-circle-fill text-green-500"></i> Suporte técnico dedicado 24/7</li>
                <li><i className="ri-checkbox-circle-fill text-green-500"></i> Soluções personalizadas para o contexto angolano</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="services-list">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">O QUE OFERECEMOS</span>
            <h2 className="section-title-modern">Catálogo de Serviços</h2>
          </div>
          
          {loading ? (
             <div className="services-grid">
               {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-card"></div>)}
             </div>
          ) : (
            <motion.div 
              className="services-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {servicos.map((servico) => (
                <motion.div 
                  key={servico.id} 
                  className="service-card-premium" 
                  variants={itemVariants}
                  onClick={() => setSelectedService(servico)}
                >
                  <div className="service-icon-wrapper" style={{ background: `linear-gradient(135deg, ${servico.cor}22, ${servico.cor}44)` }}>
                    <i className={servico.icone} style={{ color: servico.cor }}></i>
                  </div>
                  <h3>{servico.titulo}</h3>
                  <p>{servico.descricao}</p>
                  <div className="service-features">
                    {servico.features.slice(0,2).map((feature, idx) => (
                      <span key={idx} className="feature-tag-modern">{feature}</span>
                    ))}
                    {servico.features.length > 2 && <span className="feature-tag-modern">+{servico.features.length - 2}</span>}
                  </div>
                  <button className="service-btn-modern" style={{ color: servico.cor }}>
                    Ver Detalhes <i className="ri-arrow-right-line"></i>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="service-modal-overlay" 
            onClick={() => setSelectedService(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="service-modal-glass" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button className="modal-close-modern" onClick={() => setSelectedService(null)}>
                <i className="ri-close-line"></i>
              </button>
              
              <div className="modal-header-gradient" style={{ background: `linear-gradient(135deg, ${selectedService.cor}, ${selectedService.cor}dd)` }}>
                <div className="modal-icon-large">
                  <i className={selectedService.icone}></i>
                </div>
                <h2>{selectedService.titulo}</h2>
              </div>
              
              <div className="modal-body-content">
                <p className="modal-description-modern">{selectedService.descricaoCompleta}</p>
                
                <div className="modal-features-grid">
                  <h3>Características Principais:</h3>
                  <ul>
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx}>
                        <div className="check-icon-wrapper" style={{ color: selectedService.cor, backgroundColor: `${selectedService.cor}22` }}>
                          <i className="ri-check-line"></i>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-price-modern">
                  <span className="price-label">Investimento Estimado:</span>
                  <span className="price-value" style={{ color: selectedService.cor }}>{selectedService.preco}</span>
                </div>
                
                <Link to="/contato" className="btn-modal-action" style={{ background: selectedService.cor }}>
                  Solicitar Orçamento
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="process-section-premium">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">COMO TRABALHAMOS</span>
            <h2 className="section-title-modern">Nosso Processo</h2>
          </div>
          
          <div className="process-steps-modern">
            <motion.div className="step-card" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.1 }}>
              <div className="step-number-gradient">01</div>
              <div className="step-content-modern">
                <h3>Descoberta</h3>
                <p>Análise profunda das suas necessidades e objetivos de negócio.</p>
              </div>
            </motion.div>
            <motion.div className="step-card" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.2 }}>
              <div className="step-number-gradient">02</div>
              <div className="step-content-modern">
                <h3>Planejamento</h3>
                <p>Criação da arquitetura, design system e cronograma detalhado.</p>
              </div>
            </motion.div>
            <motion.div className="step-card" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.3 }}>
              <div className="step-number-gradient">03</div>
              <div className="step-content-modern">
                <h3>Desenvolvimento</h3>
                <p>Execução técnica com metodologias ágeis e testes contínuos.</p>
              </div>
            </motion.div>
            <motion.div className="step-card" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.4 }}>
              <div className="step-number-gradient">04</div>
              <div className="step-content-modern">
                <h3>Entrega & Suporte</h3>
                <p>Lançamento do produto e monitoramento constante 24/7.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="cta-section-premium">
        <div className="container relative-z">
          <h2>Pronto para escalar seu negócio?</h2>
          <p>Nossa equipe de especialistas está pronta para transformar sua visão em realidade tecnológica.</p>
          <Link to="/contato" className="btn btn-large btn-glow-white">
            <i className="ri-customer-service-line"></i> Fale com um Especialista
          </Link>
        </div>
      </section>

      <style jsx="true">{`
        /* Hero Section */
        .services-hero {
          position: relative;
          background: #0f172a;
          padding: 140px 0 100px;
          color: white;
          text-align: center;
          overflow: hidden;
        }

        .hero-gradient-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.4) 0%, transparent 60%);
        }

        .relative-z { position: relative; z-index: 10; }

        .services-hero h1 { 
          font-size: 3.5rem; 
          margin-bottom: 20px; 
          font-weight: 800;
          letter-spacing: -1px;
        }
        
        .services-hero p { 
          font-size: 1.25rem; 
          margin-bottom: 40px; 
          max-width: 600px; 
          margin-left: auto; 
          margin-right: auto; 
          color: #94a3b8;
        }

        .hero-buttons { 
          display: flex; 
          gap: 20px; 
          justify-content: center; 
        }

        .btn { 
          padding: 14px 32px; 
          border-radius: 12px; 
          font-weight: 600; 
          text-decoration: none; 
          transition: all 0.3s ease; 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
        }

        .btn-primary { background: #3b82f6; color: white; }
        .btn-glow:hover { box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5); transform: translateY(-2px); }
        .btn-secondary { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(10px); }
        .btn-secondary:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.4); }

        /* Illustration Section */
        .services-illustration { 
          padding: 80px 0; 
          background: #ffffff; 
        }
        
        .illustration-content { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 80px; 
          align-items: center; 
        }
        
        .tech-icons { 
          display: flex; 
          justify-content: center; 
          gap: 30px; 
          position: relative;
        }
        
        .tech-circle { 
          width: 100px; 
          height: 100px; 
          background: #ffffff; 
          border-radius: 24px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 40px; 
          color: #3b82f6; 
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); 
        }

        .float-anim-1 { animation: float 4s ease-in-out infinite; }
        .float-anim-2 { animation: float 5s ease-in-out infinite 1s; }
        .float-anim-3 { animation: float 4.5s ease-in-out infinite 0.5s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .diferenciais h3 { 
          font-size: 1.8rem; 
          margin-bottom: 25px; 
          color: #0f172a; 
          font-weight: 800;
        }
        
        .diferenciais ul { list-style: none; }
        .diferenciais li { 
          margin-bottom: 18px; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          color: #475569; 
          font-size: 1.05rem;
        }
        .text-green-500 { color: #22c55e; font-size: 22px; }

        /* Services List Premium */
        .services-list { 
          padding: 100px 0; 
          background: #f8fafc; 
        }

        .section-header { text-align: center; margin-bottom: 60px; }
        .section-subtitle { color: #3b82f6; font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 10px; }
        .section-title-modern { font-size: 2.8rem; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }

        .services-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
          gap: 30px; 
        }

        .service-card-premium { 
          background: white; 
          border-radius: 24px; 
          padding: 40px 30px; 
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05); 
          transition: all 0.3s ease; 
          cursor: pointer; 
          display: flex;
          flex-direction: column;
        }

        .service-card-premium:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); 
          border-color: #e2e8f0;
        }

        .service-icon-wrapper { 
          width: 65px; 
          height: 65px; 
          border-radius: 16px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 30px; 
          margin-bottom: 25px; 
        }

        .service-card-premium h3 { font-size: 1.4rem; margin-bottom: 15px; color: #0f172a; font-weight: 700;}
        .service-card-premium p { color: #64748b; line-height: 1.6; margin-bottom: 25px; flex-grow: 1; font-size: 0.95rem; }
        
        .service-features { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 25px; }
        .feature-tag-modern { background: #f1f5f9; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; color: #475569; font-weight: 500; }
        
        .service-btn-modern { 
          background: none; 
          font-weight: 600; 
          display: inline-flex; 
          align-items: center; 
          gap: 5px; 
          padding: 0; 
          font-size: 1rem;
          margin-top: auto;
          transition: gap 0.3s ease;
        }
        .service-card-premium:hover .service-btn-modern { gap: 10px; }

        /* Skeletons */
        .skeleton-card { height: 350px; background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: loading 1.5s infinite; border-radius: 24px; }
        @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* Modal Premium */
        .service-modal-overlay { 
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
          background: rgba(15, 23, 42, 0.7); 
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 2000; 
          padding: 20px;
        }
        
        .service-modal-glass { 
          background: white; 
          max-width: 650px; 
          width: 100%; 
          border-radius: 24px; 
          position: relative; 
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }

        .modal-close-modern { 
          position: absolute; 
          top: 20px; 
          right: 20px; 
          background: rgba(255,255,255,0.2); 
          backdrop-filter: blur(4px);
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; color: white; 
          z-index: 10; transition: all 0.2s;
        }
        .modal-close-modern:hover { background: rgba(255,255,255,0.4); transform: scale(1.1); }

        .modal-header-gradient {
          padding: 40px 40px 30px;
          color: white;
          text-align: center;
        }

        .modal-icon-large {
          font-size: 60px;
          margin-bottom: 10px;
          display: inline-block;
          background: rgba(255,255,255,0.2);
          width: 100px; height: 100px;
          border-radius: 24px;
          line-height: 100px;
        }

        .modal-header-gradient h2 { font-size: 2rem; font-weight: 800; }

        .modal-body-content {
          padding: 40px;
        }

        .modal-description-modern { color: #475569; line-height: 1.7; margin-bottom: 30px; font-size: 1.05rem; }
        
        .modal-features-grid { margin-bottom: 30px; }
        .modal-features-grid h3 { margin-bottom: 15px; color: #0f172a; font-size: 1.2rem; }
        .modal-features-grid ul { 
          list-style: none; 
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .modal-features-grid li { display: flex; align-items: flex-start; gap: 10px; color: #475569; font-weight: 500; }
        .check-icon-wrapper { 
          min-width: 24px; height: 24px; border-radius: 6px; 
          display: flex; align-items: center; justify-content: center;
        }

        .modal-price-modern { 
          margin-bottom: 30px; padding: 20px; 
          background: #f8fafc; border-radius: 16px; 
          display: flex; justify-content: space-between; align-items: center; 
          border: 1px solid #e2e8f0;
        }
        .price-label { font-weight: 600; color: #475569; font-size: 1.1rem; }
        .price-value { font-size: 1.5rem; font-weight: 800; }
        
        .btn-modal-action { 
          display: inline-block; width: 100%; padding: 16px; 
          color: white; text-align: center; text-decoration: none; 
          border-radius: 12px; font-weight: 600; font-size: 1.1rem;
          transition: all 0.3s ease; 
        }
        .btn-modal-action:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); filter: brightness(1.1); }

        /* Processo Premium */
        .process-section-premium { padding: 100px 0; background: white; }
        .process-steps-modern { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
          gap: 30px; 
          counter-reset: step-counter;
        }
        
        .step-card {
          background: #f8fafc;
          padding: 40px 30px;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          position: relative;
          z-index: 1;
        }

        .step-number-gradient { 
          font-size: 4rem; 
          font-weight: 900; 
          color: rgba(59, 130, 246, 0.1); 
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: -1;
          line-height: 1;
        }

        .step-content-modern h3 { 
          margin-bottom: 15px; color: #0f172a; font-size: 1.4rem; font-weight: 700;
        }
        .step-content-modern p { color: #64748b; line-height: 1.6; }

        /* CTA Premium */
        .cta-section-premium { 
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); 
          padding: 100px 0; 
          text-align: center; 
          color: white; 
          position: relative;
          overflow: hidden;
        }
        .cta-section-premium::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
        }
        .cta-section-premium h2 { font-size: 2.5rem; margin-bottom: 20px; font-weight: 800; letter-spacing: -0.5px; }
        .cta-section-premium p { margin-bottom: 40px; font-size: 1.2rem; color: #94a3b8; max-width: 600px; margin-left: auto; margin-right: auto; }
        
        .btn-large { padding: 16px 40px; font-size: 1.1rem; border-radius: 12px; }
        .btn-glow-white { background: white; color: #0f172a; font-weight: 700; }
        .btn-glow-white:hover { box-shadow: 0 10px 30px rgba(255,255,255,0.2); transform: translateY(-2px); }

        @media (max-width: 768px) {
          .services-hero h1 { font-size: 2.5rem; }
          .illustration-content { grid-template-columns: 1fr; text-align: center; }
          .tech-icons { margin-bottom: 40px; }
          .modal-features-grid ul { grid-template-columns: 1fr; }
          .modal-body-content { padding: 30px 20px; }
          .modal-header-gradient { padding: 30px 20px; }
        }
      `}</style>
    </div>
  );
};

export default Services;