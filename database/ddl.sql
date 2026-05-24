-- Projeto Integrador NIVELA
-- Script DDL: criação da estrutura inicial do banco de dados

CREATE DATABASE IF NOT EXISTS nivela_db;

USE nivela_db;

CREATE TABLE empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18),
    email VARCHAR(120),
    telefone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'ativo'
);

CREATE TABLE area (
    id_area INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE cargo (
    id_cargo INT AUTO_INCREMENT PRIMARY KEY,
    id_area INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    FOREIGN KEY (id_area) REFERENCES area(id_area)
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    id_area INT,
    id_cargo INT,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'ativo',
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY (id_area) REFERENCES area(id_area),
    FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo)
);

CREATE TABLE trilha (
    id_trilha INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    id_cargo INT,
    id_gestor INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'ativa',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo),
    FOREIGN KEY (id_gestor) REFERENCES usuario(id_usuario)
);

CREATE TABLE modulo (
    id_modulo INT AUTO_INCREMENT PRIMARY KEY,
    id_trilha INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    ordem INT,
    FOREIGN KEY (id_trilha) REFERENCES trilha(id_trilha)
);

CREATE TABLE conteudo (
    id_conteudo INT AUTO_INCREMENT PRIMARY KEY,
    id_modulo INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    tipo_conteudo VARCHAR(50),
    url_material VARCHAR(255),
    ordem INT,
    FOREIGN KEY (id_modulo) REFERENCES modulo(id_modulo)
);

CREATE TABLE avaliacao (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_trilha INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    nota_minima DECIMAL(5,2),
    FOREIGN KEY (id_trilha) REFERENCES trilha(id_trilha)
);

CREATE TABLE questao (
    id_questao INT AUTO_INCREMENT PRIMARY KEY,
    id_avaliacao INT NOT NULL,
    enunciado TEXT NOT NULL,
    tipo_questao VARCHAR(50),
    pontuacao DECIMAL(5,2),
    FOREIGN KEY (id_avaliacao) REFERENCES avaliacao(id_avaliacao)
);

CREATE TABLE resposta (
    id_resposta INT AUTO_INCREMENT PRIMARY KEY,
    id_questao INT NOT NULL,
    id_usuario INT NOT NULL,
    resposta TEXT NOT NULL,
    nota_obtida DECIMAL(5,2),
    data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_questao) REFERENCES questao(id_questao),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE progresso_trilha (
    id_progresso_trilha INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_trilha INT NOT NULL,
    percentual_conclusao DECIMAL(5,2) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'em andamento',
    data_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_conclusao DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_trilha) REFERENCES trilha(id_trilha)
);

CREATE TABLE progresso_conteudo (
    id_progresso_conteudo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_conteudo INT NOT NULL,
    status VARCHAR(30) DEFAULT 'pendente',
    data_visualizacao DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_conteudo) REFERENCES conteudo(id_conteudo)
);
