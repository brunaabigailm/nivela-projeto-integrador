const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/cargos — lista os cargos (com nome da área)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id_cargo, c.id_area, c.nome,
             a.nome AS nome_area
      FROM cargo c
      LEFT JOIN area a ON c.id_area = a.id_area
      ORDER BY c.nome
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar cargos.', detalhe: err.message });
  }
});

module.exports = router;
