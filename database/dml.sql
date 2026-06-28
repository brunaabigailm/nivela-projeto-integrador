-- Projeto Integrador NIVELA
-- Script DML: inserção de dados iniciais para teste

USE nivela_db;

INSERT INTO empresa (nome, cnpj, email, telefone, status) VALUES
('Conecta Soluções Digitais Ltda.', '12.345.678/0001-90', 'contato@conecta.com', '(49) 3333-0000', 'ativo');

INSERT INTO area (id_empresa, nome, descricao) VALUES
(1, 'Tecnologia', 'Área responsável por desenvolvimento e suporte técnico.'),
(1, 'Atendimento', 'Área responsável pelo relacionamento com clientes.');

INSERT INTO cargo (id_area, nome, descricao) VALUES
(1, 'Desenvolvedor Júnior', 'Profissional em início de carreira na área de desenvolvimento.'),
(2, 'Analista de Suporte', 'Profissional responsável pelo atendimento e suporte aos usuários.');

-- Senhas armazenadas como hash bcrypt da string 'senha123'
INSERT INTO usuario (id_empresa, id_area, id_cargo, nome, email, senha, tipo_usuario, status) VALUES
(1, 1, 1, 'Marina Ribeiro', 'gestor@conecta.com', '$2a$10$NvdUTfk3H0XroAzaZIBTluS0q5g9AYY5R06MUhUh2s8.5w5wV.phe', 'gestor', 'ativo'),
(1, 1, 1, 'Ana Silva', 'ana.silva@conecta.com', '$2a$10$NvdUTfk3H0XroAzaZIBTluS0q5g9AYY5R06MUhUh2s8.5w5wV.phe', 'colaborador', 'ativo'),
(1, 2, 2, 'Carlos Souza', 'carlos.souza@conecta.com', '$2a$10$NvdUTfk3H0XroAzaZIBTluS0q5g9AYY5R06MUhUh2s8.5w5wV.phe', 'colaborador', 'ativo'),
(1, NULL, NULL, 'Administrador NIVELA', 'admin@nivela.com', '$2a$10$NvdUTfk3H0XroAzaZIBTluS0q5g9AYY5R06MUhUh2s8.5w5wV.phe', 'administrador', 'ativo');

INSERT INTO trilha (id_empresa, id_cargo, id_gestor, titulo, descricao, status) VALUES
(1, 1, 1, 'Integração para Desenvolvedores', 'Trilha de onboarding para novos colaboradores da área de tecnologia.', 'ativa'),
(1, 2, 1, 'Integração para Suporte', 'Trilha de onboarding para novos colaboradores da área de atendimento e suporte.', 'ativa');

INSERT INTO modulo (id_trilha, titulo, descricao, ordem) VALUES
(1, 'Boas-vindas e Cultura', 'Apresentação da empresa, valores e cultura organizacional.', 1),
(1, 'Ferramentas Internas', 'Apresentação das principais ferramentas utilizadas pela equipe.', 2),
(2, 'Atendimento ao Cliente', 'Conceitos básicos de atendimento e comunicação com clientes.', 1);

INSERT INTO conteudo (id_modulo, titulo, descricao, tipo_conteudo, url_material, ordem) VALUES
(1, 'Apresentação da Empresa', 'Material introdutório sobre a história e missão da empresa.', 'texto', 'https://exemplo.com/apresentacao', 1),
(1, 'Políticas Internas', 'Conteúdo sobre regras, processos e boas práticas internas.', 'pdf', 'https://exemplo.com/politicas', 2),
(2, 'Acesso às Ferramentas', 'Orientações sobre acesso aos sistemas internos.', 'video', 'https://exemplo.com/ferramentas', 1),
(3, 'Boas Práticas de Atendimento', 'Conteúdo sobre postura, linguagem e registro de atendimentos.', 'texto', 'https://exemplo.com/atendimento', 1);

INSERT INTO avaliacao (id_trilha, titulo, descricao, nota_minima) VALUES
(1, 'Avaliação de Integração', 'Avaliação sobre os conteúdos iniciais da trilha de tecnologia.', 7.00),
(2, 'Avaliação de Atendimento', 'Avaliação sobre os conteúdos iniciais da trilha de suporte.', 7.00);

INSERT INTO questao (id_avaliacao, enunciado, tipo_questao, pontuacao) VALUES
(1, 'Qual é o objetivo principal de uma trilha de onboarding?', 'multipla_escolha', 2.00),
(1, 'Por que é importante conhecer as ferramentas internas da empresa?', 'discursiva', 3.00),
(2, 'Qual é uma boa prática no atendimento ao cliente?', 'multipla_escolha', 2.00);

INSERT INTO resposta (id_questao, id_usuario, resposta, nota_obtida) VALUES
(1, 2, 'Organizar conteúdos e orientar o novo colaborador.', 2.00),
(2, 2, 'Porque facilita a adaptação e reduz dúvidas durante o trabalho.', 3.00),
(3, 3, 'Registrar corretamente as informações do atendimento.', 2.00);

INSERT INTO progresso_trilha (id_usuario, id_trilha, percentual_conclusao, status, data_inicio, data_conclusao) VALUES
(2, 1, 65.00, 'em andamento', CURRENT_TIMESTAMP, NULL),
(3, 2, 40.00, 'em andamento', CURRENT_TIMESTAMP, NULL);

INSERT INTO progresso_conteudo (id_usuario, id_conteudo, status, data_visualizacao) VALUES
(2, 1, 'concluido', CURRENT_TIMESTAMP),
(2, 2, 'concluido', CURRENT_TIMESTAMP),
(2, 3, 'pendente', NULL),
(3, 4, 'concluido', CURRENT_TIMESTAMP);
