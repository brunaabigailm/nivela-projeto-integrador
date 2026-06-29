const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/areas — lista as áreas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_area, id_empresa, nome, descricao FROM area ORDER BY nome');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar áreas.', detalhe: err.message });
  }
});

// POST /api/areas — cria nova área
router.post('/', async (req, res) => {
  const { nome, descricao, id_empresa } = req.body;
  if (!nome || !id_empresa) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, id_empresa.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO area (nome, descricao, id_empresa) VALUES (?, ?, ?)',
      [nome, descricao || null, id_empresa]
    );
    res.status(201).json({ mensagem: 'Área criada.', id_area: result.insertId });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar área.', detalhe: err.message });
  }
});

module.exports = router;
