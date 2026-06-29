const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/cargos — lista os cargos (com nome da área)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id_cargo, c.id_area, c.nome, c.descricao,
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

// POST /api/cargos — cria novo cargo
router.post('/', async (req, res) => {
  const { nome, descricao, id_area } = req.body;
  if (!nome || !id_area) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, id_area.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO cargo (nome, descricao, id_area) VALUES (?, ?, ?)',
      [nome, descricao || null, id_area]
    );
    res.status(201).json({ mensagem: 'Cargo criado.', id_cargo: result.insertId });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar cargo.', detalhe: err.message });
  }
});

module.exports = router;
