# Frontend – NIVELA

## Descrição

Este módulo corresponde à interface do sistema NIVELA. Foi desenvolvido em **HTML5, CSS3 e JavaScript puros** (sem frameworks), com foco em simplicidade, organização do código e fidelidade aos protótipos definidos no Figma.

A interface se comunica com a API backend (Node.js + Express) via `fetch`, e armazena a sessão do usuário no `localStorage` do navegador.

---

## Tecnologias utilizadas

- **HTML5** — estrutura semântica das telas.
- **CSS3** — estilos com variáveis CSS, Flexbox e Grid.
- **JavaScript (ES6+)** — lógica, requisições à API e renderização dinâmica.
- **Fetch API** — comunicação com o backend.
- **LocalStorage** — armazenamento da sessão do usuário logado.

---

## Telas implementadas

| Arquivo | Tela | Função |
|---------|------|--------|
| `index.html` | Login | Entrada do sistema, autentica via `POST /api/login` |
| `dashboard-gestor.html` | Painel do Gestor | Métricas, atalhos e tabela de colaboradores |
| `cadastro-colaborador.html` | Cadastrar Colaborador | Formulário com áreas/cargos dinâmicos |
| `criar-trilha.html` | Criar Trilha de Aprendizagem | Trilha + múltiplos módulos numa única operação |
| `home-colaborador.html` | Jornada do Colaborador | Progresso geral, módulo atual, próximos módulos |
| `avaliacao.html` | Avaliação | Questões de múltipla escolha vindas do banco, com timer e navegação |

---

## Estrutura

```
frontend/
├── index.html                       # Login
├── dashboard-gestor.html            # Painel do gestor
├── cadastro-colaborador.html        # Cadastro de colaborador
├── criar-trilha.html                # Criação de trilha
├── home-colaborador.html            # Home do colaborador
├── avaliacao.html                   # Avaliação
├── css/
│   └── style.css                    # Estilos globais (variáveis, base, componentes)
└── js/
    ├── api.js                       # Função helper para chamadas à API
    ├── login.js                     # Lógica do login
    ├── dashboard-gestor.js          # Métricas e tabela do dashboard
    ├── cadastro-colaborador.js      # Formulário de cadastro
    ├── criar-trilha.js              # Formulário com módulos dinâmicos
    ├── home-colaborador.js          # Jornada do colaborador
    └── avaliacao.js                 # Quiz com timer e navegação
```

---

## Como executar

O frontend é composto por arquivos estáticos — pode ser aberto de duas formas:

**Opção 1: servidor local (recomendado)**

Instale o `live-server` e rode na pasta `frontend/`:

```bash
npx live-server frontend --port=5500
```

Acesse `http://localhost:5500`.

**Opção 2: abrir o arquivo diretamente**

Abra `frontend/index.html` no navegador. Funciona, mas algumas requisições ao backend podem ser bloqueadas por restrições de CORS dependendo do navegador.

> O backend (porta 3000) precisa estar rodando para o sistema funcionar.

---

## Identidade visual

- Paleta lilás/roxa (`#7C3AED`) inspirada nos wireframes do Figma.
- Cards arredondados com sombra suave.
- Tipografia do sistema operacional (sem fontes externas).
- Layout responsivo via Flexbox e CSS Grid.

Todas as cores, espaçamentos e cantos arredondados estão definidos como **variáveis CSS** no início do `style.css` — uma única alteração propaga por todo o sistema.

---

## Credenciais de teste

Após executar o script `database/dml.sql`, os seguintes usuários ficam disponíveis para login:

| Tipo | E-mail | Senha |
|------|--------|-------|
| Gestor | `gestor@conecta.com` | `senha123` |
| Colaborador | `ana.silva@conecta.com` | `senha123` |
| Colaborador | `carlos.souza@conecta.com` | `senha123` |
| Administrador | `admin@nivela.com` | `senha123` |
