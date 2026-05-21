const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const multer = require('multer');
const path = require('path');

// Configuração do multer para upload de currículos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Contacto
router.post('/contact', publicController.sendMessage);

// Blog
router.get('/blog/posts', publicController.getPosts);
router.get('/blog/posts/:slug', publicController.getPost);
router.get('/blog/categories', publicController.getCategories);

// Recrutamento
router.get('/jobs', publicController.getJobs);
router.post('/jobs/:id/apply', upload.single('curriculo'), publicController.applyJob);

// Portfólio
router.get('/portfolio', publicController.getPortfolio);

// Newsletter
router.post('/newsletter/subscribe', publicController.subscribeNewsletter);

module.exports = router;
