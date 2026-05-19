// Componente Carrossel - Slideshow com controles e autoplay sem flash
import React, { useState, useEffect, useRef, useCallback } from 'react';

const Carousel = ({ slides, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setPrevIndex((prev) => prev !== null ? currentIndex : null);
    setCurrentIndex(index);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      setPrevIndex(prev);
      return prev === slides.length - 1 ? 0 : prev + 1;
    });
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      setPrevIndex(prev);
      return prev === 0 ? slides.length - 1 : prev - 1;
    });
  }, [slides.length]);

  // Autoplay estável usando ref
  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      timerRef.current = setInterval(nextSlide, interval);
      return () => clearInterval(timerRef.current);
    }
  }, [autoPlay, interval, nextSlide]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="carousel">
      {/* Base escura permanente — elimina flash branco durante transições */}
      <div className="carousel-base" />

      <div className="carousel-container">
        {slides.map((slide, index) => {
          const isActive  = index === currentIndex;
          const isPrev    = index === prevIndex;
          return (
            <div
              key={slide.id}
              className={`carousel-slide ${isActive ? 'active' : ''} ${isPrev ? 'leaving' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-overlay">
                <div className="carousel-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botões de navegação */}
      {slides.length > 1 && (
        <>
          <button className="carousel-btn prev" onClick={prevSlide}>
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </>
      )}

      {/* Indicadores de slides */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => { setPrevIndex(currentIndex); setCurrentIndex(index); }}
          />
        ))}
      </div>

      <style jsx="true">{`
        .carousel {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          background: #0a1020; /* fundo base escuro — previne qualquer flash */
        }

        /* Camada base sempre visível, elimina flash entre slides */
        .carousel-base {
          position: absolute;
          inset: 0;
          background: #0a1020;
          z-index: 0;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Todos os slides ficam sobrepostos, z-index controla quem aparece */
        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          z-index: 1;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Slide que está a sair — permanece visível até o novo estar totalmente opaco */
        .carousel-slide.leaving {
          opacity: 1;
          z-index: 2;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Slide ativo fica no topo e aparece suavemente */
        .carousel-slide.active {
          opacity: 1;
          z-index: 3;
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.85) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-content {
          text-align: center;
          color: white;
          max-width: 800px;
          padding: 20px;
        }

        .carousel-content h2 {
          font-size: 3rem;
          margin-bottom: 20px;
          animation: fadeInUp 0.8s ease;
        }

        .carousel-content p {
          font-size: 1.2rem;
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-btn:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: translateY(-50%) scale(1.1);
        }

        .prev {
          left: 20px;
        }

        .next {
          right: 20px;
        }

        .carousel-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: white;
          width: 30px;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .carousel {
            height: 400px;
          }
          
          .carousel-content h2 {
            font-size: 1.8rem;
          }
          
          .carousel-btn {
            width: 35px;
            height: 35px;
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;