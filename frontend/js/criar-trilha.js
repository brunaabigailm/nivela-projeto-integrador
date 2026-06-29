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
  document.getElementById('btn-toggle-avaliacao').addEventListener('click', toggleAvaliacao);
  document.getElementById('btn-adicionar-questao').addEventListener('click', adicionarQuestao);
  document.getElementById('form-trilha').addEventListener('submit', enviarTrilha);
  carregarCargos();
  adicionarModulo();
});

function toggleAvaliacao() {
  const conteudo = document.getElementById('avaliacao-conteudo');
  const btn = document.getElementById('btn-toggle-avaliacao');
  if (conteudo.hidden) {
    conteudo.hidden = false;
    btn.textContent = '× Remover Avaliação';
    if (document.querySelectorAll('.questao-item').length === 0) {
      adicionarQuestao();
    }
  } else {
    conteudo.hidden = true;
    btn.textContent = '+ Adicionar Avaliação';
  }
}

function adicionarQuestao() {
  const numero = document.querySelectorAll('.questao-item').length + 1;
  const div = document.createElement('div');
  div.className = 'questao-item';
  div.innerHTML = `
    <div class="questao-cabecalho">
      <strong>Questão ${numero}</strong>
      <button type="button" class="modulo-remover questao-remover" aria-label="Remover questão">✕</button>
    </div>
    <div class="form-field">
      <label class="form-label">Enunciado *</label>
      <input class="input questao-enunciado" type="text" placeholder="Digite a pergunta" required>
    </div>
    <div class="form-field">
      <label class="form-label">Alternativas (marque a correta)</label>
      ${[0, 1, 2, 3].map(i => `
        <div class="alternativa-input">
          <input type="radio" name="correta-${numero}-${Date.now()}" value="${i}" class="alt-correta" ${i === 0 ? 'checked' : ''}>
          <input class="input alt-texto" type="text" placeholder="Alternativa ${i + 1}" required>
        </div>
      `).join('')}
    </div>
  `;

  div.querySelector('.questao-remover').addEventListener('click', () => {
    div.remove();
    renumerarQuestoes();
  });

  document.getElementById('lista-questoes').appendChild(div);
}

function renumerarQuestoes() {
  document.querySelectorAll('.questao-item').forEach((item, i) => {
    item.querySelector('.questao-cabecalho strong').textContent = `Questão ${i + 1}`;
  });
}

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
      <div class="form-field modulo-url-field">
        <label class="form-label">URL do Material (opcional)</label>
        <input class="input modulo-url" type="url"
               placeholder="https://exemplo.com/material">
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
    titulo:       item.querySelector('.modulo-titulo').value.trim(),
    tipo:         item.querySelector('.modulo-tipo').value,
    duracao:      item.querySelector('.modulo-duracao').value.trim(),
    url_material: item.querySelector('.modulo-url').value.trim() || null,
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
    const resultado = await api('POST', '/api/trilhas', dados);

    const conteudoAvaliacao = document.getElementById('avaliacao-conteudo');
    if (!conteudoAvaliacao.hidden) {
      const tituloAval = document.getElementById('aval-titulo').value.trim();
      const notaMin   = Number(document.getElementById('aval-nota-minima').value) || 7;
      const questoesEls = document.querySelectorAll('.questao-item');

      if (tituloAval && questoesEls.length > 0) {
        const questoes = Array.from(questoesEls).map(qEl => {
          const radios = qEl.querySelectorAll('.alt-correta');
          const textos = qEl.querySelectorAll('.alt-texto');
          const corretaIndex = Array.from(radios).findIndex(r => r.checked);
          return {
            enunciado: qEl.querySelector('.questao-enunciado').value.trim(),
            alternativas: Array.from(textos).map((t, i) => ({
              texto: t.value.trim(),
              is_correta: i === corretaIndex,
            })),
          };
        });

        await api('POST', '/api/avaliacoes', {
          id_trilha:    resultado.id_trilha,
          titulo:       tituloAval,
          nota_minima:  notaMin,
          questoes,
        });
      }
    }

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
