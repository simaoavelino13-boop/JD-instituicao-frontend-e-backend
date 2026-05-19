import React, { useState } from 'react';
import { blogService } from '../../services/api';

const AdminBlog = ({ posts, loading, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ titulo: '', categoria: '', conteudo: '', status: 'draft' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await blogService.updatePost(editingId, formData);
      } else {
        await blogService.createPost(formData);
      }
      setFormData({ titulo: '', categoria: '', conteudo: '', status: 'draft' });
      setShowForm(false);
      setEditingId(null);
      onRefresh();
    } catch (error) {
      alert('Erro ao salvar post');
    }
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Eliminar post?')) {
      try {
        await blogService.deletePost(id);
        onRefresh();
      } catch (error) {
        alert('Erro ao eliminar post');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ titulo: '', categoria: '', conteudo: '', status: 'draft' }); }}
        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
      >
        {showForm ? 'Cancelar' : '+ Novo Post'}
      </button>

      {showForm && (
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="text"
              placeholder="Título"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              required
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
            />
            <input
              type="text"
              placeholder="Categoria"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              required
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
            />
            <textarea
              placeholder="Conteúdo"
              value={formData.conteudo}
              onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
              required
              rows="6"
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1', fontFamily: 'inherit' }}
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
            <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
              {editingId ? 'Atualizar' : 'Criar'} Post
            </button>
          </form>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Título</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Categoria</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Estado</th>
              <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{post.titulo}</td>
                <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{post.categoria}</td>
                <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                  <span style={{ background: post.status === 'published' ? '#10b98122' : '#f59e0b22', color: post.status === 'published' ? '#10b981' : '#f59e0b', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem' }}>
                    {post.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right', display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                  <button onClick={() => handleEdit(post)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', fontSize: 18 }}>
                    <i className="ri-edit-line" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 18 }}>
                    <i className="ri-delete-bin-line" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlog;
