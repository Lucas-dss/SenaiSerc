const express = require('express');
const router = express.Router();
const responsaveisController = require('../controllers/responsaveisController');

// POST /api/responsaveis
router.post('/', responsaveisController.create);

// GET /api/responsaveis
router.get('/', responsaveisController.findAll);

module.exports = router;
