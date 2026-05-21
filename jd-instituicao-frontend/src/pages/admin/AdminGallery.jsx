import React, { useState } from 'react';
import api from '../../services/api';

const AdminGallery = ({ items, loading, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    titulo: '', 
    descricao: '', 
    imagem_url: '', 
    categoria: '', 
    destaque: false 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/gallery/${editingId}`, formData);
      } else {
        await api.post('/admin/gallery', formData);
      }
      setFormData({ titulo: '', descricao: '', imagem_url: '', categoria: '', destaque: false });
      setShowForm(false);
      setEditingId(null);
      onRefresh();
    } catch (error) {
      alert('Erro ao salvar imagem na galeria');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      titulo: item.titulo || '',
      descricao: item.descricao || '',
      imagem_url: item.imagem_url || '',
      categoria: item.categoria || '',
      destaque: item.destaque || false
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Eliminar imagem da galeria?')) {
      try {
        await api.delete(`/admin/gallery/${id}`);
        onRefresh();
      } catch (error) {
        alert('Erro ao eliminar imagem');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>Galeria de Imagens ({items.length})</h3>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ titulo: '', descricao: '', imagem_url: '', categoria: '', destaque: false }); }}
            style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            {showForm ? 'Cancelar' : '+ Nova Imagem'}
          </button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
          {showForm && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <input
                type="text"
                placeholder="Título da Imagem"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows="3"
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1', fontFamily: 'inherit' }}
              />
              <input
                type="url"
                placeholder="URL da Imagem"
                value={formData.imagem_url}
                onChange={(e) => setFormData({ ...formData, imagem_url: e.target.value })}
                required
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              />
              <input
                type="text"
                placeholder="Categoria (ex: Eventos, Instalações...)"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                required
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              />
              <label style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={formData.destaque}
                  onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                />
                Destacar imagem na página principal?
              </label>
              <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                {editingId ? 'Atualizar' : 'Adicionar'} Imagem
              </button>
            </form>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {items.map((item) => (
              <div key={item.id} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {item.imagem_url ? (
                  <img src={item.imagem_url} alt={item.titulo} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: 160, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                    Sem Imagem
                  </div>
                )}
                <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h4 style={{ color: '#f1f5f9', fontWeight: 600, margin: 0, fontSize: '0.95rem' }}>{item.titulo}</h4>
                    {item.destaque && (
                      <span style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', fontSize: '0.65rem', padding: '2px 6px', borderRadius: 10, fontWeight: 700, marginLeft: 8 }}>
                        Destaque
                      </span>
                    )}
                  </div>
                  <span style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 12, fontWeight: 600, alignSelf: 'flex-start', marginBottom: 8 }}>
                    {item.categoria}
                  </span>
                  <p style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.4, flex: 1, margin: 0 }}>{item.descricao || 'Sem descrição'}</p>
                  
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button onClick={() => handleEdit(item)} style={{ flex: 1, background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(item.id)} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!loading && items.length === 0 && !showForm && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: '#475569' }}>
                Nenhuma imagem na galeria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
