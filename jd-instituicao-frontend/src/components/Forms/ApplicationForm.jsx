// Componente ApplicationForm - Formulário de candidatura para vagas de emprego
import React, { useState } from 'react';
import axios from 'axios';

const ApplicationForm = ({ jobId, jobTitle, onSuccess, onClose }) => {
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    data_nascimento: '',
    endereco: '',
    experiencia: '',
    formacao: '',
    carta_apresentacao: ''
  });
  
  // Estado para arquivos
  const [files, setFiles] = useState({
    cv: null,
    bi: null,
    certificados: null
  });
  
  // Estados de controle
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Validação de e-mail
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validação de telefone (formato angolano)
  const validatePhone = (phone) => {
    const phoneRegex = /^(\+244|0)?[9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  // Validação de arquivos
  const validateFile = (file, type) => {
    const allowedTypes = {
      cv: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      bi: ['application/pdf', 'image/jpeg', 'image/png'],
      certificados: ['application/pdf', 'image/jpeg', 'image/png']
    };
    
    const maxSizes = {
      cv: 5 * 1024 * 1024,
      bi: 2 * 1024 * 1024,
      certificados: 10 * 1024 * 1024
    };
    
    if (!allowedTypes[type].includes(file.type)) {
      return `Tipo de arquivo não permitido. Formatos permitidos: PDF, DOC, DOCX (para CV), PDF, JPG, PNG.`;
    }
    
    if (file.size > maxSizes[type]) {
      return `Arquivo muito grande. Tamanho máximo: ${maxSizes[type] / (1024 * 1024)}MB`;
    }
    
    return null;
  };

  // Handle de mudança nos campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle de mudança nos arquivos
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];
    
    if (file) {
      const error = validateFile(file, name);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
        return;
      }
      
      setFiles(prev => ({ ...prev, [name]: file }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  // Validação completa do formulário
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome completo é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido. Use o formato: 923456789 ou +244923456789';
    }
    
    if (!files.cv) {
      newErrors.cv = 'Currículo é obrigatório';
    }
    
    if (!files.bi) {
      newErrors.bi = 'Documento de identificação (BI) é obrigatório';
    }
    
    return newErrors;
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
    setUploadProgress(0);
    
    const submitData = new FormData();
    submitData.append('job_id', jobId);
    submitData.append('job_title', jobTitle);
    submitData.append('nome', formData.nome);
    submitData.append('email', formData.email);
    submitData.append('telefone', formData.telefone);
    submitData.append('data_nascimento', formData.data_nascimento);
    submitData.append('endereco', formData.endereco);
    submitData.append('experiencia', formData.experiencia);
    submitData.append('formacao', formData.formacao);
    submitData.append('carta_apresentacao', formData.carta_apresentacao);
    submitData.append('cv', files.cv);
    submitData.append('bi', files.bi);
    if (files.certificados) {
      submitData.append('certificados', files.certificados);
    }
    
    try {
      // Simular progresso
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Candidatura enviada com sucesso! Entraremos em contato em breve.' 
      });
      
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        data_nascimento: '',
        endereco: '',
        experiencia: '',
        formacao: '',
        carta_apresentacao: ''
      });
      setFiles({ cv: null, bi: null, certificados: null });
      
      setTimeout(() => {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Erro de conexão com o servidor. Tente novamente mais tarde.' 
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os campos?')) {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        data_nascimento: '',
        endereco: '',
        experiencia: '',
        formacao: '',
        carta_apresentacao: ''
      });
      setFiles({ cv: null, bi: null, certificados: null });
      setErrors({});
    }
  };

  return (
    <div className="application-form-container">
      <div className="application-form-header">
        <h3>
          <i className="ri-briefcase-line"></i>
          Candidatura para: {jobTitle}
        </h3>
        <p>Preencha os campos abaixo com os seus dados. Campos com <span className="required">*</span> são obrigatórios.</p>
      </div>

      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-section-modern">
          <h4>
            <i className="ri-user-smile-line"></i>
            Informações Pessoais
          </h4>
          
          <div className="form-row">
            <div className="form-group-modern">
              <label htmlFor="nome">
                Nome Completo <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={errors.nome ? 'error' : ''}
                placeholder="Como gosta de ser chamado?"
                disabled={isSubmitting}
              />
              {errors.nome && <span className="error-message"><i className="ri-error-warning-fill"></i> {errors.nome}</span>}
            </div>

            <div className="form-group-modern">
              <label htmlFor="data_nascimento">Data de Nascimento</label>
              <input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group-modern">
              <label htmlFor="email">
                E-mail Profissional <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="seu.nome@exemplo.com"
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-message"><i className="ri-error-warning-fill"></i> {errors.email}</span>}
            </div>

            <div className="form-group-modern">
              <label htmlFor="telefone">
                Telefone/WhatsApp <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className={errors.telefone ? 'error' : ''}
                placeholder="+244 9XX XXX XXX"
                disabled={isSubmitting}
              />
              {errors.telefone && <span className="error-message"><i className="ri-error-warning-fill"></i> {errors.telefone}</span>}
            </div>
          </div>

          <div className="form-group-modern">
            <label htmlFor="endereco">Endereço de Residência</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Ex: Talatona, Luanda"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-section-modern">
          <h4>
            <i className="ri-graduation-cap-line"></i>
            Percurso & Experiência
          </h4>

          <div className="form-group-modern">
            <label htmlFor="formacao">Formação Académica</label>
            <textarea
              id="formacao"
              name="formacao"
              rows="3"
              value={formData.formacao}
              onChange={handleChange}
              placeholder="Descreva aqui o seu percurso universitário, cursos e certificações relevantes."
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group-modern">
            <label htmlFor="experiencia">Experiência Profissional</label>
            <textarea
              id="experiencia"
              name="experiencia"
              rows="4"
              value={formData.experiencia}
              onChange={handleChange}
              placeholder="Fale-nos um pouco sobre a sua jornada profissional e os projetos em que esteve envolvido."
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-section-modern">
          <h4>
            <i className="ri-folder-open-line"></i>
            Documentação
          </h4>

          <div className="form-group-modern">
            <label htmlFor="cv">
              Currículo Atualizado <span className="required">*</span>
            </label>
            <div className="file-input-wrapper-modern">
              <input
                type="file"
                id="cv"
                name="cv"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className={errors.cv ? 'error' : ''}
                disabled={isSubmitting}
              />
              {files.cv && (
                <span className="file-selected">
                  <i className="ri-file-text-fill"></i> {files.cv.name}
                </span>
              )}
            </div>
            {errors.cv && <span className="error-message"><i className="ri-error-warning-fill"></i> {errors.cv}</span>}
            <small className="form-hint">Formatos: PDF ou DOC. Máximo: 5MB.</small>
          </div>

          <div className="form-group-modern">
            <label htmlFor="bi">
              Documento de Identidade (BI/Passaporte) <span className="required">*</span>
            </label>
            <div className="file-input-wrapper-modern">
              <input
                type="file"
                id="bi"
                name="bi"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                className={errors.bi ? 'error' : ''}
                disabled={isSubmitting}
              />
              {files.bi && (
                <span className="file-selected">
                  <i className="ri-id-card-fill"></i> {files.bi.name}
                </span>
              )}
            </div>
            {errors.bi && <span className="error-message"><i className="ri-error-warning-fill"></i> {errors.bi}</span>}
            <small className="form-hint">Formatos: PDF, JPG, PNG. Máximo: 2MB.</small>
          </div>

          <div className="form-group-modern">
            <label htmlFor="certificados">Outros Certificados (Opcional)</label>
            <div className="file-input-wrapper-modern">
              <input
                type="file"
                id="certificados"
                name="certificados"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                disabled={isSubmitting}
              />
              {files.certificados && (
                <span className="file-selected">
                  <i className="ri-award-fill"></i> {files.certificados.name}
                </span>
              )}
            </div>
            <small className="form-hint">Você pode anexar um PDF contendo vários certificados. Máximo: 10MB.</small>
          </div>
        </div>

        <div className="form-section-modern">
          <h4>
            <i className="ri-message-3-line"></i>
            Carta de Apresentação
          </h4>

          <div className="form-group-modern">
            <label htmlFor="carta_apresentacao">Porquê a JD Tecnologia?</label>
            <textarea
              id="carta_apresentacao"
              name="carta_apresentacao"
              rows="5"
              value={formData.carta_apresentacao}
              onChange={handleChange}
              placeholder="Queremos saber o que o motiva a juntar-se à nossa equipa. Quais os desafios que o inspiram?"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {isSubmitting && uploadProgress > 0 && (
          <div className="upload-progress-modern">
            <div className="progress-bar-bg">
              <div 
                className="progress-fill-gradient" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span>Enviando os seus dados de forma segura... {uploadProgress}%</span>
          </div>
        )}

        {submitStatus && (
          <div className={`submit-status-modern ${submitStatus.type}`}>
            <i className={submitStatus.type === 'success' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'}></i>
            {submitStatus.message}
          </div>
        )}

        <div className="form-actions-modern">
          <button 
            type="button" 
            className="btn-reset-premium" 
            onClick={handleReset}
            disabled={isSubmitting}
          >
            <i className="ri-refresh-line"></i>
            Recomeçar
          </button>
          <button 
            type="submit" 
            className="btn-submit-premium" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line spinning"></i>
                Processando...
              </>
            ) : (
              <>
                Confirmar Candidatura
                <i className="ri-arrow-right-circle-fill"></i>
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx="true">{`
        .application-form-container { max-width: 800px; margin: 0 auto; }

        .application-form-header { text-align: center; margin-bottom: 30px; padding-bottom: 25px; border-bottom: 1px solid #e2e8f0; }
        .application-form-header h3 { font-size: 1.8rem; color: #0f172a; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .application-form-header h3 i { color: #3b82f6; }
        .application-form-header p { color: #64748b; font-size: 0.95rem; }

        .form-section-modern { background: #f8fafc; padding: 30px; border-radius: 20px; border: 1px solid #f1f5f9; margin-bottom: 30px; }
        .form-section-modern h4 { display: flex; align-items: center; gap: 10px; margin-bottom: 25px; color: #0f172a; font-size: 1.25rem; font-weight: 800; }
        .form-section-modern h4 i { color: #3b82f6; background: #eff6ff; padding: 8px; border-radius: 12px; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .form-group-modern { margin-bottom: 20px; }
        .form-group-modern label { display: block; margin-bottom: 8px; font-weight: 600; color: #334155; font-size: 0.95rem; }
        .required { color: #ef4444; }

        .form-group-modern input[type="text"],
        .form-group-modern input[type="email"],
        .form-group-modern input[type="tel"],
        .form-group-modern input[type="date"],
        .form-group-modern textarea {
          width: 100%; padding: 14px 18px; border: 2px solid #e2e8f0; border-radius: 12px;
          background: white; font-size: 0.95rem; color: #1e293b; transition: all 0.3s; font-family: inherit;
        }

        .form-group-modern input::placeholder,
        .form-group-modern textarea::placeholder { color: #94a3b8; }

        .form-group-modern input:focus,
        .form-group-modern textarea:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
        .form-group-modern input.error,
        .form-group-modern textarea.error { border-color: #ef4444; background: #fef2f2; }

        .file-input-wrapper-modern {
          position: relative; overflow: hidden; display: block;
        }
        .file-input-wrapper-modern input[type="file"] {
          width: 100%; padding: 12px; border: 2px dashed #cbd5e1; border-radius: 12px; background: white;
          cursor: pointer; color: #64748b; transition: all 0.3s;
        }
        .file-input-wrapper-modern input[type="file"]:hover { border-color: #94a3b8; background: #f1f5f9; }
        .file-input-wrapper-modern input[type="file"].error { border-color: #ef4444; background: #fef2f2; }

        .file-selected { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; padding: 6px 12px; background: #eff6ff; color: #2563eb; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }

        .error-message { display: flex; align-items: center; gap: 6px; color: #ef4444; font-size: 0.85rem; margin-top: 8px; font-weight: 500; }
        .form-hint { color: #64748b; font-size: 0.8rem; margin-top: 8px; display: block; }

        .upload-progress-modern { margin: 25px 0; text-align: center; }
        .progress-bar-bg { height: 8px; background: #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
        .progress-fill-gradient { height: 100%; background: linear-gradient(90deg, #3b82f6, #10b981); border-radius: 10px; transition: width 0.3s ease; }
        .upload-progress-modern span { font-size: 0.85rem; color: #64748b; font-weight: 600; }

        .submit-status-modern { margin: 25px 0; padding: 16px 20px; border-radius: 12px; display: flex; align-items: center; gap: 12px; font-weight: 500; animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .submit-status-modern.success { background: #d1fae5; color: #065f46; border: 1px solid #10b981; }
        .submit-status-modern.success i { color: #10b981; font-size: 1.5rem; }
        .submit-status-modern.error { background: #fee2e2; color: #991b1b; border: 1px solid #ef4444; }
        .submit-status-modern.error i { color: #ef4444; font-size: 1.5rem; }

        @keyframes slideIn { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }

        .form-actions-modern { display: flex; gap: 15px; justify-content: flex-end; margin-top: 30px; }

        .btn-reset-premium, .btn-submit-premium {
          padding: 16px 28px; border: none; border-radius: 12px; font-size: 1.05rem; font-weight: 700;
          cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 10px;
        }

        .btn-reset-premium { background: #f1f5f9; color: #475569; }
        .btn-reset-premium:hover:not(:disabled) { background: #e2e8f0; color: #0f172a; }

        .btn-submit-premium { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; box-shadow: 0 10px 20px -5px rgba(37,99,235,0.4); }
        .btn-submit-premium:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 15px 25px -5px rgba(37,99,235,0.5); }

        button:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }

        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr; gap: 0; }
          .form-actions-modern { flex-direction: column; }
          .btn-reset-premium, .btn-submit-premium { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default ApplicationForm;