# NIVELA: Plataforma Web para Gerenciamento de Onboarding Corporativo

## Resumo

O processo de onboarding é uma etapa essencial para a integração de novos colaboradores em uma organização. Quando realizado de forma descentralizada, pode gerar falhas na comunicação, dificuldade de acompanhamento e perda de padronização nos conteúdos apresentados. Este trabalho apresenta o desenvolvimento do NIVELA, uma plataforma web voltada ao gerenciamento de trilhas de onboarding, materiais de apoio, avaliações e acompanhamento de progresso. A solução foi desenvolvida como Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas, utilizando HTML, CSS, JavaScript, Node.js, Express e MySQL. Como resultado, foi entregue um MVP funcional com autenticação de usuários, painel do gestor, cadastro de colaboradores, criação de trilhas, jornada do colaborador e avaliação integrada ao banco de dados.

**Palavras-chave:** onboarding; sistema web; gestão de colaboradores; trilhas de aprendizagem; Projeto Integrador.

## 1. Introdução

A integração de novos colaboradores é um processo importante para que a pessoa recém-contratada compreenda a cultura, as ferramentas, os processos e as expectativas da empresa. Em muitos contextos, esse processo ainda depende de controles manuais, documentos dispersos e acompanhamento informal, o que dificulta a padronização e a análise do progresso.

Nesse cenário, o sistema NIVELA foi proposto como uma solução web para centralizar o onboarding corporativo. A plataforma tem como objetivo organizar trilhas de aprendizagem, módulos, conteúdos, avaliações e indicadores de progresso, permitindo que gestores acompanhem a evolução dos colaboradores e que os novos integrantes tenham uma jornada mais clara.

## 2. Objetivo

O objetivo geral do projeto é desenvolver uma solução web que permita estruturar o processo de integração de novos colaboradores de forma organizada, padronizada e acompanhável.

Os objetivos específicos são:

- Permitir o cadastro de usuários, áreas, cargos e colaboradores.
- Permitir a criação de trilhas de onboarding com módulos e conteúdos.
- Disponibilizar uma jornada visual para o colaborador acompanhar seu progresso.
- Permitir avaliações simples vinculadas às trilhas.
- Exibir indicadores básicos para apoio ao acompanhamento do gestor.

## 3. Metodologia

O desenvolvimento foi dividido em etapas. Inicialmente, foram definidos o problema, o público-alvo, os requisitos funcionais, os requisitos não funcionais e as regras de negócio. Em seguida, foram elaborados os diagramas de caso de uso, sequência e modelo entidade-relacionamento.

Após a modelagem, foi criada a estrutura do banco de dados MySQL e os dados iniciais de teste. O backend foi desenvolvido com Node.js e Express, utilizando a biblioteca MySQL2 para comunicação com o banco e bcryptjs para comparação de senhas criptografadas. O frontend foi implementado com HTML, CSS e JavaScript puros, mantendo uma estrutura simples e compatível com navegadores modernos.

Por fim, foram realizados testes manuais das rotas e telas principais, com geração de evidências visuais para comprovar o funcionamento do MVP.

## 4. Desenvolvimento

O sistema foi organizado em três camadas principais:

- **Frontend:** responsável pelas telas, interação do usuário e comunicação com a API.
- **Backend:** responsável pelas rotas REST, autenticação, validações e regras de persistência.
- **Banco de dados:** responsável por armazenar empresas, áreas, cargos, usuários, trilhas, módulos, conteúdos, avaliações e progresso.

As principais funcionalidades implementadas foram:

- Login com senha criptografada.
- Painel do gestor com métricas e tabela de colaboradores.
- Cadastro de colaboradores com seleção dinâmica de área e cargo.
- Criação de trilhas com múltiplos módulos.
- Cadastro de URL de material dentro dos módulos.
- Criação opcional de avaliação final com questões e alternativas.
- Home do colaborador com progresso real.
- Avaliação carregada dinamicamente a partir do banco de dados.

## 5. Resultados

Como resultado, foi obtido um MVP funcional do sistema NIVELA. O gestor consegue acessar o painel, consultar indicadores, cadastrar colaboradores e criar trilhas de aprendizagem. O colaborador consegue visualizar sua jornada, acompanhar seu progresso e acessar uma avaliação vinculada à trilha.

O projeto também conta com documentação técnica, scripts de banco de dados, coleção do Postman e evidências visuais das telas implementadas. Esses artefatos auxiliam na compreensão, execução e avaliação da solução.

## 6. Considerações Finais

O NIVELA demonstra como uma aplicação web pode apoiar a organização do onboarding corporativo, reduzindo a dispersão de informações e permitindo acompanhamento mais claro do progresso dos colaboradores. Embora o MVP tenha sido desenvolvido com escopo acadêmico, sua estrutura permite evoluções futuras, como relatórios avançados, envio de notificações, personalização de trilhas e uso de inteligência artificial para apoiar a criação e revisão de conteúdos.

## Referências

- Documentação oficial do Node.js.
- Documentação oficial do Express.
- Documentação oficial do MySQL.
- Materiais e orientações do Projeto Integrador.
