// Página Blog - Listagem de artigos com filtros e busca
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulando fetch de dados
    const postsData = [
      { id: 1, titulo: 'Como a transformação digital pode impulsionar o seu negócio', slug: 'transformacao-digital-angola', resumo: 'Descubra as principais estratégias para digitalizar processos e aumentar a eficiência operacional da sua empresa em Angola.', imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop', data: '2024-02-15', autor: 'João da Silva', categoria: 'Transformação Digital', readTime: '5 min' },
      { id: 2, titulo: 'Cibersegurança Corporativa: 5 passos essenciais', slug: 'ciberseguranca-protecao-empresa', resumo: 'Aprenda as principais práticas de segurança da informação para proteger os dados sensíveis da sua organização.', imagem: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop', data: '2024-02-10', autor: 'Maria Santos', categoria: 'Segurança', readTime: '4 min' },
      { id: 3, titulo: 'Inteligência Artificial aplicada a sistemas de gestão', slug: 'ia-sistemas-gestao', resumo: 'Como a integração de IA está a revolucionar a forma como as empresas analisam dados e tomam decisões de negócio.', imagem: 'https://images.unsplash.com/photo-1461749282046-8bc9d7b4e78a?w=800&h=400&fit=crop', data: '2024-01-25', autor: 'Carlos Mendes', categoria: 'Inovação', readTime: '7 min' },
      { id: 4, titulo: 'A importância de um design UI/UX de alto nível', slug: 'ux-ui-design-centrado-usuario', resumo: 'Entenda por que o design centrado no utilizador deixou de ser um luxo para se tornar uma necessidade competitiva.', imagem: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop', data: '2024-01-12', autor: 'Ana Oliveira', categoria: 'Design', readTime: '6 min' },
      { id: 5, titulo: 'Cloud Computing: Vantagens para o mercado angolano', slug: 'cloud-computing-angola', resumo: 'Saiba como a migração para a nuvem pode reduzir custos de infraestrutura e garantir alta disponibilidade.', imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop', data: '2023-12-15', autor: 'João da Silva', categoria: 'Cloud', readTime: '8 min' }
    ];
    setPosts(postsData);
    setFilteredPosts(postsData);
    const uniqueCategories = ['todos', ...new Set(postsData.map(post => post.categoria))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.resumo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(post => post.categoria === selectedCategory);
    }
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="blog-page-premium">
      <section className="blog-hero-modern">
        <div className="hero-background-gradient"></div>
        <div className="hero-pattern-overlay"></div>
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content-wrapper"
          >
            <span className="premium-badge">Insights & Notícias</span>
            <h1>Nosso <span>Blog</span></h1>
            <p>Acompanhe as últimas tendências em tecnologia, inovação e soluções digitais para potenciar o seu negócio.</p>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-40px' }}>
        <motion.div 
          className="blog-filters-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="search-bar-modern">
            <i className="ri-search-line"></i>
            <input 
              type="text" 
              placeholder="Procurar artigos, temas ou palavras-chave..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="category-filters-modern">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-btn-modern ${selectedCategory === cat ? 'active' : ''}`} 
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'todos' ? 'Todas as Categorias' : cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="posts-grid-premium"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? filteredPosts.map((post) => (
              <motion.article 
                key={post.id} 
                className="post-card-premium"
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="post-image-modern">
                    <img src={post.imagem} alt={post.titulo} loading="lazy" />
                    <div className="post-category-badge">{post.categoria}</div>
                    <div className="post-overlay-modern"></div>
                  </div>
                  <div className="post-content-modern">
                    <div className="post-meta-modern">
                      <span className="meta-item"><i className="ri-calendar-event-line"></i> {formatDate(post.data)}</span>
                      <span className="meta-item"><i className="ri-time-line"></i> {post.readTime}</span>
                    </div>
                    <h2>{post.titulo}</h2>
                    <p>{post.resumo}</p>
                    <div className="post-footer-modern">
                      <div className="author-info">
                        <div className="author-avatar"><i className="ri-user-smile-fill"></i></div>
                        <span>{post.autor}</span>
                      </div>
                      <div className="read-more-modern">
                        Ler artigo <i className="ri-arrow-right-circle-line"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )) : (
              <motion.div 
                className="no-results-premium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="no-results-icon"><i className="ri-article-line"></i></div>
                <h3>Nenhum artigo encontrado</h3>
                <p>Não encontrámos resultados para a sua pesquisa.</p>
                <button onClick={() => { setSearchTerm(''); setSelectedCategory('todos'); }} className="btn-clear-filters">
                  <i className="ri-refresh-line"></i> Limpar filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="newsletter-section-premium"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="newsletter-content-modern">
            <div className="newsletter-icon-glass"><i className="ri-mail-send-line"></i></div>
            <h3>Mantenha-se atualizado</h3>
            <p>Junte-se a mais de 5.000 profissionais e receba os nossos melhores conteúdos de tecnologia diretamente na sua caixa de entrada.</p>
            <form className="newsletter-form-modern" onSubmit={(e) => { e.preventDefault(); alert('Subscrição efetuada com sucesso!'); }}>
              <div className="input-group-glass">
                <i className="ri-at-line"></i>
                <input type="email" placeholder="O seu melhor e-mail profissional" required />
              </div>
              <button type="submit" className="btn-subscribe-premium">Subscrever <i className="ri-send-plane-fill"></i></button>
            </form>
            <small>Respeitamos a sua privacidade. Cancele a subscrição quando quiser.</small>
          </div>
          <div className="newsletter-decoration-1"></div>
          <div className="newsletter-decoration-2"></div>
        </motion.div>
      </div>

      <style jsx="true">{`
        .blog-page-premium { min-height: 100vh; background-color: #f8fafc; padding-bottom: 80px; }
        
        .blog-hero-modern { position: relative; padding: 140px 0 100px; overflow: hidden; background: #0f172a; text-align: center; }
        .hero-background-gradient { position: absolute; inset: 0; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); z-index: 1; }
        .hero-pattern-overlay { position: absolute; inset: 0; background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.3; z-index: 2; }
        .hero-content-wrapper { position: relative; z-index: 10; max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        
        .premium-badge { display: inline-block; padding: 8px 20px; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 30px; color: #60a5fa; font-size: 0.9rem; font-weight: 600; margin-bottom: 24px; letter-spacing: 1px; text-transform: uppercase; }
        .blog-hero-modern h1 { font-size: 3.5rem; font-weight: 800; color: white; margin-bottom: 24px; line-height: 1.2; }
        .blog-hero-modern h1 span { color: transparent; background-clip: text; -webkit-background-clip: text; background-image: linear-gradient(135deg, #60a5fa, #34d399); }
        .blog-hero-modern p { font-size: 1.25rem; color: #94a3b8; max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .blog-filters-glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 20px; padding: 25px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05); margin-bottom: 50px; }
        
        .search-bar-modern { position: relative; margin-bottom: 25px; }
        .search-bar-modern i { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); font-size: 22px; color: #94a3b8; }
        .search-bar-modern input { width: 100%; padding: 20px 20px 20px 55px; background: #f1f5f9; border: 2px solid transparent; border-radius: 16px; font-size: 1.05rem; color: #1e293b; transition: all 0.3s; }
        .search-bar-modern input:focus { background: white; border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); outline: none; }
        .search-bar-modern input::placeholder { color: #94a3b8; }

        .category-filters-modern { display: flex; flex-wrap: wrap; gap: 12px; }
        .category-btn-modern { padding: 10px 22px; background: #f1f5f9; border: 1px solid transparent; border-radius: 30px; color: #475569; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .category-btn-modern:hover { background: #e2e8f0; color: #0f172a; }
        .category-btn-modern.active { background: #3b82f6; color: white; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }

        .posts-grid-premium { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 40px; margin-bottom: 80px; }
        
        .post-card-premium { background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03); border: 1px solid #f1f5f9; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); height: 100%; display: flex; flex-direction: column; }
        .post-card-premium:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); border-color: #e2e8f0; }
        .post-card-premium a { text-decoration: none; color: inherit; display: flex; flex-direction: column; height: 100%; }
        
        .post-image-modern { position: relative; height: 240px; overflow: hidden; }
        .post-image-modern img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .post-card-premium:hover .post-image-modern img { transform: scale(1.08); }
        .post-overlay-modern { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15, 23, 42, 0.4), transparent); opacity: 0; transition: opacity 0.3s; }
        .post-card-premium:hover .post-overlay-modern { opacity: 1; }
        
        .post-category-badge { position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); color: #2563eb; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; z-index: 10; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }

        .post-content-modern { padding: 30px; display: flex; flex-direction: column; flex-grow: 1; }
        .post-meta-modern { display: flex; gap: 20px; margin-bottom: 16px; font-size: 0.85rem; color: #64748b; font-weight: 500; }
        .meta-item { display: flex; align-items: center; gap: 6px; }
        .meta-item i { color: #3b82f6; font-size: 1.1rem; }
        
        .post-content-modern h2 { font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px; line-height: 1.4; transition: color 0.3s; }
        .post-card-premium:hover .post-content-modern h2 { color: #2563eb; }
        .post-content-modern p { color: #475569; margin-bottom: 24px; line-height: 1.7; flex-grow: 1; font-size: 0.95rem; }

        .post-footer-modern { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid #f1f5f9; }
        .author-info { display: flex; align-items: center; gap: 10px; }
        .author-avatar { width: 32px; height: 32px; border-radius: 50%; background: #eff6ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .author-info span { font-weight: 600; font-size: 0.9rem; color: #1e293b; }
        
        .read-more-modern { color: #3b82f6; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 6px; transition: gap 0.3s; }
        .post-card-premium:hover .read-more-modern { gap: 10px; }
        .read-more-modern i { font-size: 1.2rem; }

        .no-results-premium { grid-column: 1 / -1; text-align: center; padding: 80px 20px; background: white; border-radius: 24px; border: 1px dashed #cbd5e1; }
        .no-results-icon { width: 80px; height: 80px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #94a3b8; font-size: 36px; }
        .no-results-premium h3 { font-size: 1.5rem; color: #0f172a; margin-bottom: 10px; font-weight: 700; }
        .no-results-premium p { color: #64748b; margin-bottom: 24px; }
        .btn-clear-filters { padding: 12px 24px; background: #eff6ff; color: #2563eb; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-clear-filters:hover { background: #dbeafe; }

        .newsletter-section-premium { position: relative; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-radius: 30px; padding: 80px 40px; text-align: center; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2); }
        .newsletter-decoration-1 { position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: rgba(59, 130, 246, 0.2); filter: blur(40px); border-radius: 50%; z-index: 1; }
        .newsletter-decoration-2 { position: absolute; bottom: -50px; right: -50px; width: 250px; height: 250px; background: rgba(16, 185, 129, 0.15); filter: blur(50px); border-radius: 50%; z-index: 1; }
        
        .newsletter-content-modern { position: relative; z-index: 10; max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .newsletter-icon-glass { width: 70px; height: 70px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
        .newsletter-icon-glass i { font-size: 32px; color: #60a5fa; }
        .newsletter-content-modern h3 { font-size: 2.2rem; font-weight: 800; color: white; margin-bottom: 16px; }
        .newsletter-content-modern p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 35px; }
        
        .newsletter-form-modern { width: 100%; display: flex; gap: 15px; margin-bottom: 16px; }
        .input-group-glass { flex-grow: 1; position: relative; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; display: flex; align-items: center; overflow: hidden; backdrop-filter: blur(5px); }
        .input-group-glass i { padding-left: 20px; color: #94a3b8; font-size: 20px; }
        .input-group-glass input { width: 100%; background: transparent; border: none; padding: 18px; color: white; font-size: 1rem; }
        .input-group-glass input:focus { outline: none; }
        .input-group-glass input::placeholder { color: #64748b; }
        
        .btn-subscribe-premium { padding: 0 32px; background: #3b82f6; color: white; border: none; border-radius: 16px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }
        .btn-subscribe-premium:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(59, 130, 246, 0.5); }
        
        .newsletter-content-modern small { color: #64748b; font-size: 0.85rem; }

        @media (max-width: 992px) {
          .blog-hero-modern h1 { font-size: 2.8rem; }
          .posts-grid-premium { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
          .newsletter-form-modern { flex-direction: column; }
          .btn-subscribe-premium { padding: 18px; justify-content: center; }
        }
        @media (max-width: 768px) {
          .blog-hero-modern { padding: 100px 0 80px; }
          .blog-hero-modern h1 { font-size: 2.2rem; }
          .blog-filters-glass { padding: 15px; }
          .category-filters-modern { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 5px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .category-filters-modern::-webkit-scrollbar { display: none; }
          .category-btn-modern { flex: 0 0 auto; }
          .newsletter-section-premium { padding: 50px 20px; border-radius: 20px; }
        }
      `}</style>
    </div>
  );
};

export default Blog;