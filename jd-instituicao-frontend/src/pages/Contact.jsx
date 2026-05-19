// Página Contato - Formulário de contato, informações e mapa
import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/Forms/ContactForm';

const Contact = () => {
  const contactInfo = {
    endereco: 'Rua da Tecnologia, 123 - Edifício Tech Center, 5º Andar',
    bairro: 'Zamba 2',
    cidade: 'Luanda',
    pais: 'Angola',
    telefone: '+244 929 431 541',
    whatsapp: '+244 929 431 541',
    email: 'jd.hrtecnogias@gmail.com',
    emailComercial: 'jd.hrtecnologias@gmail.com',
    emailSuporte: 'jd.hrtecnologias@gmail.com',
    horarioSemana: 'Segunda a Sexta: 09h às 17h',
    horarioSabado: 'Sábado: 8h às 12h',
    horarioDomingo: 'Domingo: Fechado'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero-premium">
        <div className="hero-gradient-bg"></div>
        <div className="container relative-z">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="hero-badge">FALE CONNOSCO</span>
            <h1>Entre em Contato</h1>
            <p>A nossa equipa de especialistas está pronta para ouvir o seu desafio e propor a melhor solução tecnológica.</p>
          </motion.div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container">
          <div className="contact-wrapper-modern">
            <motion.div 
              className="contact-form-premium"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-form-header">
                <h2>Envie uma mensagem</h2>
                <p>Preencha o formulário e retornaremos o mais breve possível.</p>
              </div>
              <ContactForm />
            </motion.div>

            <motion.div 
              className="contact-info-premium"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="contact-info-header">
                <h2>Informações de Contato</h2>
                <p>Nossos canais de atendimento direto.</p>
              </div>

              <motion.div className="info-card-modern" variants={itemVariants}>
                <div className="info-icon-wrapper"><i className="ri-map-pin-2-fill"></i></div>
                <div className="info-content-modern">
                  <h3>Sede Global</h3>
                  <p>{contactInfo.endereco}</p>
                  <p>{contactInfo.bairro}, {contactInfo.cidade} - {contactInfo.pais}</p>
                </div>
              </motion.div>

              <motion.div className="info-card-modern" variants={itemVariants}>
                <div className="info-icon-wrapper"><i className="ri-phone-fill"></i></div>
                <div className="info-content-modern">
                  <h3>Telefone & WhatsApp</h3>
                  <a href={`tel:${contactInfo.telefone}`} className="contact-link">{contactInfo.telefone}</a>
                  <a href={`https://wa.me/${contactInfo.whatsapp}`} className="contact-link whatsapp"><i className="ri-whatsapp-fill"></i> Chat no WhatsApp</a>
                </div>
              </motion.div>

              <motion.div className="info-card-modern" variants={itemVariants}>
                <div className="info-icon-wrapper"><i className="ri-mail-send-fill"></i></div>
                <div className="info-content-modern">
                  <h3>Endereços de Email</h3>
                  <a href={`mailto:${contactInfo.emailComercial}`} className="contact-link"><i className="ri-briefcase-line"></i> {contactInfo.emailComercial}</a>
                  <a href={`mailto:${contactInfo.emailSuporte}`} className="contact-link"><i className="ri-customer-service-2-line"></i> {contactInfo.emailSuporte}</a>
                </div>
              </motion.div>

              <motion.div className="info-card-modern" variants={itemVariants}>
                <div className="info-icon-wrapper"><i className="ri-time-fill"></i></div>
                <div className="info-content-modern">
                  <h3>Horário de Atendimento</h3>
                  <p>{contactInfo.horarioSemana}</p>
                  <p>{contactInfo.horarioSabado}</p>
                  <p className="closed-badge">{contactInfo.horarioDomingo}</p>
                </div>
              </motion.div>

              <motion.div className="social-glass-card" variants={itemVariants}>
                <h3>Conecte-se Connosco</h3>
                <div className="social-icons-modern">
                  <a href="https://instagram.com/jdtecnologia" target="_blank" rel="noopener noreferrer"><i className="ri-instagram-line"></i></a>
                  <a href="https://linkedin.com/company/jdtecnologia" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-fill"></i></a>
                  <a href="https://facebook.com/jdtecnologia" target="_blank" rel="noopener noreferrer"><i className="ri-facebook-circle-fill"></i></a>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      <section className="map-section-premium">
        <div className="container">
          <motion.div 
            className="map-container-modern"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="map-overlay-card">
              <h3>Visite-nos</h3>
              <p>Venha tomar um café e conversar sobre o seu próximo grande projeto.</p>
            </div>
            <iframe
              title="Mapa JD Tecnologia"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d13.2345!3d-8.8383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f2e2e2e2e2e%3A0x2e2e2e2e2e2e2e2e!2sLuanda%2C%20Angola!5e0!3m2!1spt!2s!4v1234567890123!5m2!1spt!2s"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      <section className="faq-section-premium">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle">TIRA-DÚVIDAS</span>
            <h2>Perguntas Frequentes</h2>
          </div>
          <motion.div 
            className="faq-grid-modern"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="faq-card-modern" variants={itemVariants}>
              <div className="faq-icon"><i className="ri-question-answer-line"></i></div>
              <div className="faq-content">
                <h3>Como solicitar um orçamento?</h3>
                <p>Preencha o formulário ao lado com os detalhes do seu projeto. Nossa equipa técnica fará uma análise inicial e entrará em contato em até 24h úteis com uma proposta ou pedido de reunião.</p>
              </div>
            </motion.div>
            <motion.div className="faq-card-modern" variants={itemVariants}>
              <div className="faq-icon"><i className="ri-timer-line"></i></div>
              <div className="faq-content">
                <h3>Qual o prazo médio de entrega?</h3>
                <p>O cronograma varia consoante a complexidade do projeto. Soluções web simples levam 2-4 semanas, enquanto sistemas personalizados e apps mobile podem levar de 2 a 6 meses.</p>
              </div>
            </motion.div>
            <motion.div className="faq-card-modern" variants={itemVariants}>
              <div className="faq-icon"><i className="ri-earth-line"></i></div>
              <div className="faq-content">
                <h3>Atendem fora de Luanda?</h3>
                <p>Absolutamente. Atendemos empresas em todo o território nacional de Angola e temos uma carteira crescente de clientes internacionais, colaborando de forma 100% remota.</p>
              </div>
            </motion.div>
            <motion.div className="faq-card-modern" variants={itemVariants}>
              <div className="faq-icon"><i className="ri-customer-service-line"></i></div>
              <div className="faq-content">
                <h3>Oferecem suporte pós-entrega?</h3>
                <p>Sim! Todos os nossos projetos incluem um período de garantia e oferecemos planos de manutenção contínua (SLAs) para garantir que o seu software está sempre seguro e atualizado.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx="true">{`
        /* Hero Section */
        .contact-hero-premium {
          position: relative; background: #0f172a; padding: 160px 0 100px;
          color: white; text-align: center; overflow: hidden;
        }
        .hero-gradient-bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.2) 0%, transparent 60%),
                      url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1920&q=80') center/cover;
          opacity: 0.3; mix-blend-mode: overlay;
        }
        .relative-z { position: relative; z-index: 10; }
        .hero-badge {
          display: inline-block; padding: 6px 16px; background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 20px;
          font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; margin-bottom: 20px; backdrop-filter: blur(4px);
        }
        .contact-hero-premium h1 { font-size: 3.5rem; margin-bottom: 20px; font-weight: 800; letter-spacing: -1px; }
        .contact-hero-premium p { font-size: 1.25rem; max-width: 650px; margin: 0 auto; color: #cbd5e1; line-height: 1.6; }

        /* Main Contact Section */
        .contact-main-section { padding: 100px 0; background: #f8fafc; }
        .contact-wrapper-modern { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: flex-start; }

        .contact-form-premium {
          background: white; padding: 50px; border-radius: 24px;
          box-shadow: 0 20px 40px -10px rgba(15,23,42,0.08); border: 1px solid #f1f5f9;
        }
        .contact-form-header { margin-bottom: 30px; }
        .contact-form-header h2 { font-size: 2rem; color: #0f172a; font-weight: 800; margin-bottom: 10px; }
        .contact-form-header p { color: #64748b; font-size: 1.05rem; }

        .contact-info-premium { display: flex; flex-direction: column; gap: 20px; }
        .contact-info-header { margin-bottom: 10px; }
        .contact-info-header h2 { font-size: 2rem; color: #0f172a; font-weight: 800; margin-bottom: 10px; }
        .contact-info-header p { color: #64748b; font-size: 1.05rem; }

        .info-card-modern {
          display: flex; gap: 20px; padding: 25px; background: white; border-radius: 20px;
          border: 1px solid #f1f5f9; transition: all 0.3s ease; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }
        .info-card-modern:hover { transform: translateX(10px); box-shadow: 0 15px 30px -10px rgba(15,23,42,0.1); border-color: #e2e8f0; }

        .info-icon-wrapper {
          width: 54px; height: 54px; background: #eff6ff; color: #3b82f6; font-size: 24px;
          display: flex; align-items: center; justify-content: center; border-radius: 16px; flex-shrink: 0;
        }

        .info-content-modern h3 { font-size: 1.1rem; color: #0f172a; font-weight: 700; margin-bottom: 8px; }
        .info-content-modern p { color: #64748b; margin-bottom: 4px; line-height: 1.5; font-size: 0.95rem; }
        
        .contact-link { display: inline-flex; align-items: center; gap: 8px; color: #3b82f6; text-decoration: none; font-weight: 500; margin-bottom: 8px; transition: color 0.2s; }
        .contact-link:hover { color: #1d4ed8; text-decoration: underline; }
        .contact-link.whatsapp { color: #10b981; }
        .contact-link.whatsapp:hover { color: #059669; }

        .closed-badge { display: inline-block; padding: 2px 8px; background: #fee2e2; color: #ef4444; border-radius: 12px; font-size: 0.8rem; font-weight: 700; margin-top: 5px; }

        .social-glass-card {
          background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; border-radius: 20px;
          color: white; text-align: center; margin-top: 10px; position: relative; overflow: hidden;
        }
        .social-glass-card::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%); pointer-events: none;
        }
        .social-glass-card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; position: relative; z-index: 1; }
        .social-icons-modern { display: flex; justify-content: center; gap: 15px; position: relative; z-index: 1; }
        .social-icons-modern a {
          width: 50px; height: 50px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: white;
          transition: all 0.3s ease; backdrop-filter: blur(4px);
        }
        .social-icons-modern a:hover { background: #3b82f6; transform: translateY(-5px); border-color: #3b82f6; }

        /* Map Section */
        .map-section-premium { padding: 0 0 100px; background: #f8fafc; }
        .map-container-modern {
          position: relative; border-radius: 30px; overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(15,23,42,0.15); border: 8px solid white;
        }
        .map-overlay-card {
          position: absolute; top: 30px; left: 30px; background: rgba(255,255,255,0.95);
          padding: 25px; border-radius: 20px; max-width: 300px; backdrop-filter: blur(10px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 10;
        }
        .map-overlay-card h3 { color: #0f172a; font-weight: 800; font-size: 1.3rem; margin-bottom: 8px; }
        .map-overlay-card p { color: #64748b; font-size: 0.95rem; line-height: 1.5; }

        /* FAQ Section */
        .faq-section-premium { padding: 100px 0; background: white; }
        .section-header-modern { text-align: center; margin-bottom: 60px; }
        .section-subtitle { display: block; color: #3b82f6; font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 15px; }
        .section-header-modern h2 { font-size: 2.8rem; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }

        .faq-grid-modern { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px; max-width: 1000px; margin: 0 auto; }
        .faq-card-modern {
          display: flex; gap: 20px; background: #f8fafc; padding: 30px; border-radius: 20px;
          border: 1px solid #f1f5f9; transition: all 0.3s ease;
        }
        .faq-card-modern:hover { transform: translateY(-5px); background: white; box-shadow: 0 20px 40px -10px rgba(15,23,42,0.08); border-color: #e2e8f0; }
        
        .faq-icon { width: 48px; height: 48px; background: #e0e7ff; color: #4f46e5; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        
        .faq-content h3 { font-size: 1.2rem; color: #0f172a; font-weight: 800; margin-bottom: 12px; line-height: 1.3; }
        .faq-content p { color: #64748b; line-height: 1.6; font-size: 0.95rem; }

        @media (max-width: 1024px) {
          .contact-wrapper-modern { grid-template-columns: 1fr; }
          .contact-form-premium { padding: 40px 30px; }
          .map-overlay-card { display: none; }
          .faq-grid-modern { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .contact-hero-premium h1 { font-size: 2.5rem; }
          .faq-card-modern { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Contact;