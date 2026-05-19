import React, { useState } from 'react';

const AdminPortfolio = ({ projects, testimonials, loading, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ titulo: '', descricao: '', imagem: '', link: '', tecnologias: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormData({ titulo: '', descricao: '', imagem: '', link: '', tecnologias: '' });
      setShowForm(false);
      setEditingId(null);
      onRefresh();
    } catch (error) {
      alert('Erro ao salvar projeto');
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Eliminar projeto?')) {
      try {
        onRefresh();
      } catch (error) {
        alert('Erro ao eliminar projeto');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Projetos */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>Projetos ({projects.length})</h3>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ titulo: '', descricao: '', imagem: '', link: '', tecnologias: '' }); }}
            style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            {showForm ? 'Cancelar' : '+ Novo Projeto'}
          </button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
          {showForm && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <input
                type="text"
                placeholder="Título do Projeto"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              />
              <textarea
                placeholder="Descrição"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                required
                rows="4"
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1', fontFamily: 'inherit' }}
              />
              <input
                type="text"
                placeholder="URL da Imagem"
                value={formData.imagem}
                onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              />
              <input
                type="url"
                placeholder="Link do Projeto"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              />
              <input
                type="text"
                placeholder="Tecnologias (separadas por vírgula)"
                value={formData.tecnologias}
                onChange={(e) => setFormData({ ...formData, tecnologias: e.target.value })}
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              />
              <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                {editingId ? 'Atualizar' : 'Criar'} Projeto
              </button>
            </form>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {projects.map((project) => (
              <div key={project.id} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {project.imagem_url && (
                  <img src={project.imagem_url} alt={project.titulo} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                )}
                <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ color: '#f1f5f9', fontWeight: 600, margin: '0 0 8px', fontSize: '0.95rem' }}>{project.titulo}</h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.4, flex: 1, margin: 0 }}>{project.descricao}</p>
                  {project.tecnologias && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                      {project.tecnologias.split(',').map((tech, i) => (
                        <span key={i} style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button onClick={() => handleEdit(project)} style={{ flex: 1, background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(project.id)} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testemunhas */}
      <div>
        <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', marginBottom: 16 }}>Testemunhas ({testimonials.length})</h3>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 12px', fontStyle: 'italic' }}>"{testimonial.mensagem}"</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12 }}>
                  <p style={{ color: '#f1f5f9', fontWeight: 600, margin: '0 0 4px', fontSize: '0.9rem' }}>{testimonial.nome}</p>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>{testimonial.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolio;
