# Testes e Validação - NIVELA

## Objetivo

Este documento registra a validação manual realizada no sistema NIVELA antes da entrega final do Projeto Integrador.

## Ambiente utilizado

- Backend: Node.js + Express em `http://localhost:3000`
- Frontend: arquivos estáticos servidos em `http://localhost:5500`
- Banco de dados: MySQL com dados de teste do projeto
- Navegador: ambiente local de teste

## Cenários validados

| Cenário | Resultado | Observação |
|--------|-----------|------------|
| Health check da API | Aprovado | Rota raiz retornou status online e lista de rotas disponíveis |
| Login do gestor | Aprovado | Usuário `gestor@conecta.com` autenticado com sucesso |
| Login do colaborador | Aprovado | Usuário `ana.silva@conecta.com` autenticado com sucesso |
| Listagem de áreas | Aprovado | API retornou áreas cadastradas para os formulários |
| Listagem de cargos | Aprovado | API retornou cargos com vínculo de área |
| Listagem de trilhas | Aprovado | API retornou trilhas cadastradas |
| Progresso do colaborador | Aprovado | API retornou progresso da trilha do colaborador |
| Listagem de conteúdos | Aprovado | API retornou conteúdos vinculados aos módulos |
| Avaliação por trilha | Aprovado | API retornou avaliação com questões e alternativas |
| Tela de login | Aprovado | Tela renderizada corretamente |
| Painel do gestor | Aprovado | Métricas e tabela carregadas com dados da API |
| Cadastro de colaborador | Aprovado | Campos de área e cargo carregados dinamicamente |
| Criação de trilha | Aprovado | Tela exibe módulos, URL de material e avaliação opcional |
| Home do colaborador | Aprovado | Progresso e módulo atual carregados da API |
| Tela de avaliação | Aprovado | Questão e alternativas carregadas do banco de dados |

## Evidências

As capturas das telas implementadas estão salvas em:

`evidencias/telas/implementadas/`

Arquivos gerados:

- `01-login-implementada.png`
- `02-dashboard-gestor-implementada.png`
- `03-cadastro-colaborador-implementada.png`
- `04-criar-trilha-implementada.png`
- `05-home-colaborador-implementada.png`
- `06-avaliacao-implementada.png`

## Observação

Os testes registrados são manuais e funcionais, adequados ao escopo acadêmico da entrega. Uma evolução futura seria adicionar testes automatizados para rotas da API e fluxos principais do frontend.
