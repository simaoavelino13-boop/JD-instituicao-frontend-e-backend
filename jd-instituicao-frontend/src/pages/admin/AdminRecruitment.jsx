import React, { useState } from 'react';
import { recruitmentService } from '../../services/api';

const AdminRecruitment = ({ applications, jobs, loading, onRefresh }) => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobFormData, setJobFormData] = useState({ titulo: '', descricao: '', salario: '', localizacao: '', tipo: 'fulltime' });

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJobId) {
        // await recruitmentService.updateJob(editingJobId, jobFormData);
      } else {
        // await recruitmentService.createJob(jobFormData);
      }
      setJobFormData({ titulo: '', descricao: '', salario: '', localizacao: '', tipo: 'fulltime' });
      setShowJobForm(false);
      setEditingJobId(null);
      onRefresh();
    } catch (error) {
      alert('Erro ao salvar vaga');
    }
  };

  const handleAppStatusUpdate = async (appId, newStatus) => {
    try {
      await recruitmentService.updateApplicationStatus(appId, newStatus);
      onRefresh();
    } catch (error) {
      alert('Erro ao atualizar candidatura');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Vagas de Emprego */}
      <div>
        <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', marginBottom: 16 }}>Vagas Abertas</h3>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
          <button
            onClick={() => { setShowJobForm(!showJobForm); setEditingJobId(null); }}
            style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, marginBottom: 16 }}
          >
            {showJobForm ? 'Cancelar' : '+ Nova Vaga'}
          </button>

          {showJobForm && (
            <form onSubmit={handleJobSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
              <input
                type="text"
                placeholder="Título da Vaga"
                value={jobFormData.titulo}
                onChange={(e) => setJobFormData({ ...jobFormData, titulo: e.target.value })}
                required
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              />
              <textarea
                placeholder="Descrição"
                value={jobFormData.descricao}
                onChange={(e) => setJobFormData({ ...jobFormData, descricao: e.target.value })}
                required
                rows="4"
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input
                  type="text"
                  placeholder="Salário"
                  value={jobFormData.salario}
                  onChange={(e) => setJobFormData({ ...jobFormData, salario: e.target.value })}
                  style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
                />
                <input
                  type="text"
                  placeholder="Localização"
                  value={jobFormData.localizacao}
                  onChange={(e) => setJobFormData({ ...jobFormData, localizacao: e.target.value })}
                  style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
                />
              </div>
              <select
                value={jobFormData.tipo}
                onChange={(e) => setJobFormData({ ...jobFormData, tipo: e.target.value })}
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, color: '#cbd5e1' }}
              >
                <option value="fulltime">Tempo Integral</option>
                <option value="parttime">Tempo Parcial</option>
                <option value="freelance">Freelance</option>
                <option value="contrato">Contrato</option>
              </select>
              <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                {editingJobId ? 'Atualizar' : 'Criar'} Vaga
              </button>
            </form>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Título</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Localização</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Tipo</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{job.titulo}</td>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{job.localizacao}</td>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{job.tipo}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', fontSize: 18 }}>
                        <i className="ri-edit-line" />
                      </button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 18 }}>
                        <i className="ri-delete-bin-line" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Candidaturas */}
      <div>
        <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', marginBottom: 16 }}>Candidaturas ({applications.length})</h3>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Nome</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Vaga</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Estado</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{app.nome}</td>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{app.email}</td>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{app.vaga_titulo}</td>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                      <select
                        value={app.status}
                        onChange={(e) => handleAppStatusUpdate(app.id, e.target.value)}
                        style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', color: '#cbd5e1', fontSize: '0.8rem' }}
                      >
                        <option value="nova">Nova</option>
                        <option value="em_analise">Em análise</option>
                        <option value="aprovada">Aprovada</option>
                        <option value="rejeitada">Rejeitada</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', fontSize: 18 }}>
                        <i className="ri-eye-line" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRecruitment;
