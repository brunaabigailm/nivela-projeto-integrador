const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/conteudos?id_modulo=X — lista conteúdos de um módulo
router.get('/', async (req, res) => {
  const { id_modulo } = req.query;
  try {
    let rows;
    if (id_modulo) {
      [rows] = await db.query(
        'SELECT * FROM conteudo WHERE id_modulo = ? ORDER BY ordem',
        [id_modulo]
      );
    } else {
      [rows] = await db.query('SELECT * FROM conteudo ORDER BY id_modulo, ordem');
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar conteúdos.', detalhe: err.message });
  }
});

// POST /api/conteudos — cria conteúdo dentro de um módulo
router.post('/', async (req, res) => {
  const { id_modulo, titulo, descricao, tipo_conteudo, url_material, ordem } = req.body;
  if (!id_modulo || !titulo) {
    return res.status(400).json({ erro: 'Campos obrigatórios: id_modulo, titulo.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO conteudo (id_modulo, titulo, descricao, tipo_conteudo, url_material, ordem) VALUES (?, ?, ?, ?, ?, ?)',
      [id_modulo, titulo, descricao || null, tipo_conteudo || null, url_material || null, ordem || 1]
    );
    res.status(201).json({ mensagem: 'Conteúdo criado.', id_conteudo: result.insertId });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar conteúdo.', detalhe: err.message });
  }
});

module.exports = router;
