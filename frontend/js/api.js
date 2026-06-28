/* NIVELA — funções para conversar com a API do backend */

const API_BASE = 'http://localhost:3000';

async function api(metodo, caminho, dados) {
  const opcoes = {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
  };

  if (dados) {
    opcoes.body = JSON.stringify(dados);
  }

  const resposta = await fetch(API_BASE + caminho, opcoes);
  const corpo = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(corpo.erro || 'Erro na requisição');
  }

  return corpo;
}
