const db = require('../config/db');

// CONTACT
exports.sendMessage = async (req, res) => {
  try {
    const { nome, email, telefone, assunto, mensagem } = req.body;
    await db.query(
      'INSERT INTO contact_messages (nome, email, telefone, assunto, mensagem) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, telefone, assunto, mensagem]
    );
    res.status(201).json({ message: 'Mensagem enviada com sucesso' });
  } catch (error) {
    console.error('sendMessage error:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
};

// BLOG — returns plain array because the frontend does setVagas(response.data)
exports.getPosts = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY data_publicacao DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter artigos' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const { rows } = await db.query("SELECT * FROM blog_posts WHERE slug = $1 AND status = 'published'", [slug]);
    if (rows.length === 0) return res.status(404).json({ error: 'Artigo não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter artigo' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM blog_categories ORDER BY nome');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter categorias' });
  }
};

// RECRUITMENT — returns plain array because the frontend does setVagas(response.data)
exports.getJobs = async (req, res) => {
  res.json([]);
};

exports.applyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, linkedin_url, portfolio_url, mensagem } = req.body;
    const curriculo_url = req.file ? `/uploads/${req.file.filename}` : '';

    if (!curriculo_url) {
      return res.status(400).json({ error: 'O currículo é obrigatório' });
    }

    await db.query(
      'INSERT INTO job_applications (vaga_id, nome, email, telefone, linkedin_url, portfolio_url, curriculo_url, mensagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [id, nome, email, telefone, linkedin_url, portfolio_url, curriculo_url, mensagem]
    );
    res.status(201).json({ message: 'Candidatura enviada com sucesso' });
  } catch (error) {
    console.error('applyJob error:', error);
    res.status(500).json({ error: 'Erro ao submeter candidatura' });
  }
};

// PORTFOLIO — returns plain array because the frontend does setProjetos(response.data)
exports.getPortfolio = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM gallery_images WHERE destaque = true ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter portfólio' });
  }
};

// NEWSLETTER
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    await db.query('INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET ativo = true', [email]);
    res.status(201).json({ message: 'Subscrição efetuada com sucesso' });
  } catch (error) {
    console.error('subscribeNewsletter error:', error);
    res.status(500).json({ error: 'Erro ao subscrever newsletter' });
  }
};
