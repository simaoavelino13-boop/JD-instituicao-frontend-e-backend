// Página de Artigo Individual - Exibe o conteúdo completo do post
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    
    const postsData = {
      'transformacao-digital-angola': {
        id: 1, titulo: 'Como a transformação digital pode impulsionar o seu negócio em Angola', slug: 'transformacao-digital-angola',
        conteudo: `<p class="lead">A transformação digital deixou de ser uma opção e tornou-se uma necessidade para empresas que desejam manter-se competitivas no mercado atual. Em Angola, este movimento tem ganho força nos últimos anos.</p>
        
        <h2>O que é a transformação digital?</h2>
        <p>A transformação digital é o processo de integração de tecnologias digitais em todas as áreas de um negócio, mudando fundamentalmente a forma como a empresa opera e entrega valor aos clientes. Não se trata apenas de implementar software, mas de repensar modelos de negócio.</p>
        
        <div class="quote-block">
          "A tecnologia não é o fim, mas sim o meio pelo qual as empresas alcançam resultados extraordinários e escaláveis."
        </div>
        
        <h2>Benefícios para as empresas angolanas</h2>
        <p>As empresas angolanas que investem na transformação digital podem experienciar diversos benefícios:</p>
        <ul>
          <li><strong>Aumento da eficiência operacional:</strong> Automação de tarefas repetitivas.</li>
          <li><strong>Melhor experiência do cliente:</strong> Atendimento mais rápido e personalizado.</li>
          <li><strong>Tomada de decisão baseada em dados:</strong> Insights precisos em tempo real.</li>
          <li><strong>Redução de custos:</strong> Otimização de recursos e processos.</li>
          <li><strong>Vantagem competitiva:</strong> Destaque num mercado cada vez mais globalizado.</li>
        </ul>`,
        imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop', data: '2024-01-15', autor: 'João da Silva', cargoAutor: 'CEO & Fundador', categoria: 'Transformação Digital', tags: ['tecnologia', 'inovação', 'angola'], visualizacoes: 1250, tempoLeitura: '5 min'
      },
      'ciberseguranca-protecao-empresa': {
        id: 2, titulo: 'Cibersegurança: Proteja a sua empresa contra ameaças digitais', slug: 'ciberseguranca-protecao-empresa',
        conteudo: `<p class="lead">A cibersegurança é fundamental para empresas de todos os tamanhos. Com o aumento das ameaças digitais, proteger os seus dados e sistemas nunca foi tão crítico.</p>
        
        <h2>Principais ameaças</h2>
        <p>Malware, phishing, ransomware e ataques de força bruta são algumas das ameaças mais comuns enfrentadas pelas empresas hoje em dia.</p>
        
        <h2>Como se proteger</h2>
        <p>Implemente políticas de segurança, mantenha sistemas atualizados, utilize autenticação multifator e treine os seus funcionários.</p>`,
        imagem: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop', data: '2024-01-10', autor: 'Maria Santos', cargoAutor: 'Diretora de Tecnologia', categoria: 'Segurança', tags: ['segurança', 'proteção'], visualizacoes: 890, tempoLeitura: '7 min'
      }
    };
    setPost(postsData[slug] || null);
    
    // Simulate loading delay for the premium feel
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  if (loading) return (
    <div className="premium-loader-container">
      <div className="premium-loader"></div>
      <p>A carregar o artigo...</p>
    </div>
  );
  
  if (!post) return (
    <div className="not-found-modern">
      <motion.div 
        className="container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="not-found-content-glass">
          <i className="ri-file-search-line"></i>
          <h1>Artigo não encontrado</h1>
          <p>O conteúdo que procura pode ter sido movido ou já não existe.</p>
          <Link to="/blog" className="btn-primary-modern">
            <i className="ri-arrow-left-line"></i> Voltar para o Blog
          </Link>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="blog-post-page-modern">
      <motion.div 
        className="post-hero-modern" 
        style={{ backgroundImage: `url(${post.imagem})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay-modern">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="post-category-modern">{post.categoria}</div>
              <h1>{post.titulo}</h1>
              <div className="post-meta-modern">
                <span className="meta-item"><i className="ri-user-smile-line"></i> {post.autor}</span>
                <span className="meta-item"><i className="ri-calendar-event-line"></i> {formatDate(post.data)}</span>
                <span className="meta-item"><i className="ri-time-line"></i> {post.tempoLeitura} de leitura</span>
                <span className="meta-item"><i className="ri-eye-line"></i> {post.visualizacoes} visualizações</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container">
        <div className="post-layout-modern">
          <motion.article 
            className="post-content-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="content-glass">
              <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: post.conteudo }} />
              
              <div className="tags-container">
                {post.tags.map(tag => (
                  <span key={tag} className="tag-modern">#{tag}</span>
                ))}
              </div>
              
              <div className="share-section-modern">
                <h3>Partilhe este conhecimento</h3>
                <div className="share-buttons-modern">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noreferrer" className="share-btn fb"><i className="ri-facebook-fill"></i></a>
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noreferrer" className="share-btn tw"><i className="ri-twitter-x-line"></i></a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="_blank" rel="noreferrer" className="share-btn in"><i className="ri-linkedin-fill"></i></a>
                  <a href={`https://wa.me/?text=${post.titulo} - ${window.location.href}`} target="_blank" rel="noreferrer" className="share-btn wa"><i className="ri-whatsapp-line"></i></a>
                </div>
              </div>
              
              <div className="author-box-modern">
                <div className="author-avatar-modern">
                  <div className="avatar-placeholder">
                    {post.autor.charAt(0)}
                  </div>
                </div>
                <div className="author-info-modern">
                  <h3>{post.autor}</h3>
                  <p className="author-role-modern">{post.cargoAutor}</p>
                  <p className="author-bio">Especialista em tecnologia com vasta experiência no mercado angolano, focando-se em inovação e transformação digital corporativa.</p>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.aside 
            className="post-sidebar-modern"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="sidebar-widget-glass sticky-widget">
              <div className="newsletter-premium">
                <div className="newsletter-icon">
                  <i className="ri-mail-send-line"></i>
                </div>
                <h3>Fique Atualizado</h3>
                <p>Receba os nossos melhores artigos diretamente no seu email. Sem spam, apenas conteúdo de valor.</p>
                <div className="newsletter-form-group">
                  <input type="email" placeholder="O seu email profissional" />
                  <button className="btn-subscribe">
                    <i className="ri-send-plane-fill"></i> Subscrever
                  </button>
                </div>
              </div>
            </div>
            
            <div className="sidebar-widget-glass mt-30">
              <h3 className="widget-title">Outros Artigos</h3>
              <div className="recent-posts-list">
                <Link to="/blog/ciberseguranca-protecao-empresa" className="recent-post-item">
                  <div className="rp-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop)' }}></div>
                  <div className="rp-info">
                    <h4>Cibersegurança: Proteja a sua empresa...</h4>
                    <span>10 Jan 2024</span>
                  </div>
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <style jsx="true">{`
        .blog-post-page-modern { background-color: #f8fafc; min-height: 100vh; padding-bottom: 80px; }
        
        .premium-loader-container { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0f172a; color: white; }
        .premium-loader { width: 50px; height: 50px; border: 3px solid rgba(59, 130, 246, 0.3); border-radius: 50%; border-top-color: #3b82f6; animation: spin 1s ease-in-out infinite; margin-bottom: 20px; }
        
        .not-found-modern { height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; background: #0f172a; }
        .not-found-content-glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 60px 40px; text-align: center; max-width: 500px; color: white; }
        .not-found-content-glass i { font-size: 64px; color: #3b82f6; margin-bottom: 20px; display: block; }
        .not-found-content-glass h1 { font-size: 2rem; margin-bottom: 15px; }
        .not-found-content-glass p { color: #94a3b8; margin-bottom: 30px; }
        
        .btn-primary-modern { display: inline-flex; align-items: center; gap: 10px; background: #3b82f6; color: white; padding: 14px 28px; border-radius: 12px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
        .btn-primary-modern:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3); }

        .post-hero-modern { position: relative; height: 60vh; min-height: 450px; background-size: cover; background-position: center; background-attachment: fixed; }
        .hero-overlay-modern { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%); display: flex; align-items: flex-end; padding-bottom: 60px; }
        
        .post-category-modern { display: inline-block; background: rgba(59, 130, 246, 0.2); backdrop-filter: blur(10px); border: 1px solid rgba(59, 130, 246, 0.5); color: #93c5fd; padding: 8px 20px; border-radius: 30px; font-size: 0.9rem; font-weight: 600; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px; }
        .post-hero-modern h1 { color: white; font-size: 3rem; font-weight: 800; line-height: 1.2; margin-bottom: 24px; max-width: 900px; text-wrap: balance; }
        
        .post-meta-modern { display: flex; flex-wrap: wrap; gap: 24px; color: #cbd5e1; font-size: 0.95rem; }
        .meta-item { display: flex; align-items: center; gap: 8px; }
        .meta-item i { color: #3b82f6; font-size: 1.2rem; }

        .post-layout-modern { display: grid; grid-template-columns: 2.5fr 1fr; gap: 40px; margin-top: -40px; position: relative; z-index: 10; }
        
        .content-glass { background: white; border-radius: 24px; padding: 50px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05); }
        
        .rich-text-content { color: #334155; font-size: 1.1rem; line-height: 1.8; }
        .rich-text-content p { margin-bottom: 24px; }
        .rich-text-content .lead { font-size: 1.3rem; color: #0f172a; font-weight: 500; line-height: 1.6; margin-bottom: 30px; }
        .rich-text-content h2 { font-size: 1.8rem; color: #0f172a; font-weight: 700; margin: 40px 0 20px; }
        .rich-text-content ul { margin-bottom: 24px; padding-left: 20px; }
        .rich-text-content li { margin-bottom: 10px; }
        .quote-block { border-left: 4px solid #3b82f6; background: #f8fafc; padding: 24px 30px; border-radius: 0 16px 16px 0; font-size: 1.2rem; font-style: italic; color: #475569; margin: 40px 0; }
        
        .tags-container { display: flex; gap: 10px; margin: 40px 0; flex-wrap: wrap; }
        .tag-modern { background: #f1f5f9; color: #64748b; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 500; transition: all 0.3s; cursor: pointer; }
        .tag-modern:hover { background: #e2e8f0; color: #3b82f6; }

        .share-section-modern { margin: 50px 0; padding-top: 40px; border-top: 1px solid #e2e8f0; }
        .share-section-modern h3 { font-size: 1.2rem; color: #0f172a; margin-bottom: 20px; font-weight: 600; }
        .share-buttons-modern { display: flex; gap: 12px; }
        .share-btn { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: white; transition: all 0.3s; text-decoration: none; }
        .share-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .share-btn.fb { background: #1877F2; }
        .share-btn.tw { background: #000000; }
        .share-btn.in { background: #0A66C2; }
        .share-btn.wa { background: #25D366; }

        .author-box-modern { display: flex; gap: 24px; padding: 30px; background: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0; }
        .avatar-placeholder { width: 70px; height: 70px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: 700; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3); }
        .author-info-modern h3 { font-size: 1.3rem; color: #0f172a; margin-bottom: 5px; }
        .author-role-modern { color: #3b82f6; font-weight: 600; font-size: 0.9rem; margin-bottom: 12px; }
        .author-bio { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0; }

        .sticky-widget { position: sticky; top: 100px; }
        .sidebar-widget-glass { background: white; border-radius: 24px; padding: 30px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05); }
        .mt-30 { margin-top: 30px; }
        
        .newsletter-premium { text-align: center; }
        .newsletter-icon { width: 60px; height: 60px; background: #eff6ff; color: #3b82f6; font-size: 24px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .newsletter-premium h3 { font-size: 1.4rem; color: #0f172a; margin-bottom: 12px; }
        .newsletter-premium p { color: #64748b; font-size: 0.95rem; margin-bottom: 24px; line-height: 1.5; }
        
        .newsletter-form-group { display: flex; flex-direction: column; gap: 12px; }
        .newsletter-form-group input { width: 100%; padding: 14px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; outline: none; transition: all 0.3s; }
        .newsletter-form-group input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        .btn-subscribe { background: #0f172a; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.3s; }
        .btn-subscribe:hover { background: #3b82f6; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2); }

        .widget-title { font-size: 1.2rem; color: #0f172a; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; }
        .recent-posts-list { display: flex; flex-direction: column; gap: 15px; }
        .recent-post-item { display: flex; gap: 15px; text-decoration: none; align-items: center; padding: 10px; border-radius: 12px; transition: all 0.2s; }
        .recent-post-item:hover { background: #f8fafc; }
        .rp-img { width: 70px; height: 70px; border-radius: 10px; background-size: cover; background-position: center; flex-shrink: 0; }
        .rp-info h4 { color: #0f172a; font-size: 0.95rem; font-weight: 600; margin: 0 0 5px 0; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .rp-info span { color: #94a3b8; font-size: 0.8rem; }

        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        @media (max-width: 1024px) {
          .post-layout-modern { grid-template-columns: 1fr; margin-top: 40px; }
          .post-hero-modern { height: 50vh; }
          .post-hero-modern h1 { font-size: 2.2rem; }
          .content-glass { padding: 30px; }
          .sticky-widget { position: static; }
        }

        @media (max-width: 768px) {
          .post-hero-modern { height: auto; min-height: 400px; }
          .post-hero-modern h1 { font-size: 1.8rem; }
          .post-meta-modern { gap: 15px; }
          .content-glass { padding: 20px; }
          .author-box-modern { flex-direction: column; text-align: center; align-items: center; }
        }
      `}</style>
    </div>
  );
};

export default BlogPost;