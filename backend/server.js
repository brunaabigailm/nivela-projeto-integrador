const express = require('express');
const dotenv  = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// ── Rotas ─────────────────────────────────────────────────────────────────────
const usuariosRoutes  = require('./routes/usuarios');
const trilhasRoutes   = require('./routes/trilhas');
const progressoRoutes = require('./routes/progresso');

app.use('/api/usuarios',  usuariosRoutes);
app.use('/api/trilhas',   trilhasRoutes);
app.use('/api/progresso', progressoRoutes);

// ── Rota raiz (health check) ──────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    sistema: 'NIVELA API',
    versao:  '1.0.0',
    status:  'online',
    rotas: [
      'GET  /api/usuarios',
      'GET  /api/usuarios/:id',
      'POST /api/usuarios',
      'PUT  /api/usuarios/:id',
      'DELETE /api/usuarios/:id',
      'GET  /api/trilhas',
      'GET  /api/trilhas/:id',
      'POST /api/trilhas',
      'PUT  /api/trilhas/:id',
      'DELETE /api/trilhas/:id',
      'GET  /api/progresso/trilha/:id_usuario',
      'POST /api/progresso/trilha',
      'PUT  /api/progresso/trilha/:id',
    ],
  });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// ── Inicialização ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor NIVELA rodando em http://localhost:${PORT}`);
});
