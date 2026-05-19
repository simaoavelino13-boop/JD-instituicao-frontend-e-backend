import React, { useState } from 'react';

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState('month');

  const StatCard = ({ title, value, change, icon, color }) => (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 4px', fontWeight: 600 }}>{title}</p>
          <p style={{ color: '#f1f5f9', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{value}</p>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className={icon} style={{ color, fontSize: 20 }} />
        </div>
      </div>
      <div style={{ fontSize: '0.8rem', color: change >= 0 ? '#10b981' : '#ef4444' }}>
        <i className={change >= 0 ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} style={{ marginRight: 4 }} />
        {Math.abs(change)}% vs período anterior
      </div>
    </div>
  );

  const ChartPlaceholder = ({ title }) => (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <i className="ri-bar-chart-line" style={{ fontSize: 48, color: '#475569', marginBottom: 12 }} />
      <p style={{ color: '#64748b', fontWeight: 600, margin: 0 }}>{title}</p>
      <p style={{ color: '#475569', fontSize: '0.85rem', margin: '4px 0 0' }}>Gráfico será exibido após integração de dados</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Filtros */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.3rem', margin: 0 }}>Relatórios & Análises</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              style={{
                background: dateRange === range ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                color: dateRange === range ? 'white' : '#64748b',
                border: dateRange === range ? 'none' : '1px solid rgba(255,255,255,0.1)',
                padding: '8px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                transition: 'all 0.2s'
              }}
            >
              {range === 'day' && 'Hoje'}
              {range === 'week' && 'Esta Semana'}
              {range === 'month' && 'Este Mês'}
              {range === 'year' && 'Este Ano'}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard
          title="Visitantes Únicos"
          value="4,829"
          change={12}
          icon="ri-eye-line"
          color="#3b82f6"
        />
        <StatCard
          title="Taxa de Conversão"
          value="3.24%"
          change={-2}
          icon="ri-mail-check-line"
          color="#10b981"
        />
        <StatCard
          title="Tempo Médio Página"
          value="2m 34s"
          change={8}
          icon="ri-time-line"
          color="#f59e0b"
        />
        <StatCard
          title="Taxa de Rejeição"
          value="32.8%"
          change={-5}
          icon="ri-logout-circle-line"
          color="#ef4444"
        />
      </div>

      {/* Gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
        <ChartPlaceholder title="Visitantes ao Longo do Tempo" />
        <ChartPlaceholder title="Páginas Mais Visitadas" />
      </div>

      {/* Tabelas de Dados */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
        {/* Fontes de Tráfego */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', margin: '0 0 16px' }}>Fontes de Tráfego</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Busca Orgânica', value: 2450, percent: 50 },
              { name: 'Direto', value: 1200, percent: 25 },
              { name: 'Referência', value: 980, percent: 20 },
              { name: 'Social Media', value: 199, percent: 5 },
            ].map((source, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600 }}>{source.name}</span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{source.value.toLocaleString()}</span>
                </div>
                <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{ background: '#3b82f6', width: `${source.percent}%`, height: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispositivos */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', margin: '0 0 16px' }}>Dispositivos Mais Usados</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Desktop', icon: 'ri-computer-line', value: 2850, percent: 59 },
              { name: 'Mobile', icon: 'ri-smartphone-line', value: 1680, percent: 35 },
              { name: 'Tablet', icon: 'ri-tablet-line', value: 280, percent: 6 },
            ].map((device, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <i className={device.icon} style={{ color: '#3b82f6', fontSize: 18 }} />
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, flex: 1 }}>{device.name}</span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{device.value}</span>
                </div>
                <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{ background: '#3b82f6', width: `${device.percent}%`, height: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Atividade Recente */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
        <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', margin: '0 0 16px' }}>Atividade Recente do Sistema</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { time: '14:32', action: 'Novo post publicado', author: 'Maria Silva', type: 'create' },
            { time: '13:45', action: 'Vaga atualizada', author: 'João Santos', type: 'update' },
            { time: '12:15', action: 'Candidatura aprovada', author: 'Sistema', type: 'success' },
            { time: '11:30', action: 'Mensagem deletada', author: 'Admin', type: 'delete' },
            { time: '10:45', action: 'Backup realizado', author: 'Sistema', type: 'backup' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: item.type === 'create' ? '#3b82f622' : item.type === 'update' ? '#f59e0b22' : item.type === 'success' ? '#10b98122' : item.type === 'delete' ? '#ef444422' : '#8b5cf622'
              }}>
                <i className={
                  item.type === 'create' ? 'ri-add-line' : item.type === 'update' ? 'ri-edit-line' : item.type === 'success' ? 'ri-check-line' : item.type === 'delete' ? 'ri-delete-bin-line' : 'ri-save-line'
                } style={{
                  color: item.type === 'create' ? '#3b82f6' : item.type === 'update' ? '#f59e0b' : item.type === 'success' ? '#10b981' : item.type === 'delete' ? '#ef4444' : '#8b5cf6',
                  fontSize: 18
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#cbd5e1', margin: '0 0 2px', fontWeight: 600, fontSize: '0.9rem' }}>{item.action}</p>
                <p style={{ color: '#64748b', margin: 0, fontSize: '0.8rem' }}>por {item.author}</p>
              </div>
              <span style={{ color: '#475569', fontSize: '0.8rem' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
