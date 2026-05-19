// Página Login - Autenticação de usuários
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', senha: '', lembrar: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'E-mail inválido';
    if (!formData.senha) newErrors.senha = 'A password é obrigatória';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setIsLoading(true);
    
    const result = await login(formData.email, formData.senha);
    
    setIsLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ general: result.message || 'Credenciais incorretas. Por favor, tente novamente.' });
    }
  };

  return (
    <div className="auth-page-premium">
      <div className="auth-background-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="container">
        <div className="auth-wrapper">
          <motion.div 
            className="auth-card-glass"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <div className="auth-header-modern">
              <div className="auth-logo-premium">
                <i className="ri-fingerprint-line"></i>
              </div>
              <h1>Bem-vindo de volta</h1>
              <p>Aceda ao seu painel de controlo da JD Tecnologias</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-modern">
              {errors.general && (
                <motion.div 
                  className="error-alert-premium"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <i className="ri-error-warning-fill"></i>
                  <span>{errors.general}</span>
                </motion.div>
              )}

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
                    placeholder="A sua password segura"
                    className={errors.senha ? 'input-error' : ''}
                  />
                </div>
                {errors.senha && <span className="error-text-small">{errors.senha}</span>}
              </div>

              <div className="form-options-modern">
                <label className="checkbox-custom">
                  <input type="checkbox" name="lembrar" checked={formData.lembrar} onChange={handleChange} />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Lembrar-me neste dispositivo</span>
                </label>
                <Link to="/esqueci-senha" className="forgot-link-premium">
                  Esqueceu a password?
                </Link>
              </div>

              <button type="submit" className="auth-btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line spinning"></i> A autenticar...
                  </>
                ) : (
                  <>
                    Entrar na plataforma <i className="ri-arrow-right-line"></i>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>ou</span>
            </div>

            <div className="auth-footer-modern">
              <p>
                Ainda não tem acesso? <Link to="/registro">Solicite uma conta</Link>
              </p>
            </div>
            
            <div className="demo-credentials-glass">
              <p><i className="ri-information-line"></i> Credenciais de Acesso:</p>
              <div className="demo-box">
                <div><span>Admin:</span> admin@jdtecnologia.ao / JD@Admin2024</div>
                <div><span>User:</span> usuario@teste.ao / Teste@2024</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx="true">{`
        .auth-page-premium { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; position: relative; overflow: hidden; padding: 120px 20px 60px; }
        
        .auth-background-elements { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .blob { position: absolute; filter: blur(80px); border-radius: 50%; opacity: 0.5; animation: float 20s infinite ease-in-out alternate; }
        .blob-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: rgba(59, 130, 246, 0.3); animation-delay: 0s; }
        .blob-2 { bottom: -20%; right: -10%; width: 600px; height: 600px; background: rgba(139, 92, 246, 0.2); animation-delay: -5s; }
        
        @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(50px, 50px) scale(1.1); } }

        .auth-wrapper { position: relative; z-index: 10; width: 100%; max-width: 480px; margin: 0 auto; }

        .auth-card-glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 30px; padding: 50px 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }

        .auth-header-modern { text-align: center; margin-bottom: 40px; }
        .auth-logo-premium { width: 70px; height: 70px; margin: 0 auto 24px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4); }
        .auth-logo-premium i { font-size: 36px; color: white; }
        .auth-header-modern h1 { font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 10px; }
        .auth-header-modern p { color: #94a3b8; font-size: 0.95rem; }

        .error-alert-premium { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 16px; border-radius: 16px; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 12px; font-size: 0.9rem; }
        .error-alert-premium i { font-size: 1.2rem; margin-top: -2px; }

        .form-group-modern { margin-bottom: 24px; text-align: left; }
        .form-group-modern label { display: block; margin-bottom: 8px; color: #cbd5e1; font-weight: 500; font-size: 0.9rem; }
        
        .input-with-icon { position: relative; }
        .input-with-icon i { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 1.2rem; transition: color 0.3s; }
        .input-with-icon input { width: 100%; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 16px 16px 16px 50px; color: white; font-size: 1rem; transition: all 0.3s; }
        .input-with-icon input:focus { outline: none; border-color: #3b82f6; background: rgba(15, 23, 42, 0.8); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15); }
        .input-with-icon input:focus + i, .input-with-icon input:not(:placeholder-shown) ~ i { color: #3b82f6; }
        .input-with-icon input::placeholder { color: #475569; }
        .input-with-icon input.input-error { border-color: #ef4444; }
        
        .error-text-small { color: #f87171; font-size: 0.8rem; display: block; margin-top: 6px; margin-left: 4px; }

        .form-options-modern { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; margin-top: 10px; }
        
        .checkbox-custom { display: flex; align-items: center; position: relative; padding-left: 28px; cursor: pointer; user-select: none; }
        .checkbox-custom input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
        .checkmark { position: absolute; top: 50%; left: 0; transform: translateY(-50%); height: 18px; width: 18px; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; transition: all 0.2s; }
        .checkbox-custom:hover input ~ .checkmark { background-color: rgba(255, 255, 255, 0.15); }
        .checkbox-custom input:checked ~ .checkmark { background-color: #3b82f6; border-color: #3b82f6; }
        .checkmark:after { content: ""; position: absolute; display: none; left: 6px; top: 2px; width: 4px; height: 9px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .checkbox-custom input:checked ~ .checkmark:after { display: block; }
        .checkbox-text { color: #94a3b8; font-size: 0.85rem; }

        .forgot-link-premium { color: #60a5fa; text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: color 0.2s; }
        .forgot-link-premium:hover { color: #93c5fd; text-decoration: underline; }

        .auth-btn-primary { width: 100%; padding: 16px; background: #3b82f6; color: white; border: none; border-radius: 16px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3); }
        .auth-btn-primary:hover:not(:disabled) { background: #2563eb; transform: translateY(-2px); box-shadow: 0 15px 25px rgba(59, 130, 246, 0.4); }
        .auth-btn-primary:disabled { background: #475569; box-shadow: none; cursor: not-allowed; opacity: 0.8; }

        .auth-divider { position: relative; text-align: center; margin: 30px 0; }
        .auth-divider::before { content: ""; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: rgba(255, 255, 255, 0.1); }
        .auth-divider span { position: relative; background: #0f172a; padding: 0 15px; color: #64748b; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }

        .auth-footer-modern { text-align: center; margin-bottom: 25px; }
        .auth-footer-modern p { color: #94a3b8; font-size: 0.95rem; }
        .auth-footer-modern a { color: #60a5fa; font-weight: 600; text-decoration: none; margin-left: 5px; transition: color 0.2s; }
        .auth-footer-modern a:hover { color: #93c5fd; text-decoration: underline; }

        .demo-credentials-glass { margin-top: 20px; padding: 15px; background: rgba(59, 130, 246, 0.05); border: 1px dashed rgba(59, 130, 246, 0.2); border-radius: 12px; font-size: 0.85rem; color: #94a3b8; }
        .demo-credentials-glass p { font-weight: 600; color: #cbd5e1; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .demo-credentials-glass p i { color: #60a5fa; }
        .demo-box { display: flex; flex-direction: column; gap: 6px; }
        .demo-box div { background: rgba(0,0,0,0.2); padding: 6px 10px; border-radius: 6px; font-family: monospace; letter-spacing: 0.5px; }
        .demo-box span { color: #60a5fa; font-weight: bold; margin-right: 5px; font-family: sans-serif; }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }

        @media (max-width: 576px) {
          .auth-card-glass { padding: 40px 24px; border-radius: 24px; }
          .auth-header-modern h1 { font-size: 1.5rem; }
          .form-options-modern { flex-direction: column; align-items: flex-start; gap: 15px; }
        }
      `}</style>
    </div>
  );
};

export default Login;