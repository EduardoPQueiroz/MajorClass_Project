create database majorClass;
use majorClass;


-- ESTRUTURA ----------------------------------------------------------
create table professor(
	idProfessor int auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(30) not null,
    primary key(idProfessor)
)auto_increment=100;


create table aluno(
	idAluno int auto_increment,
    nome varchar(100) not null, 
    email varchar(100) not null,
    telefone varchar(15),
    sexo char(1) check (sexo in('M', 'F')),
    fkProfessor int not null,
    fkInstrumento int not null,
    primary key(idAluno),
    foreign key (fkProfessor) references professor(idProfessor),
    foreign key (fkInstrumento) references instrumento(idInstrumento)
);

alter table aluno add column dataCadastro date default (current_date());

create table instrumento(
	idInstrumento int auto_increment,
    nome varchar(50),
    tipoInstrumento varchar(10) check (tipoInstrumento in('CORDAS', 'TECLAS', 'PERCUSSAO', 'SOPRO')),
	primary key(idInstrumento)
);

insert into professor (nome, email, senha) values
('Carlos Silva', 'carlos@majorclass.com', '123456'),
('Mariana Souza', 'mariana@majorclass.com', '123456'),
('João Pereira', 'joao@majorclass.com', '123456');

create table aula(
	idAula int auto_increment,
    fkAluno int,
    dataAula date,
    horaAula time,
    presenca varchar(30) check (presenca in('PRESENTE', 'AUSENTE', 'FALTA JUSTIFICADA')),
    fkAulaAnterior int,
    fkInstrumento int,
    primary key(idAula, fkAluno)
)auto_increment=1000;

alter table aula add constraint foreign key (fkAluno) references aluno(idAluno);
alter table aula add constraint foreign key (fkAulaAnterior) references aula(idAula);
alter table aula add constraint foreign key (fkInstrumento) references instrumento(idInstrumento);

-- INSERTS -------------------------------------------------------------------------------------------------------

insert into professor (nome, email, telefone, senha) values
('Carlos Silva', 'carlos@majorclass.com', '11999990001', '123456'),
('Mariana Souza', 'mariana@majorclass.com', '11999990002', '123456'),
('João Pereira', 'joao@majorclass.com', '11999990003', '123456');

insert into instrumento (nome, tipoInstrumento) values
('Violão', 'CORDAS'),
('Guitarra', 'CORDAS'),
('Piano', 'TECLAS'),
('Teclado', 'TECLAS'),
('Bateria', 'PERCUSSAO'),
('Flauta', 'SOPRO');

insert into aluno (nome, email, telefone, sexo, fkProfessor, fkInstrumento) values
('Lucas Andrade', 'lucas@gmail.com', '11988880001', 'M', 100, 1),
('Ana Clara', 'ana@gmail.com', '11988880002', 'F', 100, 3),
('Pedro Henrique', 'pedro@gmail.com', '11988880003', 'M', 101, 2),
('Juliana Rocha', 'juliana@gmail.com', '11988880004', 'F', 101, 4),
('Rafael Lima', 'rafael@gmail.com', '11988880005', 'M', 102, 5);

insert into aluno(nome, email, telefone, sexo, fkProfessor, fkInstrumento, dataCadastro)
values('Ancelmo Sousa', 'ancelmo@gmail.com', '11988880006', 'M', 102, 5, '2026-03-28');

insert into aula (fkAluno, dataAula, horaAula, presenca, fkAulaAnterior) values
(1, '2026-04-01', '14:00:00', 'PRESENTE', null),
(1, '2026-04-08', '14:00:00', 'PRESENTE', 1000),
(2, '2026-04-02', '15:00:00', 'AUSENTE', null),
(2, '2026-04-09', '15:00:00', 'FALTA JUSTIFICADA', 1002),
(3, '2026-04-03', '16:00:00', 'PRESENTE', null),
(4, '2026-04-04', '17:00:00', 'PRESENTE', null),
(5, '2026-04-05', '18:00:00', 'AUSENTE', null);

select * from aula;

insert into aula(fkAluno, dataAula, horaAula, presenca, fkAulaAnterior) value
(1, '2026-04-15', '16:00:00', 'PRESENTE', 1001);

-- QUERYS -----------------------------------------------------------------------------------------------


-- TABELA ALUNOS ----------------------------------------------------------------------------



-- getQtdAlunosPorMes
select month(dataCadastro) as mes, count(idAluno) as novosAlunos from aluno group by mes order by mes; 

-- getAlunosByIdProfessor
select p.nome as Professor, a.nome as Aluno, i.nome as Instrumento from aluno a inner join 
professor p on a.fkProfessor = p.idProfessor inner join
instrumento i on a.fkInstrumento = i.idInstrumento
where p.idProfessor = 101;

-- getHistoricoAulasByAlunoId
select al.nome, au.dataAula as ultimaAula, ant.dataAula as aulaAnterior from aluno al
inner join aula au on au.fkAluno = al.idAluno
left join aula ant on au.fkAulaAnterior = ant.idAula
where al.idAluno = 1
order by au.dataAula desc;

-- TABELA AULAS ----------------------------------------------------------------------------

-- getAulasByIdAluno
select au.idAula, i.nome, al.nome, au.presenca from aula au 
inner join aluno al 
on au.fkAluno = al.idAluno
inner join instrumento i
on al.fkInstrumento = i.idInstrumento
where al.idAluno = 1;

-- getAulasByIdProfessor
select au.idAula, p.nome, al.nome, i.nome from aula au inner join
aluno al on au.fkAluno = al.idAluno inner join
professor p on al.fkProfessor = p.idProfessor inner join
instrumento i on al.fkInstrumento = i.idInstrumento
where p.idProfessor = 102;

-- getQTDfaltasMes
select month(dataAula) mes, count(presenca) as numeroFaltas from aula where presenca = 'AUSENTE' group by mes;

-- getQtdFaltasAlunoMes
select al.nome, month(au.dataAula) mes, count(presenca) as numeroFaltas from aula au 
inner join aluno al
on au.fkAluno = al.idAluno 
where presenca = 'AUSENTE' 
group by al.nome, mes;

-- getQtdFaltasAlunoGeral
select al.nome, count(presenca) as numeroFaltas from aula au 
inner join aluno al
on au.fkAluno = al.idAluno 
where presenca = 'AUSENTE' 
group by al.nome;

SET lc_time_names = 'pt_BR';
select DATE_FORMAT(dataAula, '%W') as diaSemana from aula;






