# API Backend – NIVELA

## Descrição

Este módulo corresponde à camada de back-end do sistema NIVELA, responsável por receber as requisições da interface, processar as informações e se comunicar com o banco de dados.

A API foi desenvolvida utilizando Node.js com o framework Express, e realiza a conexão com o banco de dados MySQL definido na etapa anterior do projeto.

---

## Tecnologias utilizadas

- **Node.js** – ambiente de execução do servidor.
- **Express** – framework para criação das rotas e gerenciamento das requisições.
- **MySQL2** – biblioteca para conexão e consulta ao banco de dados.
- **dotenv** – gerenciamento das variáveis de ambiente (dados de conexão).
- **bcryptjs** – criptografia das senhas dos usuários antes de armazenar no banco.
- **cors** – permite que o frontend acesse a API a partir de outra porta/origem.

---

## Como executar

**1. Instalar as dependências do projeto**
```bash
cd backend
npm install
```

**2. Configurar a conexão com o banco de dados**

Crie um arquivo `.env` na pasta `backend/` com base no arquivo `.env.example` disponível no repositório:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nivela_db
PORT=3000
```

**3. Criar e popular o banco de dados**

Antes de iniciar o servidor, é necessário executar os scripts SQL disponíveis na pasta `database/`:

```bash
mysql -u root -p < ../database/ddl.sql
mysql -u root -p < ../database/dml.sql
mysql -u root -p < ../database/migrations.sql
```

**4. Iniciar o servidor**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

---

## Rotas disponíveis

A API está organizada em grupos de rotas, cada um responsável por uma parte do sistema.

### Autenticação – `/api/login`

Responsável pelo login dos usuários. Compara a senha digitada com o hash armazenado no banco.

| Método | Rota | O que faz |
|--------|------|-----------|
| POST | `/api/login` | Autentica um usuário pelo e-mail e senha |

### Usuários – `/api/usuarios`

Responsável pelo cadastro e gerenciamento dos usuários do sistema, incluindo colaboradores, gestores e administradores.

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/api/usuarios` | Retorna a lista de todos os usuários cadastrados |
| GET | `/api/usuarios/:id` | Retorna os dados de um usuário específico |
| POST | `/api/usuarios` | Cadastra um novo usuário |
| PUT | `/api/usuarios/:id` | Atualiza os dados de um usuário |
| DELETE | `/api/usuarios/:id` | Remove um usuário do sistema |

### Trilhas – `/api/trilhas`

Responsável pelo gerenciamento das trilhas de onboarding criadas pelos gestores.

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/api/trilhas` | Retorna todas as trilhas com o nome do gestor e cargo vinculado |
| GET | `/api/trilhas/:id` | Retorna os dados da trilha e seus módulos |
| POST | `/api/trilhas` | Cria uma nova trilha de onboarding |
| PUT | `/api/trilhas/:id` | Atualiza informações de uma trilha |
| DELETE | `/api/trilhas/:id` | Remove uma trilha |

### Progresso – `/api/progresso`

Responsável pelo registro e acompanhamento do progresso dos colaboradores nas trilhas.

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/api/progresso/trilha/:id_usuario` | Retorna o progresso de um colaborador em suas trilhas |
| POST | `/api/progresso/trilha` | Registra o início de um colaborador em uma trilha |
| PUT | `/api/progresso/trilha/:id` | Atualiza o percentual de conclusão de uma trilha |
| POST | `/api/progresso/trilha/concluir` | Marca a trilha como concluída (cria ou atualiza o registro de progresso) |

### Áreas – `/api/areas`

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/api/areas` | Lista todas as áreas/departamentos cadastrados |
| POST | `/api/areas` | Cadastra uma nova área |

### Cargos – `/api/cargos`

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/api/cargos` | Lista todos os cargos com o nome da área vinculada |
| POST | `/api/cargos` | Cadastra um novo cargo |

### Conteúdos – `/api/conteudos`

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/api/conteudos` | Lista conteúdos cadastrados ou filtra por módulo |
| POST | `/api/conteudos` | Cadastra um novo conteúdo em um módulo |

### Avaliações – `/api/avaliacoes`

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/api/avaliacoes/trilha/:id_trilha` | Retorna a avaliação de uma trilha com questões e alternativas |
| POST | `/api/avaliacoes` | Cria uma avaliação com questões e alternativas |

---

## Exemplos de uso

Os exemplos abaixo demonstram como utilizar as rotas da API. Para testá-las, é possível utilizar ferramentas como o Postman ou o Insomnia.

### Listar usuários

```
GET http://localhost:3000/api/usuarios
```

Resposta:
```json
[
  {
    "id_usuario": 1,
    "nome": "Marina Ribeiro",
    "email": "gestor@conecta.com",
    "tipo_usuario": "gestor",
    "status": "ativo"
  }
]
```

### Cadastrar um novo usuário

```
POST http://localhost:3000/api/usuarios
Content-Type: application/json
```

Body:
```json
{
  "nome": "João Silva",
  "email": "joao@conecta.com",
  "senha": "senha123",
  "tipo_usuario": "colaborador",
  "id_empresa": 1,
  "id_area": 1,
  "id_cargo": 1
}
```

Resposta:
```json
{
  "mensagem": "Usuário criado com sucesso.",
  "id_usuario": 5
}
```

### Listar trilhas

```
GET http://localhost:3000/api/trilhas
```

Resposta:
```json
[
  {
    "id_trilha": 1,
    "titulo": "Integração para Desenvolvedores",
    "status": "ativa",
    "gestor": "Marina Ribeiro",
    "cargo": "Desenvolvedor Júnior"
  }
]
```

### Buscar trilha com módulos

```
GET http://localhost:3000/api/trilhas/1
```

Resposta:
```json
{
  "id_trilha": 1,
  "titulo": "Integração para Desenvolvedores",
  "status": "ativa",
  "modulos": [
    { "id_modulo": 1, "titulo": "Boas-vindas e Cultura", "ordem": 1 },
    { "id_modulo": 2, "titulo": "Ferramentas Internas", "ordem": 2 }
  ]
}
```

### Registrar início de uma trilha

```
POST http://localhost:3000/api/progresso/trilha
Content-Type: application/json
```

Body:
```json
{
  "id_usuario": 2,
  "id_trilha": 1
}
```

Resposta:
```json
{
  "mensagem": "Progresso iniciado.",
  "id": 3
}
```

---

## Estrutura do módulo

```
backend/
├── server.js          # Ponto de entrada do servidor
├── db.js              # Configuração da conexão com o banco de dados
├── .env.example       # Modelo de variáveis de ambiente
├── package.json       # Dependências e scripts do projeto
├── README.md          # Documentação do backend
└── routes/
    ├── auth.js       # Rota de login (autenticação)
    ├── usuarios.js   # Rotas de usuários
    ├── trilhas.js    # Rotas de trilhas (com módulos)
    ├── progresso.js  # Rotas de progresso
    ├── areas.js      # Rotas de áreas
    ├── cargos.js     # Rotas de cargos
    ├── conteudos.js  # Rotas de conteúdos
    └── avaliacoes.js # Rotas de avaliações
```
