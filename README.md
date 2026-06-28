# NIVELA

Projeto Integrador desenvolvido para o curso de Análise e Desenvolvimento de Sistemas.

## Descrição

O **NIVELA** é uma plataforma web voltada ao onboarding corporativo de novos colaboradores. A proposta do sistema é auxiliar empresas na criação de trilhas de aprendizagem, organização de conteúdos, aplicação de avaliações e acompanhamento do progresso dos usuários.

## Objetivo

Desenvolver uma solução web que permita estruturar o processo de integração de novos colaboradores de forma mais organizada, padronizada e acompanhável.

## Funcionalidades implementadas

- Login de usuários com senha criptografada (bcrypt).
- Painel do gestor com métricas em tempo real, atalhos e tabela de colaboradores com busca.
- Cadastro de colaboradores com seleção dinâmica de cargo e área.
- Criação de trilhas de aprendizagem com múltiplos módulos numa única operação.
- Jornada do colaborador com progresso real, módulo atual, próximos módulos e agenda.
- Avaliação interativa com 5 questões de múltipla escolha, timer regressivo e navegação rápida.

## Tecnologias utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (sem frameworks).
- **Backend:** Node.js, Express, MySQL2, bcryptjs, dotenv, cors.
- **Banco de dados:** MySQL (executado via XAMPP).
- **Versionamento:** Git e GitHub.
- **Prototipação:** Figma Make.

## Estrutura do repositório

```text
nivela-projeto-integrador/
├── docs/
│   ├── planejamento.md
│   ├── requisitos.md
│   └── banco-de-dados.md
├── evidencias/
│   ├── diagramas/                 # Caso de uso, sequência, MER
│   ├── telas/                     # Wireframes Figma das 6 telas
│   └── documentacao/              # Collection do Postman
├── frontend/                      # HTML, CSS, JS (6 telas)
├── backend/                       # API Node.js + Express
├── database/
│   ├── ddl.sql                    # Criação das 12 tabelas
│   └── dml.sql                    # Dados de teste (senhas em bcrypt)
└── README.md
```

## Como executar

### Pré-requisitos
- Node.js (v18+ recomendado)
- XAMPP com MySQL iniciado

### Passos
1. **Criar o banco e popular com dados de teste** — abra o phpMyAdmin (`localhost/phpmyadmin`), crie o banco `nivela_db`, e execute na aba SQL os scripts `database/ddl.sql` e `database/dml.sql`.
2. **Configurar e iniciar o backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env       # ajustar credenciais se necessário
   npm start
   ```
   O backend ficará disponível em `http://localhost:3000`.
3. **Iniciar o frontend:**
   ```bash
   npx live-server frontend --port=5500
   ```
   Acesse `http://localhost:5500` no navegador.

### Credenciais de teste

| Tipo | E-mail | Senha |
|------|--------|-------|
| Gestor | `gestor@conecta.com` | `senha123` |
| Colaborador | `ana.silva@conecta.com` | `senha123` |

## Status do projeto

Etapas 1 a 4 concluídas — projeto entregue como Projeto Integrador.

## Autora

Bruna Abigail Milbradt
