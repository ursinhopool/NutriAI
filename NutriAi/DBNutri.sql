CREATE DATABASE nutriia;
USE nutriia;

-- Tabela dos usuários cadastrados no formulário
CREATE TABLE info_pessoal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sexo VARCHAR(20) NOT NULL,
    altura DECIMAL(5,2) NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    idade INT NOT NULL,
    objetivo VARCHAR(255) NOT NULL,
    alergia VARCHAR(255),
    alimentosngostados VARCHAR(255),
    imc DECIMAL(5,2),
    percentual_gordura DECIMAL(5,2)
);

-- Tabela de registros diários
CREATE TABLE registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Kcal DECIMAL(6,2) NOT NULL,
    exercicios VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de nutricionistas
CREATE TABLE nutricionista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_nut VARCHAR(100) NOT NULL,
    sobre_nut TEXT NOT NULL,
    contato_nut VARCHAR(100) NOT NULL
);

-- Dietas geradas pela IA
CREATE TABLE dietas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gerada TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);