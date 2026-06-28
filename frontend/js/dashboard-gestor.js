/* NIVELA — lógica do Painel do Gestor */

const usuarioLogado = JSON.parse(localStorage.getItem('nivela_usuario') || 'null');

if (!usuarioLogado || usuarioLogado.tipo_usuario === 'colaborador') {
  window.location.href = 'index.html';
}

let listaColaboradores = [];

document.addEventListener('DOMContentLoaded', () => {
  preencherTopbar();
  document.getElementById('btn-sair').addEventListener('click', sair);
  document.getElementById('busca-colaborador').addEventListener('input', filtrarTabela);
  carregarDados();
});

function preencherTopbar() {
  document.getElementById('usuario-nome').textContent  = usuarioLogado.nome;
  document.getElementById('usuario-email').textContent = usuarioLogado.email;
  document.getElementById('usuario-avatar').textContent = primeiraLetra(usuarioLogado.nome);
}

function sair() {
  localStorage.removeItem('nivela_usuario');
  window.location.href = 'index.html';
}

async function carregarDados() {
  try {
    const [usuarios, trilhas] = await Promise.all([
      api('GET', '/api/usuarios'),
      api('GET', '/api/trilhas'),
    ]);

    const colaboradores = usuarios.filter(u => u.tipo_usuario === 'colaborador');

    const progressos = await Promise.all(
      colaboradores.map(c => api('GET', `/api/progresso/trilha/${c.id_usuario}`).catch(() => []))
    );

    listaColaboradores = colaboradores.map((c, i) => {
      const trilhasDoUsuario = progressos[i] || [];
      const media = trilhasDoUsuario.length === 0
        ? 0
        : trilhasDoUsuario.reduce((soma, t) => soma + Number(t.percentual_conclusao || 0), 0) / trilhasDoUsuario.length;
      return { ...c, progresso: Math.round(media) };
    });

    preencherMetricas(colaboradores, trilhas, listaColaboradores);
    renderizarTabela(listaColaboradores);
  } catch (erro) {
    console.error(erro);
    document.getElementById('tbody-colaboradores').innerHTML =
      `<tr><td colspan="4" class="tabela-vazia">Erro ao carregar dados: ${erro.message}</td></tr>`;
  }
}

function preencherMetricas(colaboradores, trilhas, comProgresso) {
  const ativos = colaboradores.filter(c => c.status === 'ativo').length;
  document.getElementById('metrica-colaboradores').textContent = ativos;
  document.getElementById('metrica-trilhas').textContent = trilhas.length;

  const taxa = comProgresso.length === 0
    ? 0
    : Math.round(comProgresso.reduce((soma, c) => soma + c.progresso, 0) / comProgresso.length);
  document.getElementById('metrica-conclusao').textContent = taxa + '%';

  const certificados = comProgresso.filter(c => c.progresso >= 100).length;
  document.getElementById('metrica-certificados').textContent = certificados;
}

function renderizarTabela(colaboradores) {
  const tbody = document.getElementById('tbody-colaboradores');

  if (colaboradores.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="tabela-vazia">Nenhum colaborador encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = colaboradores.map(c => `
    <tr>
      <td>
        <span class="tabela-avatar">${primeiraLetra(c.nome)}</span>
        ${c.nome}
      </td>
      <td>${c.nome_cargo || '—'}</td>
      <td>
        <span class="barra-progresso"><span class="barra-progresso-preenchida" style="width: ${c.progresso}%"></span></span>
        ${c.progresso}%
      </td>
      <td>
        <span class="tag ${c.progresso >= 100 ? 'tag-sucesso' : ''}">
          ${c.progresso >= 100 ? 'Concluído' : 'Em andamento'}
        </span>
      </td>
    </tr>
  `).join('');
}

function filtrarTabela(evento) {
  const termo = evento.target.value.trim().toLowerCase();
  const filtrados = listaColaboradores.filter(c =>
    c.nome.toLowerCase().includes(termo)
  );
  renderizarTabela(filtrados);
}

function primeiraLetra(nome) {
  return (nome || '?').trim().charAt(0).toUpperCase();
}
