// Componente ContactForm - Formulário de contato com validação
import React, { useState } from 'react';
import { contactService } from '../../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    return newErrors;
  };

  // Handle de mudança nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await contactService.sendMessage({
        nome: formData.name,
        email: formData.email,
        telefone: '',
        assunto: 'Mensagem via Formulário de Contacto',
        mensagem: formData.message
      });
      setSubmitStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Erro ao enviar mensagem. Tente novamente mais tarde.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <form className="contact-form-premium" onSubmit={handleSubmit}>
      <div className="form-group-modern">
        <label htmlFor="name">
          <i className="ri-user-smile-line"></i>
          Nome Completo
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Digite seu nome completo"
          />
        </div>
        {errors.name && <span className="error-message-modern"><i className="ri-error-warning-fill"></i> {errors.name}</span>}
      </div>

      <div className="form-group-modern">
        <label htmlFor="email">
          <i className="ri-mail-send-line"></i>
          E-mail Profissional
        </label>
        <div className="input-wrapper">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="seu.nome@empresa.com"
          />
        </div>
        {errors.email && <span className="error-message-modern"><i className="ri-error-warning-fill"></i> {errors.email}</span>}
      </div>

      <div className="form-group-modern">
        <label htmlFor="message">
          <i className="ri-message-3-line"></i>
          Mensagem
        </label>
        <div className="input-wrapper">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
            rows="5"
            placeholder="Como podemos ajudar no seu próximo projeto?"
          />
        </div>
        {errors.message && <span className="error-message-modern"><i className="ri-error-warning-fill"></i> {errors.message}</span>}
      </div>

      <button type="submit" className="submit-btn-premium" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <i className="ri-loader-4-line spinning"></i>
            Enviando...
          </>
        ) : (
          <>
            Enviar Mensagem
            <i className="ri-send-plane-fill"></i>
          </>
        )}
      </button>

      {submitStatus && (
        <div className={`submit-status-modern ${submitStatus.type}`}>
          <i className={submitStatus.type === 'success' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'}></i>
          {submitStatus.message}
        </div>
      )}

      <style jsx="true">{`
        .contact-form-premium { width: 100%; }

        .form-group-modern { margin-bottom: 24px; }

        .form-group-modern label {
          display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
          color: #1e293b; font-weight: 700; font-size: 0.95rem;
        }
        .form-group-modern label i { color: #3b82f6; font-size: 1.1rem; }

        .input-wrapper { position: relative; }

        .form-group-modern input,
        .form-group-modern textarea {
          width: 100%; padding: 16px 20px; background: #f8fafc;
          border: 2px solid #e2e8f0; border-radius: 12px; font-size: 1rem;
          color: #334155; transition: all 0.3s ease; font-family: inherit;
        }

        .form-group-modern input::placeholder,
        .form-group-modern textarea::placeholder { color: #94a3b8; }

        .form-group-modern input:focus,
        .form-group-modern textarea:focus {
          outline: none; border-color: #3b82f6; background: white;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .form-group-modern input.error,
        .form-group-modern textarea.error { border-color: #ef4444; background: #fef2f2; }

        .error-message-modern {
          display: flex; align-items: center; gap: 6px; color: #ef4444;
          font-size: 0.85rem; margin-top: 8px; font-weight: 500;
        }

        .submit-btn-premium {
          width: 100%; padding: 18px; margin-top: 10px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white; border: none; border-radius: 12px;
          font-size: 1.1rem; font-weight: 700; display: flex;
          align-items: center; justify-content: center; gap: 12px;
          cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 10px 20px -5px rgba(37,99,235,0.4);
        }

        .submit-btn-premium:hover:not(:disabled) {
          transform: translateY(-3px); box-shadow: 0 15px 25px -5px rgba(37,99,235,0.5);
        }

        .submit-btn-premium:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: none; }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }

        .submit-status-modern {
          margin-top: 24px; padding: 16px 20px; border-radius: 12px;
          display: flex; align-items: center; gap: 12px; font-weight: 500;
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .submit-status-modern.success { background: #d1fae5; color: #065f46; border: 1px solid #10b981; }
        .submit-status-modern.success i { color: #10b981; font-size: 1.5rem; }

        .submit-status-modern.error { background: #fee2e2; color: #991b1b; border: 1px solid #ef4444; }
        .submit-status-modern.error i { color: #ef4444; font-size: 1.5rem; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </form>
  );
};

export default ContactForm;