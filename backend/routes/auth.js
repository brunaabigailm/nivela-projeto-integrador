const express = require('express');
const router  = express.Router();
const db      = require('../db');
const bcrypt  = require('bcryptjs');

// POST /api/login — autentica um usuário pelo e-mail e senha
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id_usuario, nome, email, senha, tipo_usuario, status, id_empresa, id_area, id_cargo FROM usuario WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
    }

    const usuario = rows[0];

    if (usuario.status !== 'ativo') {
      return res.status(403).json({ erro: 'Usuário inativo.' });
    }

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
    }

    delete usuario.senha;
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login.', detalhe: err.message });
  }
});

module.exports = router;
