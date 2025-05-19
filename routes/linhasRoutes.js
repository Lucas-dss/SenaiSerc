const express = require('express');
const router = express.Router();
const linhasController = require('../controllers/linhasController');

// Rotas de autenticação
router.post('/register', linhasController.register);

module.exports = router;
