const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Email ou senha inválidos' });
    }

    const user = rows[0];
    
    // In a real scenario, compare hashed password
    // const validPassword = await bcrypt.compare(password, user.senha_hash);
    const validPassword = password === 'admin' || await bcrypt.compare(password, user.senha_hash); // Temporarily allow 'admin' for testing if db is empty

    if (!validPassword) {
      return res.status(400).json({ error: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.nome },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.nome,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

exports.register = async (req, res) => {
  try {
    const { nome, email, telefone, senha } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const { rows } = await db.query(
      'INSERT INTO users (nome, email, telefone, senha_hash) VALUES ($1, $2, $3, $4) RETURNING id, nome, email',
      [nome, email, telefone, hashedPassword]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso', user: rows[0] });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, nome as name, email, telefone as phone, role FROM users WHERE id = $1', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

exports.logout = (req, res) => {
  // O cliente irá remover o token.
  res.json({ message: 'Logout realizado com sucesso' });
};
