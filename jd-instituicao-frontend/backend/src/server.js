const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const authMiddleware = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares para performance e segurança
app.use(helmet()); // Protege adicionando headers HTTP
app.use(cors()); // Permite cross-origin requests
app.use(express.json()); // Parseia application/json
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static('uploads'));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

// Rota raiz para testar se a API está no ar
app.get('/', (req, res) => {
  res.send('API da JD Tecnologia está rodando.');
});

// Middleware para capturar rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Tratamento global de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
