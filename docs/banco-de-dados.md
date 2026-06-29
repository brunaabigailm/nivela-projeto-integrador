# Banco de Dados – NIVELA

## Descrição

O banco de dados do sistema NIVELA foi estruturado para armazenar as informações necessárias ao funcionamento da plataforma de onboarding corporativo.

A estrutura contempla dados relacionados a empresas, áreas, cargos, usuários, trilhas de aprendizagem, módulos, conteúdos, avaliações, respostas e progresso dos colaboradores.

## Banco utilizado

- Banco de dados: MySQL
- Nome do banco: nivela_db

## Entidades principais

### Empresa

Armazena os dados das empresas cadastradas na plataforma.

Principais informações:

- Nome
- CNPJ
- E-mail
- Telefone
- Status

### Área

Representa os setores ou áreas internas de uma empresa.

Principais informações:

- Nome
- Descrição
- Empresa vinculada

### Cargo

Representa os cargos existentes dentro de uma área.

Principais informações:

- Nome
- Descrição
- Área vinculada

### Usuário

Armazena os usuários do sistema, incluindo administradores, gestores e colaboradores.

A diferenciação entre os perfis é feita pelo campo `tipo_usuario`.

Principais informações:

- Nome
- E-mail
- Senha
- Tipo de usuário
- Status
- Empresa, área e cargo vinculados

### Trilha

Representa uma trilha de onboarding criada para determinado cargo ou grupo de colaboradores.

Principais informações:

- Título
- Descrição
- Status
- Data de criação
- Empresa vinculada
- Cargo vinculado
- Gestor responsável

### Módulo

Representa uma divisão interna de uma trilha de aprendizagem.

Principais informações:

- Título
- Descrição
- Ordem
- Trilha vinculada

### Conteúdo

Representa os materiais disponibilizados dentro dos módulos.

Principais informações:

- Título
- Descrição
- Tipo de conteúdo
- URL do material
- Ordem
- Módulo vinculado

### Avaliação

Representa uma avaliação vinculada a uma trilha de onboarding.

Principais informações:

- Título
- Descrição
- Nota mínima
- Trilha vinculada

### Questão

Representa as perguntas cadastradas em uma avaliação.

Principais informações:

- Enunciado
- Tipo de questão
- Pontuação
- Avaliação vinculada

### Resposta

Armazena as respostas enviadas pelos colaboradores.

Principais informações:

- Resposta
- Nota obtida
- Data da resposta
- Usuário vinculado
- Questão vinculada

### Progresso da Trilha

Registra o progresso do colaborador em determinada trilha.

Principais informações:

- Percentual de conclusão
- Status
- Data de início
- Data de conclusão
- Usuário vinculado
- Trilha vinculada

### Progresso do Conteúdo

Registra o progresso do colaborador em cada conteúdo acessado.

Principais informações:

- Status
- Data de visualização
- Usuário vinculado
- Conteúdo vinculado

## Scripts SQL

Os scripts do banco de dados estão localizados na pasta `database/`.

Arquivos disponíveis:

- `ddl.sql`: responsável pela criação do banco de dados e das tabelas.
- `dml.sql`: responsável pela inserção de dados iniciais para teste.
- `migrations.sql`: responsável por ajustes adicionais aplicados após a versão inicial, incluindo alternativas das questões de avaliação.

## Observação

A estrutura do banco foi criada com base no MER do sistema NIVELA e poderá ser ajustada conforme a evolução do projeto.
