CREATE DATABASE ACERVORPG_2;

USE ACERVORPG_2;



CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100),
	email VARCHAR(100),
	senha VARCHAR(100)	
);

CREATE TABLE quiz (
	id INT PRIMARY KEY AUTO_INCREMENT,
	data_quiz timestamp default current_timestamp,
	pontuacao int,
	fk_usuario int,
    fk_tipo int,
    foreign key (fk_tipo) references tipo(idTipo),
    foreign key (fk_usuario) references usuario(id)
);

CREATE TABLE tipo (
	idTipo int primary key auto_increment,
    nome varchar(50),
    descricao varchar(200)
);

create table postagem (
	idpostagem INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(150) not null,
    descricao varchar (255),
    horario timestamp default current_timestamp,
    imagem varchar (150),
    fk_usuario int,
    foreign key (fk_usuario) references usuario(id)
);


SELECT usuario.nome, postagem.titulo, postagem.imagem, postagem.descricao, postagem.horario from postagem 
JOIN usuario ON postagem.fk_usuario = usuario.id 
order by horario;
