/* NIVELA — lógica da tela de login */

const formLogin = document.getElementById('form-login');
const campoErro = document.getElementById('login-erro');

formLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  campoErro.hidden = true;

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  try {
    const usuario = await api('POST', '/api/login', { email, senha });

    localStorage.setItem('nivela_usuario', JSON.stringify(usuario));

    if (usuario.tipo_usuario === 'colaborador') {
      window.location.href = 'home-colaborador.html';
    } else {
      window.location.href = 'dashboard-gestor.html';
    }
  } catch (erro) {
    campoErro.textContent = erro.message;
    campoErro.hidden = false;
  }
});
