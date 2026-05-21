import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import AdminBlog from './AdminBlog';
import AdminRecruitment from './AdminRecruitment';
import AdminPortfolio from './AdminPortfolio';
import AdminGallery from './AdminGallery';
import AdminAnalytics from './AdminAnalytics';
import AdminSettings from './AdminSettings';

/* ─── helpers ─────────────────────────────────────────────────── */
const fmt = (d) => d ? new Date(d).toLocaleDateString('pt-AO', { day:'2-digit', month:'short', year:'numeric' }) : '—';
const badge = (v, map) => {
  const cfg = map[v] || { label: v, color: '#64748b' };
  return <span style={{ background: cfg.color+'22', color: cfg.color, padding:'3px 10px', borderRadius:20, fontSize:'0.75rem', fontWeight:700 }}>{cfg.label}</span>;
};
const statusMsg  = { unread:{label:'Não lida',color:'#f59e0b'}, read:{label:'Lida',color:'#3b82f6'}, replied:{label:'Respondida',color:'#10b981'} };
const statusApp  = { nova:{label:'Nova',color:'#f59e0b'}, em_analise:{label:'Em análise',color:'#3b82f6'}, aprovada:{label:'Aprovada',color:'#10b981'}, rejeitada:{label:'Rejeitada',color:'#ef4444'} };
const roleMap    = { admin:{label:'Admin',color:'#8b5cf6'}, editor:{label:'Editor',color:'#3b82f6'}, user:{label:'Utilizador',color:'#64748b'} };

