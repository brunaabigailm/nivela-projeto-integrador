const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
dotenv.config();

const app = express();
// CORS aberto: ambiente acadêmico. Em produção, restringir com { origin: 'https://...' }.
app.use(cors());
app.use(express.json());

// ── Rotas ─────────────────────────────────────────────────────────────────────
const authRoutes       = require('./routes/auth');
const usuariosRoutes   = require('./routes/usuarios');
const trilhasRoutes    = require('./routes/trilhas');
const progressoRoutes  = require('./routes/progresso');
const areasRoutes      = require('./routes/areas');
const cargosRoutes     = require('./routes/cargos');
const conteudosRoutes  = require('./routes/conteudos');
const avaliacoesRoutes = require('./routes/avaliacoes');

app.use('/api',            authRoutes);
app.use('/api/usuarios',   usuariosRoutes);
app.use('/api/trilhas',    trilhasRoutes);
app.use('/api/progresso',  progressoRoutes);
app.use('/api/areas',      areasRoutes);
app.use('/api/cargos',     cargosRoutes);
app.use('/api/conteudos',  conteudosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);

// ── Rota raiz (health check) ──────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    sistema: 'NIVELA API',
    versao:  '1.0.0',
    status:  'online',
    rotas: [
      'POST /api/login',
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
      'GET  /api/areas',
      'POST /api/areas',
      'GET  /api/cargos',
      'POST /api/cargos',
      'GET  /api/conteudos',
      'POST /api/conteudos',
      'GET  /api/avaliacoes/trilha/:id_trilha',
      'POST /api/avaliacoes',
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
