/* NIVELA — lógica da Home do Colaborador */

const usuarioLogado = JSON.parse(localStorage.getItem('nivela_usuario') || 'null');

if (!usuarioLogado) {
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  preencherTopbar();
  document.getElementById('btn-sair').addEventListener('click', sair);
  carregarJornada();
});

function preencherTopbar() {
  document.getElementById('usuario-nome').textContent  = usuarioLogado.nome;
  document.getElementById('usuario-cargo').textContent =
    usuarioLogado.nome_cargo || usuarioLogado.tipo_usuario;
  document.getElementById('usuario-avatar').textContent =
    (usuarioLogado.nome || '?').trim().charAt(0).toUpperCase();
  document.getElementById('saudacao').textContent =
    'Bem-vindo(a), ' + (usuarioLogado.nome || '').split(' ')[0] + '! 👋';
}

function sair() {
  localStorage.removeItem('nivela_usuario');
  window.location.href = 'index.html';
}

async function carregarJornada() {
  try {
    const progressos = await api('GET', `/api/progresso/trilha/${usuarioLogado.id_usuario}`);

    if (!progressos || progressos.length === 0) {
      mostrarSemTrilhas();
      return;
    }

    const trilhaAtual = progressos.find(p => p.status !== 'concluido') || progressos[0];
    const percentualAtual = Number(trilhaAtual.percentual_conclusao || 0);

    const trilhaCompleta = await api('GET', `/api/trilhas/${trilhaAtual.id_trilha}`);
    const modulos = trilhaCompleta.modulos || [];

    const totalModulos = modulos.length || 1;
    const concluidos   = Math.round((percentualAtual / 100) * totalModulos);

    atualizarBarraProgresso(percentualAtual);
    atualizarMetricas(concluidos, totalModulos, modulos, progressos);
    atualizarModuloAtual(modulos[concluidos] || modulos[0], percentualAtual, trilhaCompleta.titulo);
    atualizarProximosModulos(modulos.slice(concluidos + 1));
  } catch (erro) {
    console.error(erro);
    mostrarSemTrilhas();
  }
}

function atualizarBarraProgresso(percentual) {
  document.getElementById('progresso-geral').textContent = Math.round(percentual) + '%';
  document.getElementById('barra-geral').style.width = percentual + '%';
}

function atualizarMetricas(concluidos, total, modulos, progressos) {
  document.getElementById('modulos-concluidos').textContent = `${concluidos}/${total}`;

  // Estimativa: 30 min por módulo concluído
  const horas = (concluidos * 0.5).toFixed(1);
  document.getElementById('horas-estudo').textContent = horas + 'h';

  const certificados = progressos.filter(p => Number(p.percentual_conclusao) >= 100).length;
  document.getElementById('certificados').textContent = certificados;
}

function atualizarModuloAtual(modulo, percentual, tituloTrilha) {
  const container = document.getElementById('modulo-atual');
  if (!modulo) {
    container.innerHTML = '<p>Você já concluiu todos os módulos! 🎉</p>';
    return;
  }
  const tag = container.querySelector('.tag');
  tag.textContent = modulo.tipo || 'Módulo';

  document.getElementById('modulo-atual-titulo').textContent = modulo.titulo;
  document.getElementById('modulo-atual-meta').textContent =
    `${modulo.duracao || '—'} • ${Math.round(percentual)}% concluído • ${tituloTrilha}`;
}

function atualizarProximosModulos(modulos) {
  const ul = document.getElementById('proximos-modulos');
  if (modulos.length === 0) {
    ul.innerHTML = '<li class="tabela-vazia">Sem próximos módulos.</li>';
    return;
  }
  ul.innerHTML = modulos.slice(0, 4).map(m => `
    <li>
      <strong>${m.titulo}</strong>
      <span>${m.tipo || 'Módulo'} • ${m.duracao || '—'}</span>
    </li>
  `).join('');
}

function mostrarSemTrilhas() {
  document.getElementById('progresso-geral').textContent = '0%';
  document.getElementById('modulos-concluidos').textContent = '0/0';
  document.getElementById('horas-estudo').textContent = '0h';
  document.getElementById('certificados').textContent = '0';
  document.getElementById('modulo-atual').innerHTML =
    '<p>Aguarde — nenhuma trilha foi atribuída a você ainda.</p>';
  document.getElementById('proximos-modulos').innerHTML =
    '<li class="tabela-vazia">Nenhum módulo disponível.</li>';
}
