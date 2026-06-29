const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/avaliacoes/trilha/:id_trilha — avaliação de uma trilha com questões e alternativas
router.get('/trilha/:id_trilha', async (req, res) => {
  try {
    const [avs] = await db.query(
      'SELECT id_avaliacao, id_trilha, titulo, descricao, nota_minima FROM avaliacao WHERE id_trilha = ? LIMIT 1',
      [req.params.id_trilha]
    );
    if (avs.length === 0) {
      return res.status(404).json({ erro: 'Nenhuma avaliação encontrada para esta trilha.' });
    }
    const avaliacao = avs[0];

    const [questoes] = await db.query(
      'SELECT id_questao, enunciado, tipo_questao, pontuacao FROM questao WHERE id_avaliacao = ?',
      [avaliacao.id_avaliacao]
    );

    const questoesComAlternativas = [];
    for (const q of questoes) {
      const [alts] = await db.query(
        'SELECT id_alternativa, texto, is_correta FROM alternativa WHERE id_questao = ?',
        [q.id_questao]
      );
      // só inclui questões com alternativas (a tela de avaliação só suporta múltipla escolha)
      if (alts.length > 0) {
        q.alternativas = alts;
        questoesComAlternativas.push(q);
      }
    }

    res.json({ ...avaliacao, questoes: questoesComAlternativas });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar avaliação.', detalhe: err.message });
  }
});

// POST /api/avaliacoes — cria avaliação completa (com questões e alternativas em transação)
router.post('/', async (req, res) => {
  const { id_trilha, titulo, descricao, nota_minima, questoes } = req.body;
  if (!id_trilha || !titulo) {
    return res.status(400).json({ erro: 'Campos obrigatórios: id_trilha, titulo.' });
  }

  const conexao = await db.getConnection();
  try {
    await conexao.beginTransaction();

    const [r1] = await conexao.query(
      'INSERT INTO avaliacao (id_trilha, titulo, descricao, nota_minima) VALUES (?, ?, ?, ?)',
      [id_trilha, titulo, descricao || null, nota_minima || 7.0]
    );
    const id_avaliacao = r1.insertId;

    if (Array.isArray(questoes)) {
      for (const q of questoes) {
        const [r2] = await conexao.query(
          'INSERT INTO questao (id_avaliacao, enunciado, tipo_questao, pontuacao) VALUES (?, ?, ?, ?)',
          [id_avaliacao, q.enunciado, q.tipo_questao || 'multipla_escolha', q.pontuacao || 1.0]
        );
        const id_questao = r2.insertId;

        if (Array.isArray(q.alternativas)) {
          for (const alt of q.alternativas) {
            await conexao.query(
              'INSERT INTO alternativa (id_questao, texto, is_correta) VALUES (?, ?, ?)',
              [id_questao, alt.texto, alt.is_correta ? 1 : 0]
            );
          }
        }
      }
    }

    await conexao.commit();
    res.status(201).json({ mensagem: 'Avaliação criada.', id_avaliacao });
  } catch (err) {
    await conexao.rollback();
    res.status(500).json({ erro: 'Erro ao criar avaliação.', detalhe: err.message });
  } finally {
    conexao.release();
  }
});

module.exports = router;
