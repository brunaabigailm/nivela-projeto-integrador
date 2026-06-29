/* NIVELA — lógica do Cadastro de Colaborador */

const usuarioLogado = JSON.parse(localStorage.getItem('nivela_usuario') || 'null');

if (!usuarioLogado || usuarioLogado.tipo_usuario === 'colaborador') {
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  preencherTopbar();
  document.getElementById('btn-sair').addEventListener('click', sair);
  document.getElementById('form-cadastro').addEventListener('submit', enviarCadastro);
  carregarOpcoes();
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

async function carregarOpcoes() {
  try {
    const [areas, cargos] = await Promise.all([
      api('GET', '/api/areas'),
      api('GET', '/api/cargos'),
    ]);

    const selectArea = document.getElementById('area');
    areas.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.id_area;
      opt.textContent = a.nome;
      selectArea.appendChild(opt);
    });

    const selectCargo = document.getElementById('cargo');
    cargos.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id_cargo;
      opt.textContent = c.nome;
      opt.dataset.idArea = c.id_area;
      selectCargo.appendChild(opt);
    });

    selectCargo.addEventListener('change', () => {
      const opt = selectCargo.options[selectCargo.selectedIndex];
      if (opt && opt.dataset.idArea) {
        selectArea.value = opt.dataset.idArea;
      }
    });
  } catch (erro) {
    mostrarErro('Erro ao carregar opções: ' + erro.message);
  }
}

async function enviarCadastro(evento) {
  evento.preventDefault();
  esconderMensagens();

  const dados = {
    nome:         document.getElementById('nome').value.trim(),
    email:        document.getElementById('email').value.trim(),
    senha:        document.getElementById('senha').value,
    tipo_usuario: document.getElementById('tipo_usuario').value,
    id_empresa:   usuarioLogado.id_empresa,
    id_area:      Number(document.getElementById('area').value) || null,
    id_cargo:     Number(document.getElementById('cargo').value) || null,
  };

  try {
    await api('POST', '/api/usuarios', dados);
    mostrarSucesso('Colaborador cadastrado com sucesso! Redirecionando...');
    setTimeout(() => { window.location.href = 'dashboard-gestor.html'; }, 1500);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

function mostrarErro(texto) {
  const el = document.getElementById('cadastro-erro');
  el.textContent = texto;
  el.hidden = false;
}

function mostrarSucesso(texto) {
  const el = document.getElementById('cadastro-sucesso');
  el.textContent = texto;
  el.hidden = false;
}

function esconderMensagens() {
  document.getElementById('cadastro-erro').hidden = true;
  document.getElementById('cadastro-sucesso').hidden = true;
}
