// Componente LoadingSpinner - Indicador de carregamento animado
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-logo">
          <i className="ri-computer-line"></i>
        </div>
      </div>
      <p className="spinner-text">Carregando...</p>

      <style jsx="true">{`
        .spinner-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .spinner {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid transparent;
          border-radius: 50%;
          animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        .spinner-ring:nth-child(1) {
          border-top-color: #fbbf24;
          animation-delay: 0s;
        }

        .spinner-ring:nth-child(2) {
          border-right-color: #34d399;
          animation-delay: 0.3s;
        }

        .spinner-ring:nth-child(3) {
          border-bottom-color: #60a5fa;
          animation-delay: 0.6s;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .spinner-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 40px;
          color: white;
        }

        .spinner-text {
          margin-top: 30px;
          color: white;
          font-size: 1.2rem;
          font-weight: 500;
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;