/* ─── stat card ───────────────────────────────────────────────── */
const StatCard = ({ icon, label, value, color }) => (
  <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:'28px 24px', display:'flex', alignItems:'center', gap:20 }}>
    <div style={{ width:56, height:56, borderRadius:16, background:`${color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <i className={icon} style={{ fontSize:28, color }} />
    </div>
    <div>
      <div style={{ fontSize:'2rem', fontWeight:800, color:'#f1f5f9', lineHeight:1 }}>{value ?? '—'}</div>
      <div style={{ color:'#94a3b8', fontSize:'0.85rem', marginTop:4 }}>{label}</div>
    </div>
  </div>
);

/* ─── data table ──────────────────────────────────────────────── */
const Table = ({ cols, rows, actions }) => (
  <div style={{ overflowX:'auto' }}>
    <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.88rem' }}>
      <thead>
        <tr>
          {cols.map(c => <th key={c.key} style={{ textAlign:'left', padding:'12px 16px', color:'#64748b', fontWeight:600, borderBottom:'1px solid rgba(255,255,255,0.06)', whiteSpace:'nowrap' }}>{c.label}</th>)}
          {actions && <th style={{ textAlign:'right', padding:'12px 16px', color:'#64748b', fontWeight:600, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0
          ? <tr><td colSpan={cols.length + (actions?1:0)} style={{ textAlign:'center', padding:40, color:'#475569' }}>Sem dados</td></tr>
          : rows.map((row, i) => (
            <tr key={row.id || i} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              {cols.map(c => <td key={c.key} style={{ padding:'14px 16px', color:'#cbd5e1', verticalAlign:'middle' }}>{c.render ? c.render(row[c.key], row) : (row[c.key] ?? '—')}</td>)}
              {actions && <td style={{ padding:'14px 16px', textAlign:'right' }}>{actions(row)}</td>}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

/* ─── section wrapper ─────────────────────────────────────────── */
const Section = ({ title, subtitle, children, toolbar }) => (
  <div>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28, flexWrap:'wrap', gap:16 }}>
      <div>
        <h2 style={{ color:'#f1f5f9', fontWeight:800, fontSize:'1.5rem', margin:0 }}>{title}</h2>
        {subtitle && <p style={{ color:'#64748b', margin:'6px 0 0', fontSize:'0.9rem' }}>{subtitle}</p>}
      </div>
      {toolbar}
    </div>
    <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, overflow:'hidden' }}>
      {children}
    </div>
  </div>
);

/* ─── icon btn ────────────────────────────────────────────────── */
const IBtn = ({ icon, color='#64748b', title, onClick }) => (
  <button title={title} onClick={onClick}
    style={{ background:'none', border:'none', cursor:'pointer', color, fontSize:18, padding:'4px 6px', borderRadius:8, transition:'opacity 0.2s' }}
    onMouseEnter={e=>e.currentTarget.style.opacity='0.7'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
    <i className={icon} />
  </button>
);

/* ─── select inline ───────────────────────────────────────────── */
const InlineSelect = ({ value, options, onChange }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{ background:'#1e293b', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, color:'#cbd5e1', padding:'4px 8px', fontSize:'0.8rem', cursor:'pointer' }}>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // data state
  const [stats, setStats]         = useState(null);
  const [recentMsg, setRecentMsg] = useState([]);
  const [recentApp, setRecentApp] = useState([]);
  const [users, setUsers]         = useState([]);
  const [messages, setMessages]   = useState([]);
  const [posts, setPosts]         = useState([]);
  const [applications, setApps]   = useState([]);
  const [subscribers, setSubs]    = useState([]);
  const [jobs, setJobs]           = useState([]);
  const [projects, setProjects]   = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery]     = useState([]);
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // guard
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') navigate('/login');
  }, [isAuthenticated, user, navigate]);

  const showToast = (msg, type='success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async (sec) => {
    setLoading(true);
    try {
      if (sec === 'dashboard') {
        const r = await api.get('/admin/dashboard');
        setStats(r.data.stats);
        setRecentMsg(r.data.recentMessages || []);
        setRecentApp(r.data.recentApplications || []);
      } else if (sec === 'users') {
        const r = await api.get('/admin/users');
        setUsers(r.data.data || []);
      } else if (sec === 'messages') {
        const r = await api.get('/admin/messages');
        setMessages(r.data.data || []);
      } else if (sec === 'blog') {
        const r = await api.get('/admin/blog/posts');
        setPosts(r.data.data || []);
      } else if (sec === 'recruitment') {
        const [jobs_r, apps_r] = await Promise.all([
          api.get('/admin/jobs'),
          api.get('/admin/applications')
        ]);
        setJobs(jobs_r.data.data || []);
        setApps(apps_r.data.data || []);
      } else if (sec === 'portfolio') {
        const [projects_r, testimonials_r] = await Promise.all([
          api.get('/admin/portfolio'),
          api.get('/admin/testimonials')
        ]);
        setProjects(projects_r.data.data || []);
        setTestimonials(testimonials_r.data.data || []);
      } else if (sec === 'subscribers') {
        const r = await api.get('/admin/subscribers');
        setSubs(r.data.data || []);
      } else if (sec === 'gallery') {
        const r = await api.get('/admin/gallery');
        setGallery(r.data.data || []);
      }
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar dados. Verifique o backend.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(section); }, [section, load]);

  const act = async (method, url, body, successMsg) => {
    try {
      await api[method](url, body);
      showToast(successMsg);
      load(section);
    } catch {
      showToast('Erro ao executar ação.', 'error');
    }
  };

  /* ── nav items ── */
  const nav = [
    { id:'dashboard',    icon:'ri-dashboard-line',    label:'Dashboard' },
    { id:'users',        icon:'ri-team-line',          label:'Utilizadores' },
    { id:'messages',     icon:'ri-mail-line',          label:'Mensagens' },
    { id:'blog',         icon:'ri-article-line',       label:'Blog' },
    { id:'recruitment',  icon:'ri-briefcase-line',     label:'Recrutamento' },
    { id:'portfolio',    icon:'ri-image-gallery-line', label:'Portfólio' },
    { id:'gallery',      icon:'ri-camera-line',        label:'Galeria' },
    { id:'analytics',    icon:'ri-bar-chart-line',     label:'Relatórios' },
    { id:'subscribers',  icon:'ri-rss-line',           label:'Newsletter' },
    { id:'settings',     icon:'ri-settings-4-line',    label:'Configurações' },
  ];

  /* ── sidebar width ── */
  const SW = sidebarOpen ? 240 : 72;

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0a1020', fontFamily:'Inter,system-ui,sans-serif' }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────── */}
      <aside style={{ width:SW, minHeight:'100vh', background:'#0d1526', borderRight:'1px solid rgba(255,255,255,0.07)', display:'flex', flexDirection:'column', transition:'width 0.25s', flexShrink:0, position:'sticky', top:0 }}>
        {/* logo */}
        <div style={{ padding:'20px 16px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ width:40, height:40, background:'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <i className="ri-computer-line" style={{ color:'white', fontSize:20 }} />
          </div>
          {sidebarOpen && <div><div style={{ color:'#3b82f6', fontWeight:800, fontSize:'1rem', lineHeight:1 }}>JD Admin</div><div style={{ color:'#475569', fontSize:'0.7rem', marginTop:2 }}>Painel de Controlo</div></div>}
        </div>

        {/* nav */}
        <nav style={{ flex:1, padding:'12px 8px', display:'flex', flexDirection:'column', gap:4 }}>
          {nav.map(n => {
            const active = section === n.id;
            return (
              <button key={n.id} onClick={() => setSection(n.id)}
                title={!sidebarOpen ? n.label : ''}
                style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', borderRadius:12, border:'none', cursor:'pointer', background: active ? 'rgba(59,130,246,0.15)' : 'transparent', color: active ? '#3b82f6' : '#64748b', fontWeight: active ? 700 : 500, fontSize:'0.9rem', textAlign:'left', transition:'all 0.2s', width:'100%' }}
                onMouseEnter={e => { if(!active) e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#cbd5e1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = active?'rgba(59,130,246,0.15)':'transparent'; e.currentTarget.style.color = active?'#3b82f6':'#64748b'; }}>
                <i className={n.icon} style={{ fontSize:20, flexShrink:0 }} />
                {sidebarOpen && <span>{n.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* bottom */}
        <div style={{ padding:'12px 8px', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', flexDirection:'column', gap:4 }}>
          <button onClick={() => setSidebarOpen(p=>!p)}
            style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:12, border:'none', cursor:'pointer', background:'transparent', color:'#475569', fontSize:'0.85rem', width:'100%' }}>
            <i className={sidebarOpen ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'} style={{ fontSize:20 }} />
            {sidebarOpen && 'Recolher'}
          </button>
          <button onClick={() => { logout(); navigate('/'); }}
            style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:12, border:'none', cursor:'pointer', background:'transparent', color:'#ef4444', fontSize:'0.85rem', width:'100%' }}>
            <i className="ri-logout-box-line" style={{ fontSize:20 }} />
            {sidebarOpen && 'Sair'}
          </button>
        </div>
      </aside>

      {/* ── MAIN ──────────────────────────────────────────────────── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>

        {/* topbar */}
        <header style={{ background:'rgba(13,21,38,0.9)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'16px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100 }}>
          <div>
            <h1 style={{ margin:0, color:'#f1f5f9', fontWeight:700, fontSize:'1.1rem' }}>{nav.find(n=>n.id===section)?.label}</h1>
            <p style={{ margin:0, color:'#475569', fontSize:'0.8rem' }}>JD Tecnologia & Serviço — Área Administrativa</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            {loading && <div style={{ width:18, height:18, border:'2px solid rgba(59,130,246,0.3)', borderTopColor:'#3b82f6', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />}
            <div style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:30, padding:'8px 16px' }}>
              <i className="ri-user-circle-line" style={{ color:'#3b82f6', fontSize:20 }} />
              <span style={{ color:'#cbd5e1', fontSize:'0.85rem' }}>{user?.name || 'Admin'}</span>
              <span style={{ background:'rgba(139,92,246,0.2)', color:'#a78bfa', fontSize:'0.7rem', fontWeight:700, padding:'2px 8px', borderRadius:20 }}>ADMIN</span>
            </div>
          </div>
        </header>

        {/* content */}
        <main style={{ flex:1, padding:28, overflowY:'auto' }}>

          {/* ── DASHBOARD ── */}
          {section === 'dashboard' && (
            <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:20 }}>
                <StatCard icon="ri-team-line"         label="Utilizadores"  value={stats?.users}        color="#3b82f6" />
                <StatCard icon="ri-mail-line"          label="Mensagens"     value={stats?.messages}     color="#f59e0b" />
                <StatCard icon="ri-article-line"       label="Posts Blog"    value={stats?.blog}         color="#10b981" />
                <StatCard icon="ri-briefcase-line"     label="Candidaturas"  value={stats?.applications} color="#8b5cf6" />
                <StatCard icon="ri-rss-line"           label="Subscritores"  value={stats?.subscribers}  color="#ef4444" />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                <Section title="Mensagens Recentes" subtitle="Últimas 5 mensagens de contacto">
                  <Table
                    cols={[
                      { key:'nome',      label:'Nome' },
                      { key:'assunto',   label:'Assunto' },
                      { key:'status',    label:'Estado', render: v => badge(v, statusMsg) },
                      { key:'created_at',label:'Data',   render: fmt },
                    ]}
                    rows={recentMsg}
                  />
                </Section>
                <Section title="Candidaturas Recentes" subtitle="Últimas 5 candidaturas recebidas">
                  <Table
                    cols={[
                      { key:'nome',     label:'Nome' },
                      { key:'vaga_id',  label:'Vaga' },
                      { key:'status',   label:'Estado', render: v => badge(v, statusApp) },
                      { key:'created_at',label:'Data',  render: fmt },
                    ]}
                    rows={recentApp}
                  />
                </Section>
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {section === 'users' && (
            <Section title="Utilizadores" subtitle={`${users.length} utilizadores registados`}>
              <Table
                cols={[
                  { key:'name',       label:'Nome' },
                  { key:'email',      label:'Email' },
                  { key:'phone',      label:'Telefone' },
                  { key:'role',       label:'Role',    render: v => badge(v, roleMap) },
                  { key:'status',     label:'Estado',  render: v => badge(v === 'active' || v === true ? 'active' : 'inactive', { active:{label:'Ativo',color:'#10b981'}, inactive:{label:'Inativo',color:'#ef4444'} }) },
                  { key:'created_at', label:'Registo', render: fmt },
                ]}
                rows={users}
                actions={row => (
                  <div style={{ display:'flex', gap:4, justifyContent:'flex-end' }}>
                    <InlineSelect value={row.role} options={[{value:'user',label:'User'},{value:'editor',label:'Editor'},{value:'admin',label:'Admin'}]}
                      onChange={v => act('put', `/admin/users/${row.id}/role`, { role:v }, 'Role atualizado')} />
                    <IBtn icon="ri-toggle-line"  color="#f59e0b" title="Toggle status" onClick={() => act('put', `/admin/users/${row.id}/toggle-status`, {}, 'Status alterado')} />
                    <IBtn icon="ri-delete-bin-line" color="#ef4444" title="Eliminar" onClick={() => { if(window.confirm('Eliminar utilizador?')) act('delete', `/admin/users/${row.id}`, null, 'Utilizador eliminado'); }} />
                  </div>
                )}
              />
            </Section>
          )}

          {/* ── MESSAGES ── */}
          {section === 'messages' && (
            <Section title="Mensagens de Contacto" subtitle={`${messages.length} mensagens`}>
              <Table
                cols={[
                  { key:'nome',       label:'Nome' },
                  { key:'email',      label:'Email' },
                  { key:'assunto',    label:'Assunto' },
                  { key:'status',     label:'Estado', render: v => badge(v, statusMsg) },
                  { key:'created_at', label:'Data',   render: fmt },
                ]}
                rows={messages}
                actions={row => (
                  <div style={{ display:'flex', gap:4, justifyContent:'flex-end' }}>
                    <IBtn icon="ri-eye-line" color="#3b82f6" title="Ver" onClick={() => setSelectedMessage(row)} />
                    <InlineSelect value={row.status} options={[{value:'unread',label:'Não lida'},{value:'read',label:'Lida'},{value:'replied',label:'Respondida'}]}
                      onChange={v => act('put', `/admin/messages/${row.id}/status`, { status:v }, 'Estado atualizado')} />
                    <IBtn icon="ri-delete-bin-line" color="#ef4444" title="Eliminar" onClick={() => { if(window.confirm('Eliminar mensagem?')) act('delete', `/admin/messages/${row.id}`, null, 'Mensagem eliminada'); }} />
                  </div>
                )}
              />
            </Section>
          )}

          {/* ── BLOG ── */}
          {section === 'blog' && (
            <AdminBlog posts={posts} loading={loading} onRefresh={() => load('blog')} />
          )}

          {/* ── RECRUITMENT ── */}
          {section === 'recruitment' && (
            <AdminRecruitment applications={applications} jobs={jobs} loading={loading} onRefresh={() => load('recruitment')} />
          )}

          {/* ── PORTFOLIO ── */}
          {section === 'portfolio' && (
            <AdminPortfolio projects={projects} testimonials={testimonials} loading={loading} onRefresh={() => load('portfolio')} />
          )}

          {/* ── ANALYTICS ── */}
          {section === 'analytics' && (
            <AdminAnalytics />
          )}

          {/* ── SUBSCRIBERS ── */}
          {section === 'subscribers' && (
            <Section title="Subscritores Newsletter" subtitle={`${subscribers.length} subscritores`}>
              <Table
                cols={[
                  { key:'email',          label:'Email' },
                  { key:'ativo',          label:'Ativo', render: v => badge(v ? 'active' : 'inactive', { active:{label:'Ativo',color:'#10b981'}, inactive:{label:'Inativo',color:'#ef4444'} }) },
                  { key:'subscribed_at',  label:'Data',  render: fmt },
                ]}
                rows={subscribers}
              />
            </Section>
          )}

          {/* ── SETTINGS ── */}
          {section === 'settings' && (
            <AdminSettings />
          )}

          {/* ── GALLERY ── */}
          {section === 'gallery' && (
            <AdminGallery items={gallery} loading={loading} onRefresh={() => load('gallery')} />
          )}

        </main>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'#0d1526', border:'1px solid rgba(255,255,255,0.1)', borderRadius:24, width:'100%', maxWidth:600, overflow:'hidden', boxShadow:'0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ padding:'24px 32px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <h3 style={{ margin:0, color:'#f1f5f9', fontSize:'1.25rem', fontWeight:800 }}>Mensagem de Contacto</h3>
              <IBtn icon="ri-close-line" title="Fechar" onClick={() => setSelectedMessage(null)} />
            </div>
            <div style={{ padding:'32px', display:'flex', flexDirection:'column', gap:20 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                <div>
                  <p style={{ margin:'0 0 4px', color:'#64748b', fontSize:'0.8rem', fontWeight:600, textTransform:'uppercase' }}>Remetente</p>
                  <p style={{ margin:0, color:'#cbd5e1', fontSize:'1rem' }}>{selectedMessage.nome}</p>
                </div>
                <div>
                  <p style={{ margin:'0 0 4px', color:'#64748b', fontSize:'0.8rem', fontWeight:600, textTransform:'uppercase' }}>Email</p>
                  <p style={{ margin:0, color:'#cbd5e1', fontSize:'1rem' }}>{selectedMessage.email}</p>
                </div>
                <div>
                  <p style={{ margin:'0 0 4px', color:'#64748b', fontSize:'0.8rem', fontWeight:600, textTransform:'uppercase' }}>Telefone</p>
                  <p style={{ margin:0, color:'#cbd5e1', fontSize:'1rem' }}>{selectedMessage.telefone || 'N/A'}</p>
                </div>
                <div>
                  <p style={{ margin:'0 0 4px', color:'#64748b', fontSize:'0.8rem', fontWeight:600, textTransform:'uppercase' }}>Data</p>
                  <p style={{ margin:0, color:'#cbd5e1', fontSize:'1rem' }}>{fmt(selectedMessage.created_at)}</p>
                </div>
              </div>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:20 }}>
                <p style={{ margin:'0 0 4px', color:'#64748b', fontSize:'0.8rem', fontWeight:600, textTransform:'uppercase' }}>Assunto</p>
                <p style={{ margin:'0 0 16px', color:'#f1f5f9', fontSize:'1.1rem', fontWeight:600 }}>{selectedMessage.assunto}</p>
                <p style={{ margin:'0 0 4px', color:'#64748b', fontSize:'0.8rem', fontWeight:600, textTransform:'uppercase' }}>Mensagem</p>
                <div style={{ background:'rgba(255,255,255,0.03)', padding:20, borderRadius:12, color:'#cbd5e1', fontSize:'0.95rem', lineHeight:1.6, whiteSpace:'pre-wrap' }}>
                  {selectedMessage.mensagem}
                </div>
              </div>
            </div>
            <div style={{ padding:'20px 32px', borderTop:'1px solid rgba(255,255,255,0.08)', background:'rgba(0,0,0,0.2)', display:'flex', justifyContent:'flex-end', gap:12 }}>
              <button onClick={() => {
                act('put', `/admin/messages/${selectedMessage.id}/status`, { status: 'replied' }, 'Estado atualizado para Respondida');
                setSelectedMessage(null);
              }} style={{ background:'rgba(16,185,129,0.15)', color:'#10b981', border:'none', padding:'10px 20px', borderRadius:12, cursor:'pointer', fontWeight:600, display:'flex', alignItems:'center', gap:8 }}>
                <i className="ri-check-double-line" />
                Marcar como Respondida
              </button>
              <button onClick={() => setSelectedMessage(null)} style={{ background:'rgba(255,255,255,0.1)', color:'#f1f5f9', border:'none', padding:'10px 20px', borderRadius:12, cursor:'pointer', fontWeight:600 }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', bottom:28, right:28, background: toast.type==='error'?'#7f1d1d':'#14532d', border:`1px solid ${toast.type==='error'?'#ef4444':'#22c55e'}`, color:'white', padding:'14px 22px', borderRadius:14, fontWeight:600, fontSize:'0.9rem', zIndex:9999, boxShadow:'0 10px 30px rgba(0,0,0,0.4)', display:'flex', alignItems:'center', gap:10 }}>
          <i className={toast.type==='error'?'ri-error-warning-line':'ri-check-line'} style={{ fontSize:20 }} />
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        select { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </div>
  );
}
