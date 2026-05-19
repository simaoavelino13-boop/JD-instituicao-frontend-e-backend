// Página Registro - Criação de nova conta de usuário
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ 
    nome: '', 
    email: '', 
    telefone: '', 
    senha: '', 
    confirmarSenha: '', 
    termos: false 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome completo é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
    }
    
    if (!formData.senha) {
      newErrors.senha = 'Password é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Password deve ter pelo menos 6 caracteres';
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.senha)) {
      newErrors.senha = 'Deve conter letra maiúscula e número';
    }
    
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As passwords não coincidem';
    }
    
    if (!formData.termos) {
      newErrors.termos = 'Tem de aceitar os termos de uso';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) { 
      setErrors(validationErrors); 
      return; 
    }
    
    setIsLoading(true);
    const result = await register(formData);
    setIsLoading(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ general: result.message || 'Erro ao criar conta. Tente novamente.' });
    }
  };

  return (
    <div className="auth-page-premium">
      <div className="auth-background-elements">
        <div className="blob blob-1 register-blob"></div>
        <div className="blob blob-2 register-blob"></div>
      </div>
      
      <div className="container">
        <div className="auth-wrapper register-wrapper">
          <motion.div 
            className="auth-card-glass"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <div className="auth-header-modern">
              <div className="auth-logo-premium register-logo">
                <i className="ri-user-add-line"></i>
              </div>
              <h1>Criar Conta Profissional</h1>
              <p>Junte-se à nossa plataforma inovadora</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-modern">
              {errors.general && (
                <motion.div 
                  className="error-alert-premium"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.9rem' }}
                >
                  <i className="ri-error-warning-fill" style={{ fontSize: '1.2rem', marginTop: '-2px' }}></i>
                  <span>{errors.general}</span>
                </motion.div>
              )}
              <div className="form-row-modern">
                <div className="form-group-modern">
                  <label htmlFor="nome">Nome Completo</label>
                  <div className="input-with-icon">
                    <i className="ri-user-line"></i>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="O seu nome"
                      className={errors.nome ? 'input-error' : ''}
                    />
                  </div>
                  {errors.nome && <span className="error-text-small">{errors.nome}</span>}
                </div>

                <div className="form-group-modern">
                  <label htmlFor="telefone">Telefone</label>
                  <div className="input-with-icon">
                    <i className="ri-phone-line"></i>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="+244 923 456 789"
                      className={errors.telefone ? 'input-error' : ''}
                    />
                  </div>
                  {errors.telefone && <span className="error-text-small">{errors.telefone}</span>}
                </div>
              </div>

              <div className="form-group-modern">
                <label htmlFor="email">Email Profissional</label>
                <div className="input-with-icon">
                  <i className="ri-mail-line"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nome@empresa.ao"
                    className={errors.email ? 'input-error' : ''}
                  />
                </div>
                {errors.email && <span className="error-text-small">{errors.email}</span>}
              </div>

              <div className="form-row-modern">
                <div className="form-group-modern">
                  <label htmlFor="senha">Password</label>
                  <div className="input-with-icon">
                    <i className="ri-lock-password-line"></i>
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      placeholder="Crie uma password"
                      className={errors.senha ? 'input-error' : ''}
                    />
                  </div>
                  {errors.senha && <span className="error-text-small">{errors.senha}</span>}
                </div>

                <div className="form-group-modern">
                  <label htmlFor="confirmarSenha">Confirmar Password</label>
                  <div className="input-with-icon">
                    <i className="ri-lock-password-fill"></i>
                    <input
                      type="password"
                      id="confirmarSenha"
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      placeholder="Repita a password"
                      className={errors.confirmarSenha ? 'input-error' : ''}
                    />
                  </div>
                  {errors.confirmarSenha && <span className="error-text-small">{errors.confirmarSenha}</span>}
                </div>
              </div>

              <div className="form-options-modern termos-modern">
                <label className="checkbox-custom">
                  <input type="checkbox" name="termos" checked={formData.termos} onChange={handleChange} />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    Li e aceito os <Link to="/termos" className="highlight-link">Termos</Link> e a <Link to="/privacidade" className="highlight-link">Privacidade</Link>
                  </span>
                </label>
                {errors.termos && <span className="error-text-small" style={{display: 'block', marginTop: '8px'}}>{errors.termos}</span>}
              </div>

              <button type="submit" className="auth-btn-primary register-btn-action" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line spinning"></i> A criar conta...
                  </>
                ) : (
                  <>
                    Criar conta agora <i className="ri-arrow-right-line"></i>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>ou</span>
            </div>

            <div className="auth-footer-modern">
              <p>
                Já tem uma conta? <Link to="/login">Faça Login</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx="true">{`
        .auth-page-premium { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; position: relative; overflow: hidden; padding: 120px 20px 60px; }
        
        .auth-background-elements { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .blob { position: absolute; filter: blur(80px); border-radius: 50%; opacity: 0.5; animation: float 20s infinite ease-in-out alternate; }
        .blob-1.register-blob { top: -10%; right: -10%; left: auto; width: 600px; height: 600px; background: rgba(16, 185, 129, 0.2); animation-delay: 0s; }
        .blob-2.register-blob { bottom: -20%; left: -10%; right: auto; width: 500px; height: 500px; background: rgba(59, 130, 246, 0.2); animation-delay: -5s; }
        
        @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(50px, 50px) scale(1.1); } }

        .auth-wrapper { position: relative; z-index: 10; width: 100%; max-width: 480px; margin: 0 auto; }
        .register-wrapper { max-width: 650px; }

        .auth-card-glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 30px; padding: 50px 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }

        .auth-header-modern { text-align: center; margin-bottom: 40px; }
        .auth-logo-premium { width: 70px; height: 70px; margin: 0 auto 24px; border-radius: 20px; display: flex; align-items: center; justify-content: center; }
        .register-logo { background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4); }
        .auth-logo-premium i { font-size: 36px; color: white; }
        .auth-header-modern h1 { font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 10px; }
        .auth-header-modern p { color: #94a3b8; font-size: 0.95rem; }

        .form-row-modern { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .form-group-modern { margin-bottom: 24px; text-align: left; }
        .form-group-modern label { display: block; margin-bottom: 8px; color: #cbd5e1; font-weight: 500; font-size: 0.9rem; }
        
        .input-with-icon { position: relative; }
        .input-with-icon i { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 1.2rem; transition: color 0.3s; }
        .input-with-icon input { width: 100%; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 16px 16px 16px 50px; color: white; font-size: 1rem; transition: all 0.3s; }
        .input-with-icon input:focus { outline: none; border-color: #10b981; background: rgba(15, 23, 42, 0.8); box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15); }
        .input-with-icon input:focus + i, .input-with-icon input:not(:placeholder-shown) ~ i { color: #10b981; }
        .input-with-icon input::placeholder { color: #475569; }
        .input-with-icon input.input-error { border-color: #ef4444; }
        
        .error-text-small { color: #f87171; font-size: 0.8rem; display: block; margin-top: 6px; margin-left: 4px; }

        .form-options-modern { margin-bottom: 30px; margin-top: 10px; }
        .termos-modern { display: flex; flex-direction: column; align-items: flex-start; }
        
        .checkbox-custom { display: flex; align-items: center; position: relative; padding-left: 28px; cursor: pointer; user-select: none; }
        .checkbox-custom input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
        .checkmark { position: absolute; top: 50%; left: 0; transform: translateY(-50%); height: 18px; width: 18px; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; transition: all 0.2s; }
        .checkbox-custom:hover input ~ .checkmark { background-color: rgba(255, 255, 255, 0.15); }
        .checkbox-custom input:checked ~ .checkmark { background-color: #10b981; border-color: #10b981; }
        .checkmark:after { content: ""; position: absolute; display: none; left: 6px; top: 2px; width: 4px; height: 9px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .checkbox-custom input:checked ~ .checkmark:after { display: block; }
        .checkbox-text { color: #94a3b8; font-size: 0.85rem; }

        .highlight-link { color: #10b981; text-decoration: none; font-weight: 600; transition: color 0.2s; }
        .highlight-link:hover { color: #34d399; text-decoration: underline; }

        .auth-btn-primary { width: 100%; padding: 16px; background: #3b82f6; color: white; border: none; border-radius: 16px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3); }
        .register-btn-action { background: #10b981; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }
        .register-btn-action:hover:not(:disabled) { background: #059669; box-shadow: 0 15px 25px rgba(16, 185, 129, 0.4); transform: translateY(-2px); }
        .auth-btn-primary:disabled { background: #475569; box-shadow: none; cursor: not-allowed; opacity: 0.8; }

        .auth-divider { position: relative; text-align: center; margin: 30px 0; }
        .auth-divider::before { content: ""; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: rgba(255, 255, 255, 0.1); }
        .auth-divider span { position: relative; background: #0f172a; padding: 0 15px; color: #64748b; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }

        .auth-footer-modern { text-align: center; margin-bottom: 10px; }
        .auth-footer-modern p { color: #94a3b8; font-size: 0.95rem; }
        .auth-footer-modern a { color: #10b981; font-weight: 600; text-decoration: none; margin-left: 5px; transition: color 0.2s; }
        .auth-footer-modern a:hover { color: #34d399; text-decoration: underline; }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }

        @media (max-width: 768px) {
          .auth-card-glass { padding: 40px 24px; border-radius: 24px; }
          .form-row-modern { grid-template-columns: 1fr; gap: 0; }
          .auth-header-modern h1 { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Register;