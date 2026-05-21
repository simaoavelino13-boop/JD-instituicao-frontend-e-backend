const db = require('../config/db');

// DASHBOARD
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      usersCount,
      messagesCount,
      blogCount,
      appsCount,
      subsCount,
      recentMessages,
      recentApplications
    ] = await Promise.all([
      db.query('SELECT COUNT(*) FROM users'),
      db.query('SELECT COUNT(*) FROM contact_messages'),
      db.query('SELECT COUNT(*) FROM blog_posts'),
      db.query('SELECT COUNT(*) FROM job_applications'),
      db.query('SELECT COUNT(*) FROM newsletter_subscribers'),
      db.query('SELECT id, nome, assunto, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5'),
      db.query('SELECT id, nome, vaga_id, status, created_at FROM job_applications ORDER BY created_at DESC LIMIT 5')
    ]);

    res.json({
      stats: {
        users: parseInt(usersCount.rows[0].count),
        messages: parseInt(messagesCount.rows[0].count),
        blog: parseInt(blogCount.rows[0].count),
        applications: parseInt(appsCount.rows[0].count),
        subscribers: parseInt(subsCount.rows[0].count)
      },
      recentMessages: recentMessages.rows,
      recentApplications: recentApplications.rows
    });
  } catch (error) {
    console.error('Erro getDashboardStats:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// USERS
exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, nome as name, email, telefone as phone, role, ativo as status, created_at FROM users ORDER BY created_at DESC');
    res.json({ data: rows });
  } catch (error) {
    console.error('Erro getUsers:', error);
    res.status(500).json({ error: 'Erro ao obter utilizadores' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await db.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);
    res.json({ message: 'Role atualizado' });
  } catch (error) {
    console.error('Erro updateUserRole:', error);
    res.status(500).json({ error: 'Erro ao atualizar role' });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('UPDATE users SET ativo = NOT ativo WHERE id = $1', [id]);
    res.json({ message: 'Status alterado' });
  } catch (error) {
    console.error('Erro toggleUserStatus:', error);
    res.status(500).json({ error: 'Erro ao alterar status' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Utilizador eliminado' });
  } catch (error) {
    console.error('Erro deleteUser:', error);
    res.status(500).json({ error: 'Erro ao eliminar utilizador' });
  }
};

// MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json({ data: rows });
  } catch (error) {
    console.error('Erro getMessages:', error);
    res.status(500).json({ error: 'Erro ao obter mensagens' });
  }
};

exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query('UPDATE contact_messages SET status = $1 WHERE id = $2', [status, id]);
    res.json({ message: 'Status atualizado' });
  } catch (error) {
    console.error('Erro updateMessageStatus:', error);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM contact_messages WHERE id = $1', [id]);
    res.json({ message: 'Mensagem eliminada' });
  } catch (error) {
    console.error('Erro deleteMessage:', error);
    res.status(500).json({ error: 'Erro ao eliminar mensagem' });
  }
};

// BLOG POSTS
exports.getBlogPosts = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json({ data: rows });
  } catch (error) {
    console.error('Erro getBlogPosts:', error);
    res.status(500).json({ error: 'Erro ao obter artigos do blog' });
  }
};

// RECRUITMENT (JOBS & APPLICATIONS)
exports.getJobs = async (req, res) => {
  // As the schema doesn't have a jobs table yet, we return an empty array for now
  res.json({ data: [] });
};

exports.getApplications = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM job_applications ORDER BY created_at DESC');
    res.json({ data: rows });
  } catch (error) {
    console.error('Erro getApplications:', error);
    res.status(500).json({ error: 'Erro ao obter candidaturas' });
  }
};

// PORTFOLIO & TESTIMONIALS
exports.getPortfolio = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM gallery_images WHERE destaque = true ORDER BY created_at DESC');
    res.json({ data: rows });
  } catch (error) {
    console.error('Erro getPortfolio:', error);
    res.status(500).json({ error: 'Erro ao obter portfólio' });
  }
};

exports.getTestimonials = async (req, res) => {
  res.json({ data: [] });
};

// GALLERY
exports.getGallery = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM gallery_images ORDER BY created_at DESC');
    res.json({ data: rows });
  } catch (error) {
    console.error('Erro getGallery:', error);
    res.status(500).json({ error: 'Erro ao obter galeria' });
  }
};

exports.createGalleryImage = async (req, res) => {
  try {
    const { titulo, descricao, imagem_url, categoria, destaque } = req.body;
    await db.query(
      'INSERT INTO gallery_images (titulo, descricao, imagem_url, categoria, destaque) VALUES ($1, $2, $3, $4, $5)',
      [titulo, descricao, imagem_url, categoria, destaque || false]
    );
    res.json({ message: 'Imagem adicionada à galeria' });
  } catch (error) {
    console.error('Erro createGalleryImage:', error);
    res.status(500).json({ error: 'Erro ao criar imagem' });
  }
};

exports.updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, imagem_url, categoria, destaque } = req.body;
    await db.query(
      'UPDATE gallery_images SET titulo = $1, descricao = $2, imagem_url = $3, categoria = $4, destaque = $5 WHERE id = $6',
      [titulo, descricao, imagem_url, categoria, destaque || false, id]
    );
    res.json({ message: 'Imagem atualizada' });
  } catch (error) {
    console.error('Erro updateGalleryImage:', error);
    res.status(500).json({ error: 'Erro ao atualizar imagem' });
  }
};

exports.deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM gallery_images WHERE id = $1', [id]);
    res.json({ message: 'Imagem eliminada' });
  } catch (error) {
    console.error('Erro deleteGalleryImage:', error);
    res.status(500).json({ error: 'Erro ao eliminar imagem' });
  }
};

// SUBSCRIBERS
exports.getSubscribers = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
    res.json({ data: rows });
  } catch (error) {
    console.error('Erro getSubscribers:', error);
    res.status(500).json({ error: 'Erro ao obter subscritores' });
  }
};
