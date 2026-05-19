// Componente Modal - Janela modal reutilizável com animação
import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
  // Fechar modal com tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'modal-small',
    medium: 'modal-medium',
    large: 'modal-large'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-container ${sizeClasses[size]}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>

      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-container {
          background: white;
          border-radius: 20px;
          max-height: 90vh;
          overflow: hidden;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-small {
          width: 400px;
        }

        .modal-medium {
          width: 600px;
        }

        .modal-large {
          width: 900px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #2d3748;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #718096;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: #e53e3e;
        }

        .modal-body {
          padding: 25px;
          overflow-y: auto;
          max-height: calc(90vh - 80px);
        }

        @media (max-width: 768px) {
          .modal-small,
          .modal-medium,
          .modal-large {
            width: 95%;
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;