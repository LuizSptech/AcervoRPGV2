CREATE DATABASE ACERVORPG_2;
drop database ACERVORPG_2;

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
    descricao varchar (255) not null,
    horario timestamp default current_timestamp,
    imagem varchar (150),
    fk_usuario int,
    foreign key (fk_usuario) references usuario(id)
);




insert into postagem (titulo, descricao, imagem) values
("Descanço do heroi", "Nesse final de Semana perdi meu personagem Paul numa aventura, depois de muitos anos de aventura meu personagem pode enfim descançar", "https://i.pinimg.com/736x/1a/7f/06/1a7f0660e53c27aefec40d0d56ea5347.jpg");

INSERT INTO tipo (nome, descricao) values 
('Protagonista', 'Você naturalmente assume liderança e conduz o grupo em momentos importantes. Suas decisões movem a história.');

INSERT INTO tipo (nome, descricao) values 
('Combeiro', 'Você adora explorar mecânicas, criar builds fortes e encontrar maneiras eficientes de vencer desafios.');

INSERT INTO tipo (nome, descricao) values 
('Advogado de Regras', 'Você valoriza consistência e domínio do sistema. Conhecer as regras faz parte da diversão');

INSERT INTO tipo (nome, descricao) values 
('Narrador / Ator', 'Você joga pela interpretação, narrativa e profundidade emocional dos personagens.');

INSERT INTO tipo (nome, descricao) values 
('Suporte', 'Você entende a dinâmica da mesa e ajuda o grupo a funcionar bem, mesmo sem buscar os holofotes.');


select * from postagem;
select * from tipo;

SELECT usuario.nome, postagem.titulo, postagem.imagem, postagem.descricao, postagem.horario, (select COUNT(idpostagem) FROM postagem) AS quantidade from postagem 
JOIN usuario ON postagem.fk_usuario = usuario.id 
order by horario DESC;




SELECT usuario.nome, quiz.fk_usuario, quiz.fk_tipo, tipo.nome from quiz 
join usuario on quiz.fk_usuario = '1'
join tipo on idTipo = 4;

