import React, { useState } from 'react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'JD Tecnologia & Serviço',
    email: 'contato@jdtecnologia.ao',
    phone: '+244 923 456 789',
    address: 'Luanda, Angola',
    timezone: 'Africa/Luanda',
    currency: 'AOA',
    maintenanceMode: false,
    allowRegistration: true,
    backupEnabled: true,
    emailNotifications: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = () => {
    // Save to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const SettingGroup = ({ title, children }) => (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
      <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', margin: '0 0 16px' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {children}
      </div>
    </div>
  );

  const Setting = ({ label, value, type = 'text', onChange }) => (
    <div>
      <label style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      {type === 'checkbox' ? (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          style={{ width: 18, height: 18, cursor: 'pointer' }}
        />
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows="3"
          style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1', fontFamily: 'inherit' }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1', boxSizing: 'border-box' }}
        />
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 800 }}>
      <SettingGroup title="Informações Gerais">
        <Setting
          label="Nome do Site"
          value={settings.siteName}
          onChange={(v) => handleChange('siteName', v)}
        />
        <Setting
          label="Email Geral"
          type="email"
          value={settings.email}
          onChange={(v) => handleChange('email', v)}
        />
        <Setting
          label="Telefone"
          value={settings.phone}
          onChange={(v) => handleChange('phone', v)}
        />
        <Setting
          label="Endereço"
          value={settings.address}
          onChange={(v) => handleChange('address', v)}
        />
      </SettingGroup>

      <SettingGroup title="Regionalização">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Setting
            label="Timezone"
            value={settings.timezone}
            onChange={(v) => handleChange('timezone', v)}
          />
          <Setting
            label="Moeda"
            value={settings.currency}
            onChange={(v) => handleChange('currency', v)}
          />
        </div>
      </SettingGroup>

      <SettingGroup title="Segurança">
        <Setting
          label="Modo de Manutenção"
          type="checkbox"
          value={settings.maintenanceMode}
          onChange={(v) => handleChange('maintenanceMode', v)}
        />
        <Setting
          label="Permitir Novo Registos"
          type="checkbox"
          value={settings.allowRegistration}
          onChange={(v) => handleChange('allowRegistration', v)}
        />
      </SettingGroup>

      <SettingGroup title="Backups & Notificações">
        <Setting
          label="Backups Automáticos Ativados"
          type="checkbox"
          value={settings.backupEnabled}
          onChange={(v) => handleChange('backupEnabled', v)}
        />
        <Setting
          label="Notificações por Email"
          type="checkbox"
          value={settings.emailNotifications}
          onChange={(v) => handleChange('emailNotifications', v)}
        />
      </SettingGroup>

      <SettingGroup title="Logs & Auditoria">
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Últimos logs de atividade</span>
            <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              Ver Mais
            </button>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#475569', maxHeight: 200, overflowY: 'auto' }}>
            <div style={{ padding: '8px 0' }}>
              <span style={{ color: '#94a3b8' }}>12 de mai 14:32</span> - Admin realizou login
            </div>
            <div style={{ padding: '8px 0' }}>
              <span style={{ color: '#94a3b8' }}>12 de mai 14:15</span> - Post editado: "Inovação Digital"
            </div>
            <div style={{ padding: '8px 0' }}>
              <span style={{ color: '#94a3b8' }}>12 de mai 13:45</span> - Vaga criada: "Desenvolvedor React"
            </div>
            <div style={{ padding: '8px 0' }}>
              <span style={{ color: '#94a3b8' }}>12 de mai 10:30</span> - Candidatura aprovada de João Silva
            </div>
          </div>
        </div>
      </SettingGroup>

      <SettingGroup title="Sistema">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button
            onClick={() => alert('Backup iniciado...')}
            style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >
            Fazer Backup
          </button>
          <button
            onClick={() => alert('Cache limpo!')}
            style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >
            Limpar Cache
          </button>
          <button
            onClick={() => alert('Logs limpos!')}
            style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >
            Limpar Logs
          </button>
          <button
            onClick={() => alert('Sistema atualizado!')}
            style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >
            Verificar Atualizações
          </button>
        </div>
      </SettingGroup>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button
          style={{ background: '#475569', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
        >
          Guardar Configurações
        </button>
      </div>

      {saved && (
        <div style={{ marginTop: 16, background: '#14532d', border: '1px solid #22c55e', color: '#22c55e', padding: '12px 16px', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="ri-check-line" />
          Configurações guardadas com sucesso!
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
