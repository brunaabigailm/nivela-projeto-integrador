const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/areas — lista as áreas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_area, id_empresa, nome FROM area ORDER BY nome');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar áreas.', detalhe: err.message });
  }
});

module.exports = router;
