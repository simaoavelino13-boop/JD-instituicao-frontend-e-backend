// Página Galeria - Exposição de fotos, eventos e projetos da JD Tecnologia
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [filteredImages, setFilteredImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dados da galeria com as imagens fornecidas
  const galleryImages = [
    {
      id: 1,
      title: 'JD Tecnologias & Serviços - Logo Oficial',
      description: 'Logotipo oficial da JD Tecnologias & Serviços, representando nossa identidade visual e compromisso com a excelência em tecnologia e serviços em Angola.',
      category: 'identidade',
      imageUrl: '/images/logo-jd.jpeg',
      thumbnailUrl: '/images/logo-jd.jpeg',
      date: '2024-01-15',
      photographer: 'JD Tecnologias',
      tags: ['logo', 'identidade', 'marca', 'oficial']
    },
    {
      id: 2,
      title: 'JD Tecnologias - Versão Alternativa',
      description: 'Variação do logotipo da JD Tecnologias, destacando a parceria entre tecnologia e serviços de qualidade para o mercado angolano.',
      category: 'identidade',
      imageUrl: '/images/logo-jd-alternativo.png',
      thumbnailUrl: '/images/logo-jd-alternativo.png',
      date: '2024-01-15',
      photographer: 'JD Tecnologias',
      tags: ['logo', 'identidade', 'tecnologia', 'servicos']
    },
    {
      id: 3,
      title: 'Formação e Suporte Técnico de Excelência',
      description: 'Programa de formação e suporte técnico da JD Tecnologias - Excelência em capacitação profissional e assistência técnica especializada.',
      category: 'eventos',
      imageUrl: '/images/formacao-suporte.png',
      thumbnailUrl: '/images/formacao-suporte.png',
      date: '2024-02-10',
      photographer: 'JD Tecnologias',
      tags: ['formação', 'suporte', 'treinamento', 'excelência']
    },
    {
      id: 4,
      title: 'Liderança e Princípios de Serviço',
      description: 'Princípios fundamentais de liderança e excelência no atendimento que norteiam nossa atuação no mercado angolano.',
      category: 'valores',
      imageUrl: '/images/lideranca-servico.png',
      thumbnailUrl: '/images/lideranca-servico.png',
      date: '2024-01-20',
      photographer: 'JD Tecnologias',
      tags: ['liderança', 'valores', 'princípios', 'serviço']
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos os Álbuns', icon: 'ri-gallery-line' },
    { id: 'identidade', name: 'Identidade Visual', icon: 'ri-palette-line' },
    { id: 'eventos', name: 'Eventos & Formação', icon: 'ri-calendar-event-line' },
    { id: 'valores', name: 'Valores & Princípios', icon: 'ri-heart-line' }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (selectedCategory === 'todos') {
        setFilteredImages(galleryImages);
      } else {
        setFilteredImages(galleryImages.filter(img => img.category === selectedCategory));
      }
      setIsLoading(false);
    }, 500); // Simulando delay de carregamento
  }, [selectedCategory]);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        closeModal();
      }
      if (e.key === 'ArrowRight' && selectedImage) {
        nextImage();
      }
      if (e.key === 'ArrowLeft' && selectedImage) {
        prevImage();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedImage, filteredImages]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="gallery-page-premium">
      <section className="gallery-hero-modern">
        <div className="hero-background-gradient"></div>
        <div className="hero-pattern-overlay"></div>
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content-wrapper"
          >
            <span className="premium-badge">Visuals</span>
            <h1>A Nossa <span>Galeria</span></h1>
            <p>Conheça um pouco mais da JD Tecnologias através de nossas imagens, eventos e projetos de sucesso.</p>
          </motion.div>
        </div>
      </section>

      <div className="gallery-main-section">
        <div className="container">
          <motion.div 
            className="gallery-filters-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="filters-wrapper-modern">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-btn-premium ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <i className={cat.icon}></i>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="gallery-content-area">
            {isLoading ? (
              <div className="loading-container-modern">
                <div className="spinner-modern"></div>
                <p>A organizar as imagens...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <motion.div 
                className="no-results-premium"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="no-results-icon"><i className="ri-image-line"></i></div>
                <h3>Nenhuma imagem encontrada nesta categoria</h3>
                <p>Tente selecionar outro álbum ou ver todas as imagens.</p>
                <button className="btn-reset-filters" onClick={() => setSelectedCategory('todos')}>Ver Todos</button>
              </motion.div>
            ) : (
              <motion.div 
                className="gallery-grid-premium"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((image) => (
                    <motion.div
                      key={image.id}
                      className="gallery-card-premium"
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                      onClick={() => openModal(image)}
                    >
                      <div className="gallery-image-modern">
                        <img 
                          src={image.thumbnailUrl} 
                          alt={image.title}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Imagem+Indispon%C3%ADvel';
                          }}
                        />
                        <div className="gallery-overlay-modern">
                          <div className="overlay-icon-wrapper">
                            <i className="ri-zoom-in-line"></i>
                          </div>
                          <span className="overlay-text">Ver detalhes</span>
                        </div>
                        <div className="category-badge-glass">
                          <i className={categories.find(c => c.id === image.category)?.icon}></i>
                          {categories.find(c => c.id === image.category)?.name}
                        </div>
                      </div>
                      <div className="gallery-info-modern">
                        <h3>{image.title}</h3>
                        <div className="gallery-meta-modern">
                          <span className="date">
                            <i className="ri-calendar-event-line"></i>
                            {formatDate(image.date)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal Moderno */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="modal-overlay-premium" 
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-container-premium" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button className="modal-close-premium" onClick={closeModal}>
                <i className="ri-close-line"></i>
              </button>
              
              {filteredImages.length > 1 && (
                <>
                  <button className="modal-nav-premium prev" onClick={prevImage}>
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <button className="modal-nav-premium next" onClick={nextImage}>
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </>
              )}

              <div className="modal-content-wrapper">
                <div className="modal-image-premium">
                  <motion.img 
                    key={selectedImage.id}
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x500/e2e8f0/64748b?text=Imagem+Indispon%C3%ADvel';
                    }}
                  />
                </div>

                <div className="modal-info-premium">
                  <h2>{selectedImage.title}</h2>
                  <p className="description-premium">{selectedImage.description}</p>
                  
                  <div className="modal-meta-grid">
                    <div className="meta-item-modern">
                      <div className="meta-icon"><i className="ri-calendar-line"></i></div>
                      <div className="meta-text">
                        <span>Data</span>
                        <strong>{formatDate(selectedImage.date)}</strong>
                      </div>
                    </div>
                    <div className="meta-item-modern">
                      <div className="meta-icon"><i className="ri-camera-lens-line"></i></div>
                      <div className="meta-text">
                        <span>Fotógrafo</span>
                        <strong>{selectedImage.photographer}</strong>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-tags-section">
                    <h4>Tags associadas</h4>
                    <div className="tags-premium">
                      {selectedImage.tags.map(tag => (
                        <span key={tag} className="tag-modern">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .gallery-page-premium { min-height: 100vh; background-color: #f8fafc; }
        
        .gallery-hero-modern { position: relative; padding: 140px 0 100px; overflow: hidden; background: #0f172a; text-align: center; }
        .hero-background-gradient { position: absolute; inset: 0; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); z-index: 1; }
        .hero-pattern-overlay { position: absolute; inset: 0; background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.3; z-index: 2; }
        .hero-content-wrapper { position: relative; z-index: 10; max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        
        .premium-badge { display: inline-block; padding: 8px 20px; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 30px; color: #60a5fa; font-size: 0.9rem; font-weight: 600; margin-bottom: 24px; letter-spacing: 1px; text-transform: uppercase; }
        .gallery-hero-modern h1 { font-size: 3.5rem; font-weight: 800; color: white; margin-bottom: 24px; line-height: 1.2; }
        .gallery-hero-modern h1 span { color: transparent; background-clip: text; -webkit-background-clip: text; background-image: linear-gradient(135deg, #60a5fa, #34d399); }
        .gallery-hero-modern p { font-size: 1.25rem; color: #94a3b8; max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .gallery-main-section { padding-bottom: 80px; }

        .gallery-filters-glass { margin-top: -30px; margin-bottom: 50px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 20px; padding: 20px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05); position: relative; z-index: 20; }
        .filters-wrapper-modern { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        
        .filter-btn-premium { padding: 12px 24px; background: transparent; border: 1px solid #e2e8f0; border-radius: 30px; font-size: 0.95rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 8px; }
        .filter-btn-premium i { font-size: 1.2rem; color: #94a3b8; transition: color 0.3s; }
        .filter-btn-premium:hover { background: #f1f5f9; color: #0f172a; border-color: #cbd5e1; }
        .filter-btn-premium:hover i { color: #3b82f6; }
        .filter-btn-premium.active { background: #3b82f6; color: white; border-color: #3b82f6; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }
        .filter-btn-premium.active i { color: white; }

        .gallery-content-area { min-height: 400px; }

        .loading-container-modern { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; }
        .spinner-modern { width: 50px; height: 50px; border: 3px solid rgba(59, 130, 246, 0.2); border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
        .loading-container-modern p { color: #64748b; font-weight: 500; }

        .gallery-grid-premium { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px; }
        
        .gallery-card-premium { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03); border: 1px solid #f1f5f9; cursor: pointer; display: flex; flex-direction: column; }
        .gallery-card-premium:hover { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); border-color: #e2e8f0; }
        
        .gallery-image-modern { position: relative; height: 260px; overflow: hidden; }
        .gallery-image-modern img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .gallery-card-premium:hover .gallery-image-modern img { transform: scale(1.08); }
        
        .gallery-overlay-modern { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(2px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px; opacity: 0; transition: all 0.3s ease; }
        .overlay-icon-wrapper { width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: translateY(20px); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .overlay-icon-wrapper i { font-size: 24px; color: white; }
        .overlay-text { color: white; font-weight: 600; font-size: 1rem; transform: translateY(20px); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.05s; }
        
        .gallery-card-premium:hover .gallery-overlay-modern { opacity: 1; }
        .gallery-card-premium:hover .overlay-icon-wrapper,
        .gallery-card-premium:hover .overlay-text { transform: translateY(0); }

        .category-badge-glass { position: absolute; top: 15px; left: 15px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(8px); padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .category-badge-glass i { color: #3b82f6; }

        .gallery-info-modern { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .gallery-info-modern h3 { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 12px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .gallery-meta-modern { display: flex; align-items: center; color: #64748b; font-size: 0.85rem; font-weight: 500; }
        .gallery-meta-modern i { margin-right: 6px; color: #94a3b8; }

        .no-results-premium { text-align: center; padding: 60px 20px; background: white; border-radius: 24px; border: 1px dashed #cbd5e1; max-width: 600px; margin: 0 auto; }
        .no-results-premium .no-results-icon { width: 80px; height: 80px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #94a3b8; font-size: 36px; }
        .no-results-premium h3 { font-size: 1.4rem; color: #0f172a; margin-bottom: 10px; font-weight: 700; }
        .no-results-premium p { color: #64748b; margin-bottom: 24px; }
        .btn-reset-filters { padding: 10px 24px; background: #3b82f6; color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .btn-reset-filters:hover { background: #2563eb; }

        /* Modal Lightbox Premium */
        .modal-overlay-premium { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-container-premium { position: relative; max-width: 1100px; width: 100%; max-height: 90vh; background: white; border-radius: 24px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        
        .modal-close-premium { position: absolute; top: 20px; right: 20px; width: 44px; height: 44px; background: rgba(255, 255, 255, 0.9); border: none; border-radius: 50%; color: #0f172a; font-size: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 100; transition: all 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .modal-close-premium:hover { background: #ef4444; color: white; transform: rotate(90deg); }

        .modal-nav-premium { position: absolute; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; background: rgba(255, 255, 255, 0.9); border: none; border-radius: 50%; color: #0f172a; font-size: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 100; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.15); }
        .modal-nav-premium.prev { left: 20px; }
        .modal-nav-premium.next { right: 20px; }
        .modal-nav-premium:hover { background: #3b82f6; color: white; transform: translateY(-50%) scale(1.1); }

        .modal-content-wrapper { display: flex; flex-direction: column; height: 100%; max-height: 90vh; overflow-y: auto; }
        .modal-content-wrapper::-webkit-scrollbar { width: 8px; }
        .modal-content-wrapper::-webkit-scrollbar-track { background: #f1f5f9; }
        .modal-content-wrapper::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        
        .modal-image-premium { background: #0f172a; display: flex; align-items: center; justify-content: center; position: relative; min-height: 300px; max-height: 60vh; }
        .modal-image-premium img { max-width: 100%; max-height: 60vh; object-fit: contain; }
        
        .modal-info-premium { padding: 35px; background: white; }
        .modal-info-premium h2 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 15px; }
        .description-premium { color: #475569; line-height: 1.7; font-size: 1.05rem; margin-bottom: 30px; }
        
        .modal-meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #e2e8f0; }
        .meta-item-modern { display: flex; align-items: flex-start; gap: 15px; }
        .meta-icon { width: 40px; height: 40px; background: #eff6ff; color: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .meta-text { display: flex; flex-direction: column; }
        .meta-text span { font-size: 0.85rem; color: #64748b; margin-bottom: 2px; }
        .meta-text strong { color: #0f172a; font-size: 0.95rem; }
        
        .modal-tags-section h4 { font-size: 1rem; color: #1e293b; margin-bottom: 15px; font-weight: 700; }
        .tags-premium { display: flex; flex-wrap: wrap; gap: 10px; }
        .tag-modern { background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; border: 1px solid #e2e8f0; }

        @keyframes spin { 100% { transform: rotate(360deg); } }

        @media (max-width: 992px) {
          .gallery-hero-modern h1 { font-size: 2.8rem; }
          .modal-content-wrapper { flex-direction: column; }
        }
        @media (max-width: 768px) {
          .gallery-hero-modern { padding: 120px 0 80px; }
          .gallery-hero-modern h1 { font-size: 2.2rem; }
          .gallery-filters-glass { padding: 15px; border-radius: 15px; }
          .filters-wrapper-modern { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 5px; justify-content: flex-start; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .filters-wrapper-modern::-webkit-scrollbar { display: none; }
          .filter-btn-premium { flex: 0 0 auto; }
          .gallery-grid-premium { grid-template-columns: 1fr; }
          .modal-container-premium { width: 95%; max-height: 95vh; }
          .modal-info-premium { padding: 20px; }
          .modal-nav-premium { width: 40px; height: 40px; font-size: 24px; }
          .modal-nav-premium.prev { left: 10px; }
          .modal-nav-premium.next { right: 10px; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;