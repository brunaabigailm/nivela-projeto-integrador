/* NIVELA — lógica de Criar Trilha */

const usuarioLogado = JSON.parse(localStorage.getItem('nivela_usuario') || 'null');

if (!usuarioLogado || usuarioLogado.tipo_usuario === 'colaborador') {
  window.location.href = 'index.html';
}

let contadorModulos = 0;

document.addEventListener('DOMContentLoaded', () => {
  preencherTopbar();
  document.getElementById('btn-sair').addEventListener('click', sair);
  document.getElementById('btn-adicionar-modulo').addEventListener('click', adicionarModulo);
  document.getElementById('form-trilha').addEventListener('submit', enviarTrilha);
  carregarCargos();
  adicionarModulo();
});

function preencherTopbar() {
  document.getElementById('usuario-nome').textContent  = usuarioLogado.nome;
  document.getElementById('usuario-email').textContent = usuarioLogado.email;
  document.getElementById('usuario-avatar').textContent =
    (usuarioLogado.nome || '?').trim().charAt(0).toUpperCase();
}

function sair() {
  localStorage.removeItem('nivela_usuario');
  window.location.href = 'index.html';
}

async function carregarCargos() {
  try {
    const cargos = await api('GET', '/api/cargos');
    const select = document.getElementById('cargo');
    cargos.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id_cargo;
      opt.textContent = c.nome;
      select.appendChild(opt);
    });
  } catch (erro) {
    mostrarErro('Erro ao carregar cargos: ' + erro.message);
  }
}

function adicionarModulo() {
  contadorModulos += 1;
  const numero = document.querySelectorAll('.modulo-item').length + 1;

  const div = document.createElement('div');
  div.className = 'modulo-item';
  div.dataset.modulo = contadorModulos;
  div.innerHTML = `
    <span class="modulo-numero">${numero}</span>
    <div class="modulo-campos">
      <div class="form-field">
        <label class="form-label">Título do Módulo *</label>
        <input class="input modulo-titulo" type="text"
               placeholder="Ex: Introdução à Cultura da Empresa" required>
      </div>
      <div class="form-field">
        <label class="form-label">Tipo *</label>
        <select class="input modulo-tipo" required>
          <option value="Documento">Documento</option>
          <option value="Vídeo">Vídeo</option>
          <option value="Texto">Texto</option>
          <option value="PDF">PDF</option>
          <option value="Quiz">Quiz</option>
        </select>
      </div>
      <div class="form-field">
        <label class="form-label">Duração *</label>
        <input class="input modulo-duracao" type="text"
               placeholder="Ex: 30 min" required>
      </div>
    </div>
    <button type="button" class="modulo-remover" aria-label="Remover módulo">✕</button>
  `;

  div.querySelector('.modulo-remover').addEventListener('click', () => {
    div.remove();
    renumerarModulos();
  });

  document.getElementById('lista-modulos').appendChild(div);
}

function renumerarModulos() {
  document.querySelectorAll('.modulo-item').forEach((item, i) => {
    item.querySelector('.modulo-numero').textContent = i + 1;
  });
}

async function enviarTrilha(evento) {
  evento.preventDefault();
  esconderMensagens();

  const itens = document.querySelectorAll('.modulo-item');
  if (itens.length === 0) {
    mostrarErro('Adicione ao menos um módulo à trilha.');
    return;
  }

  const modulos = Array.from(itens).map(item => ({
    titulo:  item.querySelector('.modulo-titulo').value.trim(),
    tipo:    item.querySelector('.modulo-tipo').value,
    duracao: item.querySelector('.modulo-duracao').value.trim(),
  }));

  const idCargo = document.getElementById('cargo').value;

  const dados = {
    titulo:     document.getElementById('titulo').value.trim(),
    descricao:  document.getElementById('descricao').value.trim(),
    id_empresa: usuarioLogado.id_empresa,
    id_gestor:  usuarioLogado.id_usuario,
    id_cargo:   idCargo ? Number(idCargo) : null,
    modulos,
  };

  try {
    await api('POST', '/api/trilhas', dados);
    mostrarSucesso('Trilha criada com sucesso! Redirecionando...');
    setTimeout(() => { window.location.href = 'dashboard-gestor.html'; }, 1500);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

function mostrarErro(texto) {
  const el = document.getElementById('trilha-erro');
  el.textContent = texto;
  el.hidden = false;
}

function mostrarSucesso(texto) {
  const el = document.getElementById('trilha-sucesso');
  el.textContent = texto;
  el.hidden = false;
}

function esconderMensagens() {
  document.getElementById('trilha-erro').hidden = true;
  document.getElementById('trilha-sucesso').hidden = true;
}
