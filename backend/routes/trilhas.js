const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/trilhas — lista todas as trilhas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.id_trilha, t.titulo, t.descricao, t.status, t.data_criacao,
             u.nome AS gestor, c.nome AS cargo
      FROM trilha t
      LEFT JOIN usuario u ON t.id_gestor = u.id_usuario
      LEFT JOIN cargo   c ON t.id_cargo  = c.id_cargo
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar trilhas.', detalhe: err.message });
  }
});

// GET /api/trilhas/:id — busca trilha com seus módulos
router.get('/:id', async (req, res) => {
  try {
    const [trilha] = await db.query(
      'SELECT * FROM trilha WHERE id_trilha = ?', [req.params.id]
    );
    if (trilha.length === 0) return res.status(404).json({ erro: 'Trilha não encontrada.' });

    const [modulos] = await db.query(
      'SELECT * FROM modulo WHERE id_trilha = ? ORDER BY ordem', [req.params.id]
    );

    res.json({ ...trilha[0], modulos });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar trilha.', detalhe: err.message });
  }
});

// POST /api/trilhas — cria nova trilha (com módulos opcionais)
router.post('/', async (req, res) => {
  const { titulo, descricao, id_empresa, id_gestor, id_cargo, modulos } = req.body;

  if (!titulo || !id_empresa || !id_gestor) {
    return res.status(400).json({ erro: 'Campos obrigatórios: titulo, id_empresa, id_gestor.' });
  }

  const conexao = await db.getConnection();
  try {
    await conexao.beginTransaction();

    const [result] = await conexao.query(
      'INSERT INTO trilha (titulo, descricao, id_empresa, id_gestor, id_cargo) VALUES (?, ?, ?, ?, ?)',
      [titulo, descricao || null, id_empresa, id_gestor, id_cargo || null]
    );
    const id_trilha = result.insertId;

    if (Array.isArray(modulos) && modulos.length > 0) {
      for (let i = 0; i < modulos.length; i++) {
        const m = modulos[i];
        const [rm] = await conexao.query(
          'INSERT INTO modulo (id_trilha, titulo, descricao, tipo, duracao, ordem) VALUES (?, ?, ?, ?, ?, ?)',
          [id_trilha, m.titulo, m.descricao || null, m.tipo || null, m.duracao || null, i + 1]
        );
        if (m.url_material) {
          await conexao.query(
            'INSERT INTO conteudo (id_modulo, titulo, tipo_conteudo, url_material, ordem) VALUES (?, ?, ?, ?, ?)',
            [rm.insertId, m.titulo, m.tipo || null, m.url_material, 1]
          );
        }
      }
    }

    await conexao.commit();
    res.status(201).json({ mensagem: 'Trilha criada com sucesso.', id_trilha });
  } catch (err) {
    await conexao.rollback();
    res.status(500).json({ erro: 'Erro ao criar trilha.', detalhe: err.message });
  } finally {
    conexao.release();
  }
});

// PUT /api/trilhas/:id — atualiza trilha
router.put('/:id', async (req, res) => {
  const { titulo, descricao, status } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE trilha SET titulo = COALESCE(?, titulo), descricao = COALESCE(?, descricao), status = COALESCE(?, status) WHERE id_trilha = ?',
      [titulo, descricao, status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Trilha não encontrada.' });
    res.json({ mensagem: 'Trilha atualizada com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar trilha.', detalhe: err.message });
  }
});

// DELETE /api/trilhas/:id — remove trilha
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM trilha WHERE id_trilha = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Trilha não encontrada.' });
    res.json({ mensagem: 'Trilha removida com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover trilha.', detalhe: err.message });
  }
});

module.exports = router;
