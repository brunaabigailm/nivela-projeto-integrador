# Planejamento do Projeto NIVELA

## Informações do Projeto

- **Projeto:** NIVELA — Plataforma web de onboarding corporativo
- **Aluna:** Bruna Abigail Milbradt
- **Curso:** Análise e Desenvolvimento de Sistemas

---

## Cronograma Inicial

| Data | Atividade | Status | Observação |
|------|-----------|--------|------------|
| 24/05/2026 | Definição do nome do projeto | ✅ Concluído | Projeto definido como NIVELA |
| 24/05/2026 | Definição do tema e problema | ✅ Concluído | Onboarding corporativo de novos colaboradores |
| 24/05/2026 | Definição dos objetivos | ✅ Concluído | Objetivo geral e objetivos específicos documentados |
| 24/05/2026 | Criação da justificativa | ✅ Concluído | Justificativa inicial inserida na documentação |
| 24/05/2026 | Definição do escopo completo e da entrega atual | ✅ Concluído | Separação entre visão futura e MVP acadêmico |
| 24/05/2026 | Definição do público-alvo e usuários do sistema | ✅ Concluído | Gestor, colaborador e administrador representados por perfis de usuário |
| 24/05/2026 | Definição das tecnologias previstas | ✅ Concluído | HTML, CSS, JavaScript, Node.js, Express e MySQL |
| 24/05/2026 | Levantamento dos requisitos funcionais e não funcionais | ✅ Concluído | Requisitos iniciais documentados |
| 24/05/2026 | Levantamento das regras de negócio | ✅ Concluído | Regras básicas do sistema documentadas |
| 24/05/2026 | Criação do Diagrama de Caso de Uso (UML) | ✅ Concluído | Diagrama com atores Colaborador e Gestor |
| 24/05/2026 | Criação do Diagrama de Sequência (UML) | ✅ Concluído | Fluxo de realização de avaliação documentado |
| 24/05/2026 | Criação do MER — Modelo Entidade-Relacionamento | ✅ Concluído | Modelo conceitual com 12 entidades |
| 24/05/2026 | Criação do protótipo visual inicial | ✅ Concluído | 6 telas geradas com apoio de IA via Figma Make |
| 24/05/2026 | Criação do repositório GitHub | ✅ Concluído | Repositório criado e estruturado |
| 24/05/2026 | Organização inicial das pastas do projeto | ✅ Concluído | Pastas docs, evidencias, frontend, backend e database criadas |
| 24/05/2026 | Criação dos scripts DDL e DML iniciais | ✅ Concluído | Scripts de criação do banco e dados de teste criados |
| 14/06/2026 | Revisão e correção dos diagramas UML e MER | ✅ Concluído | Diagramas revisados e atualizados no repositório |
| 14/06/2026 | Versão inicial do banco de dados (DDL + DML) | ✅ Concluído | Scripts criados em `database/ddl.sql` e `database/dml.sql` |
| 14/06/2026 | Versão inicial das telas (wireframes) | ✅ Concluído | 6 telas prototipadas com Figma Make em `evidencias/telas/` |
| 14/06/2026 | Versão inicial da API backend | ✅ Concluído | API REST com Node.js + Express: CRUD de usuários, trilhas e progresso |
| 15/06/2026 | Revisão do que foi implementado nas Etapas 1 e 2 | ✅ Concluído | Balanço de itens concluídos e pendentes |
| 18/06/2026 | Implementação das telas em HTML/CSS/JS | ✅ Concluído | Codificação do frontend no repositório |
| 21/06/2026 | Aprimoramento das APIs e banco de dados | ✅ Concluído | Refinamento de endpoints, validações e segurança |
| 24/06/2026 | Integração frontend e backend | ✅ Concluído | Conexão das telas com as APIs |
| 25/06/2026 | Testes das funcionalidades implementadas | ✅ Concluído | Validação manual das rotas e interfaces |
| 26/06/2026 | Organização final do repositório e código-fonte | ✅ Concluído | Revisão de legibilidade e boas práticas |
| 27/06/2026 | Elaboração do documento de apresentação do projeto | 🟡 Pendente | Documento de apresentação a refazer antes da entrega final |
| 27/06/2026 | Produção científica | 🟡 Pendente | Material a finalizar conforme orientação do professor |
| 28/06/2026 | Entrega final — Etapas 3 e 4 | 🟡 Em andamento | Código e evidências prontos; documentos de apresentação e submissão na plataforma ainda pendentes |

> O cronograma poderá ser ajustado conforme orientações do professor e evolução do desenvolvimento.

---

## Escopo da Entrega Atual (Etapas 1, 2, 3 e 4)

A entrega final contempla:

- Definição do escopo, problema e objetivos do sistema.
- Levantamento de requisitos funcionais, não funcionais e regras de negócio.
- Diagramas iniciais: Caso de Uso (UML), Sequência (UML) e MER (notação Chen).
- Protótipo visual inicial com 6 telas principais (Figma Make).
- Scripts de banco de dados: DDL (criação de 12 tabelas) e DML (dados de teste com senhas em bcrypt).
- API REST com Node.js e Express:
  - Autenticação via `POST /api/login` com comparação bcrypt.
  - CRUD completo de usuários (com nome do cargo via JOIN).
  - CRUD de trilhas com criação de múltiplos módulos em uma única operação (transação).
  - Registro e atualização de progresso em trilhas.
  - Listagem de áreas e cargos para dropdowns dinâmicos no frontend.
  - CORS habilitado para permitir acesso a partir do frontend.
- Frontend em HTML, CSS e JavaScript puros com 6 telas integradas à API:
  - Login (`index.html`).
  - Painel do Gestor com métricas em tempo real (`dashboard-gestor.html`).
  - Cadastro de Colaborador (`cadastro-colaborador.html`).
  - Criação de Trilha com módulos dinâmicos (`criar-trilha.html`).
  - Home do Colaborador com progresso real (`home-colaborador.html`).
  - Avaliação com questões de múltipla escolha vindas do banco, timer regressivo e navegação rápida (`avaliacao.html`).
- Repositório GitHub organizado com documentação técnica (requisitos, banco de dados, planejamento, READMEs de frontend e backend).

---

## Repositório GitHub

[https://github.com/brunaabigailm/nivela-projeto-integrador](https://github.com/brunaabigailm/nivela-projeto-integrador)
