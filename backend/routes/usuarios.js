const express = require('express');
const router  = express.Router();
const db      = require('../db');
const bcrypt  = require('bcryptjs');

// GET /api/usuarios — lista todos os usuários (com nome do cargo)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.id_usuario, u.nome, u.email, u.tipo_usuario, u.status,
             u.id_empresa, u.id_area, u.id_cargo,
             c.nome AS nome_cargo
      FROM usuario u
      LEFT JOIN cargo c ON u.id_cargo = c.id_cargo
      ORDER BY u.id_usuario
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários.', detalhe: err.message });
  }
});

// GET /api/usuarios/:id — busca usuário por ID (com nome do cargo)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.id_usuario, u.nome, u.email, u.tipo_usuario, u.status,
             u.id_empresa, u.id_area, u.id_cargo,
             c.nome AS nome_cargo
      FROM usuario u
      LEFT JOIN cargo c ON u.id_cargo = c.id_cargo
      WHERE u.id_usuario = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário.', detalhe: err.message });
  }
});

// POST /api/usuarios — cria novo usuário
router.post('/', async (req, res) => {
  const { nome, email, senha, tipo_usuario, id_empresa, id_area, id_cargo } = req.body;

  // Validação básica
  if (!nome || !email || !senha || !tipo_usuario || !id_empresa) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, email, senha, tipo_usuario, id_empresa.' });
  }

  const tiposValidos = ['administrador', 'gestor', 'colaborador'];
  if (!tiposValidos.includes(tipo_usuario)) {
    return res.status(400).json({ erro: `tipo_usuario deve ser: ${tiposValidos.join(', ')}.` });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const [result] = await db.query(
      'INSERT INTO usuario (nome, email, senha, tipo_usuario, id_empresa, id_area, id_cargo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, email, senhaHash, tipo_usuario, id_empresa, id_area || null, id_cargo || null]
    );
    res.status(201).json({ mensagem: 'Usuário criado com sucesso.', id_usuario: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'E-mail já cadastrado.' });
    }
    res.status(500).json({ erro: 'Erro ao criar usuário.', detalhe: err.message });
  }
});

// PUT /api/usuarios/:id — atualiza usuário
router.put('/:id', async (req, res) => {
  const { nome, email, tipo_usuario, status, id_area, id_cargo } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE usuario SET nome = COALESCE(?, nome), email = COALESCE(?, email), tipo_usuario = COALESCE(?, tipo_usuario), status = COALESCE(?, status), id_area = COALESCE(?, id_area), id_cargo = COALESCE(?, id_cargo) WHERE id_usuario = ?',
      [nome, email, tipo_usuario, status, id_area, id_cargo, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json({ mensagem: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário.', detalhe: err.message });
  }
});

// DELETE /api/usuarios/:id — remove usuário
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM usuario WHERE id_usuario = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json({ mensagem: 'Usuário removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover usuário.', detalhe: err.message });
  }
});

module.exports = router;
