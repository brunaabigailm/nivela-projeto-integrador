/* NIVELA — lógica da Avaliação (integrada ao banco) */

const usuarioLogado = JSON.parse(localStorage.getItem('nivela_usuario') || 'null');

if (!usuarioLogado) {
  window.location.href = 'index.html';
}

let avaliacaoCarregada = null;
let questoes = [];
let questaoAtual = 0;
let respostas = [];
let tempoRestante = 10 * 60;
let timerIntervalo = null;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-anterior').addEventListener('click', () => navegar(-1));
  document.getElementById('btn-proxima').addEventListener('click', () => navegar(1));
  carregarAvaliacao();
});

async function carregarAvaliacao() {
  const params = new URLSearchParams(window.location.search);
  const idTrilha = params.get('id_trilha') || 1;

  try {
    avaliacaoCarregada = await api('GET', `/api/avaliacoes/trilha/${idTrilha}`);
    questoes = avaliacaoCarregada.questoes || [];

    if (questoes.length === 0) {
      mostrarSemQuestoes();
      return;
    }

    respostas = new Array(questoes.length).fill(null);
    document.getElementById('total-questoes').textContent = questoes.length;
    renderizar();
    iniciarTimer();
  } catch (erro) {
    mostrarSemQuestoes(erro.message);
  }
}

function mostrarSemQuestoes(mensagem) {
  document.getElementById('enunciado').textContent =
    mensagem || 'Nenhuma avaliação disponível para esta trilha ainda.';
  document.getElementById('alternativas').innerHTML = '';
  document.getElementById('btn-proxima').disabled = true;
  document.getElementById('btn-anterior').disabled = true;
}

function renderizar() {
  const q = questoes[questaoAtual];
  document.getElementById('enunciado').textContent = q.enunciado;

  const percentual = Math.round(((questaoAtual + 1) / questoes.length) * 100);
  document.getElementById('questao-atual').textContent = `Questão ${questaoAtual + 1}`;
  document.getElementById('percentual-questao').textContent = percentual + '%';
  document.getElementById('barra-avaliacao').style.width = percentual + '%';

  const containerAlt = document.getElementById('alternativas');
  containerAlt.innerHTML = q.alternativas.map((alt, i) => `
    <label class="alternativa ${respostas[questaoAtual] === alt.id_alternativa ? 'selecionada' : ''}" data-id="${alt.id_alternativa}">
      <span class="alternativa-bola"></span>
      <span>${alt.texto}</span>
      <input type="radio" name="resp" value="${alt.id_alternativa}" ${respostas[questaoAtual] === alt.id_alternativa ? 'checked' : ''}>
    </label>
  `).join('');

  containerAlt.querySelectorAll('.alternativa').forEach(el => {
    el.addEventListener('click', () => {
      respostas[questaoAtual] = Number(el.dataset.id);
      renderizar();
    });
  });

  const navegacao = document.getElementById('navegacao-rapida');
  navegacao.innerHTML = questoes.map((_, i) => {
    let classe = '';
    if (i === questaoAtual) classe = 'ativa';
    else if (respostas[i] !== null) classe = 'respondida';
    return `<span class="nav-numero ${classe}" data-i="${i}">${i + 1}</span>`;
  }).join('');

  navegacao.querySelectorAll('.nav-numero').forEach(el => {
    el.addEventListener('click', () => {
      questaoAtual = Number(el.dataset.i);
      renderizar();
    });
  });

  document.getElementById('btn-anterior').disabled = questaoAtual === 0;
  const btnProxima = document.getElementById('btn-proxima');
  btnProxima.disabled = respostas[questaoAtual] === null;
  btnProxima.textContent = questaoAtual === questoes.length - 1 ? 'Finalizar' : 'Próxima';
}

function navegar(delta) {
  if (delta === 1 && questaoAtual === questoes.length - 1) {
    finalizar();
    return;
  }
  questaoAtual += delta;
  renderizar();
}

function finalizar() {
  if (timerIntervalo) clearInterval(timerIntervalo);

  const acertos = respostas.filter((idAlt, i) => {
    const correta = questoes[i].alternativas.find(a => a.is_correta === 1 || a.is_correta === true);
    return correta && idAlt === correta.id_alternativa;
  }).length;

  const nota = ((acertos / questoes.length) * 10).toFixed(1);
  const notaMinima = Number(avaliacaoCarregada.nota_minima) || 7;
  const aprovado = Number(nota) >= notaMinima;

  const msg = document.getElementById('avaliacao-mensagem');
  msg.textContent = `Avaliação concluída! Você acertou ${acertos} de ${questoes.length} (nota ${nota}). ${aprovado ? '✅ Aprovado!' : '❌ Não atingiu a nota mínima de ' + notaMinima + '.'}`;
  msg.style.color = aprovado ? 'var(--cor-sucesso)' : 'var(--cor-erro)';
  msg.hidden = false;
  setTimeout(() => { window.location.href = 'home-colaborador.html'; }, 3000);
}

function iniciarTimer() {
  const el = document.getElementById('timer');
  timerIntervalo = setInterval(() => {
    tempoRestante -= 1;
    if (tempoRestante <= 0) {
      clearInterval(timerIntervalo);
      finalizar();
      return;
    }
    const min = Math.floor(tempoRestante / 60);
    const seg = tempoRestante % 60;
    el.textContent = `⏰ ${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
  }, 1000);
}
