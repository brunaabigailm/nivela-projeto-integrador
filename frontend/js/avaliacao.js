/* NIVELA — lógica da Avaliação */

const usuarioLogado = JSON.parse(localStorage.getItem('nivela_usuario') || 'null');

if (!usuarioLogado) {
  window.location.href = 'index.html';
}

const QUESTOES = [
  {
    enunciado: 'Qual é a missão principal da nossa empresa?',
    alternativas: [
      'Maximizar lucros a qualquer custo',
      'Transformar a forma como as pessoas trabalham através da tecnologia',
      'Ser a maior empresa do setor',
      'Reduzir custos operacionais',
    ],
    correta: 1,
  },
  {
    enunciado: 'Qual ferramenta usamos para gestão de tarefas?',
    alternativas: ['Email', 'Planilha', 'Sistema interno de tickets', 'Não usamos ferramenta específica'],
    correta: 2,
  },
  {
    enunciado: 'Qual é o horário comercial padrão?',
    alternativas: ['8h às 16h', '9h às 18h', '10h às 19h', '7h às 17h'],
    correta: 1,
  },
  {
    enunciado: 'Em caso de dúvidas, com quem devo falar primeiro?',
    alternativas: ['Diretor', 'Meu gestor direto', 'Recursos Humanos', 'Colega de trabalho'],
    correta: 1,
  },
  {
    enunciado: 'Qual a política de home office?',
    alternativas: [
      'Não é permitido',
      'Apenas em situações de emergência',
      'Modelo híbrido com até 3 dias por semana',
      'Totalmente remoto',
    ],
    correta: 2,
  },
];

let questaoAtual = 0;
const respostas = new Array(QUESTOES.length).fill(null);
let tempoRestante = 10 * 60;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('total-questoes').textContent = QUESTOES.length;
  document.getElementById('btn-anterior').addEventListener('click', () => navegar(-1));
  document.getElementById('btn-proxima').addEventListener('click', () => navegar(1));
  renderizar();
  iniciarTimer();
});

function renderizar() {
  const q = QUESTOES[questaoAtual];
  document.getElementById('enunciado').textContent = q.enunciado;

  const percentual = Math.round(((questaoAtual + 1) / QUESTOES.length) * 100);
  document.getElementById('questao-atual').textContent = `Questão ${questaoAtual + 1}`;
  document.getElementById('percentual-questao').textContent = percentual + '%';
  document.getElementById('barra-avaliacao').style.width = percentual + '%';

  const containerAlt = document.getElementById('alternativas');
  containerAlt.innerHTML = q.alternativas.map((alt, i) => `
    <label class="alternativa ${respostas[questaoAtual] === i ? 'selecionada' : ''}" data-i="${i}">
      <span class="alternativa-bola"></span>
      <span>${alt}</span>
      <input type="radio" name="resp" value="${i}" ${respostas[questaoAtual] === i ? 'checked' : ''}>
    </label>
  `).join('');

  containerAlt.querySelectorAll('.alternativa').forEach(el => {
    el.addEventListener('click', () => {
      respostas[questaoAtual] = Number(el.dataset.i);
      renderizar();
    });
  });

  const navegacao = document.getElementById('navegacao-rapida');
  navegacao.innerHTML = QUESTOES.map((_, i) => {
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
  btnProxima.textContent = questaoAtual === QUESTOES.length - 1 ? 'Finalizar' : 'Próxima';
}

function navegar(delta) {
  if (delta === 1 && questaoAtual === QUESTOES.length - 1) {
    finalizar();
    return;
  }
  questaoAtual += delta;
  renderizar();
}

function finalizar() {
  const acertos = respostas.filter((r, i) => r === QUESTOES[i].correta).length;
  const nota = ((acertos / QUESTOES.length) * 10).toFixed(1);
  const aprovado = nota >= 7;

  const msg = document.getElementById('avaliacao-mensagem');
  msg.textContent = `Avaliação concluída! Você acertou ${acertos} de ${QUESTOES.length} (nota ${nota}). ${aprovado ? '✅ Aprovado!' : '❌ Não atingiu a nota mínima.'}`;
  msg.style.color = aprovado ? 'var(--cor-sucesso)' : 'var(--cor-erro)';
  msg.hidden = false;
  setTimeout(() => { window.location.href = 'home-colaborador.html'; }, 3000);
}

function iniciarTimer() {
  const el = document.getElementById('timer');
  const intervalo = setInterval(() => {
    tempoRestante -= 1;
    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      finalizar();
      return;
    }
    const min = Math.floor(tempoRestante / 60);
    const seg = tempoRestante % 60;
    el.textContent = `⏰ ${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
  }, 1000);
}
