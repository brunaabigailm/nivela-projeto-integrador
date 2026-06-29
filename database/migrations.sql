-- Migrações adicionais aplicadas após a versão inicial do banco (DDL/DML)
-- Para um banco novo: executar ddl.sql + dml.sql + migrations.sql nessa ordem.
-- Para um banco já existente: executar apenas este arquivo.

USE nivela_db;

-- Tabela de alternativas para as questões das avaliações
CREATE TABLE IF NOT EXISTS alternativa (
  id_alternativa INT AUTO_INCREMENT PRIMARY KEY,
  id_questao INT NOT NULL,
  texto TEXT NOT NULL,
  is_correta TINYINT(1) DEFAULT 0,
  FOREIGN KEY (id_questao) REFERENCES questao(id_questao)
);

-- Alternativas para as questões existentes do DML
INSERT INTO alternativa (id_questao, texto, is_correta) VALUES
(1, 'Organizar conteúdos e orientar o novo colaborador', 1),
(1, 'Apenas comunicar regras corporativas', 0),
(1, 'Avaliar o desempenho do colaborador', 0),
(1, 'Substituir o RH no processo de admissão', 0),
(3, 'Registrar corretamente as informações do atendimento', 1),
(3, 'Encerrar o atendimento o mais rápido possível', 0),
(3, 'Falar sem deixar o cliente responder', 0),
(3, 'Encaminhar todos os casos para o gerente', 0);

-- Impede que um colaborador seja registrado mais de uma vez na mesma trilha
ALTER TABLE progresso_trilha
  ADD CONSTRAINT uk_progresso_usuario_trilha UNIQUE (id_usuario, id_trilha);
