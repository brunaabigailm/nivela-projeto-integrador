const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/progresso/trilha/:id_usuario — progresso de todas as trilhas de um usuário
router.get('/trilha/:id_usuario', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT pt.id_progresso_trilha, pt.id_trilha,
             pt.percentual_conclusao, pt.status,
             pt.data_inicio, pt.data_conclusao,
             t.titulo AS trilha
      FROM progresso_trilha pt
      JOIN trilha t ON pt.id_trilha = t.id_trilha
      WHERE pt.id_usuario = ?
    `, [req.params.id_usuario]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar progresso.', detalhe: err.message });
  }
});

// POST /api/progresso/trilha — registra início de uma trilha
router.post('/trilha', async (req, res) => {
  const { id_usuario, id_trilha } = req.body;

  if (!id_usuario || !id_trilha) {
    return res.status(400).json({ erro: 'Campos obrigatórios: id_usuario, id_trilha.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO progresso_trilha (id_usuario, id_trilha) VALUES (?, ?)',
      [id_usuario, id_trilha]
    );
    res.status(201).json({ mensagem: 'Progresso iniciado.', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Usuário já está nessa trilha.' });
    }
    res.status(500).json({ erro: 'Erro ao registrar progresso.', detalhe: err.message });
  }
});

// PUT /api/progresso/trilha/:id — atualiza percentual de conclusão
router.put('/trilha/:id', async (req, res) => {
  const { percentual_conclusao, status } = req.body;
  try {
    const conclusao = status === 'concluido' ? new Date() : null;
    const [result] = await db.query(
      'UPDATE progresso_trilha SET percentual_conclusao = COALESCE(?, percentual_conclusao), status = COALESCE(?, status), data_conclusao = COALESCE(?, data_conclusao) WHERE id_progresso_trilha = ?',
      [percentual_conclusao, status, conclusao, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Registro não encontrado.' });
    res.json({ mensagem: 'Progresso atualizado.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar progresso.', detalhe: err.message });
  }
});

module.exports = router;
