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

create table instrumento(
	idInstrumento int auto_increment,
    nome varchar(50),
    tipoInstrumento varchar(10) check (tipoInstrumento in('CORDAS', 'TECLAS', 'PERCUSSAO', 'SOPRO')),
	primary key(idInstrumento)
);

create table aluno(
	idAluno int auto_increment,
    nome varchar(100) not null, 
    email varchar(100) not null,
    telefone varchar(15),
    sexo char(1) check (sexo in('M', 'F')),
    dataCadastro date default(current_date()),
    fkProfessor int not null,
    fkInstrumento int not null,
    primary key(idAluno),
    foreign key (fkProfessor) references professor(idProfessor),
    foreign key (fkInstrumento) references instrumento(idInstrumento)
);

create table aula(
	idAula int auto_increment,
    dataAula date,
    horaAula time,
    presenca varchar(30) check (presenca in('PRESENTE', 'AUSENTE', 'FALTA JUSTIFICADA')),
    realizada tinyint default(0),
    fkAluno int,
    fkAulaAnterior int,
    primary key(idAula)
)auto_increment=1000;




alter table aula add constraint foreign key (fkAluno) references aluno(idAluno);
alter table aula add constraint foreign key (fkAulaAnterior) references aula(idAula);

-- INSERTS -------------------------------------------------------------------------------------------------------

insert into professor (nome, email, senha) values
('Rubens Silva', 'rubens@majorclass.com', '123456'),
('Melina Souza', 'melina@majorclass.com', '123456'),
('Juliana Pereira', 'juliana@majorclass.com', '123456');


insert into instrumento (nome, tipoInstrumento) values
('Violão', 'CORDAS'),
('Guitarra', 'CORDAS'),
('Piano', 'TECLAS'),
('Teclado', 'TECLAS'),
('Bateria', 'PERCUSSAO'),
('Flauta', 'SOPRO');

insert into aluno (nome, email, telefone, sexo, fkProfessor, fkInstrumento) values
('Matheus Vizzas', 'matheus@gmail.com', '11988880001', 'M', 100, 1),
('Rafael Santanas', 'rafael@gmail.com', '11988880002', 'F', 100, 3),
('Ancelmo Sousas', 'ancelmo@gmail.com', '11988880003', 'M', 101, 2),
('Gabriel Carreira', 'gabriel@gmail.com', '11988880004', 'F', 101, 4),
('Arthur Pedroso', 'arthur@gmail.com', '11988880005', 'M', 102, 5);



-- INSERTS DE ALUNOS COM DATAS DE CADASTRO DISTINTAS
insert into aluno (nome, email, telefone, sexo, fkProfessor, fkInstrumento, dataCadastro) values
('Vinicius Teixeira', 'vinicius.teixeira@gmail.com', '11987650016', 'M', 103, 1, '2025-05-12'),
('Mariana Lopes', 'mariana.lopes@gmail.com', '11987650017', 'F', 104, 2, '2025-05-14'),
('Felipe Andrade', 'felipe.andrade@gmail.com', '11987650018', 'M', 105, 3, '2025-05-16'),
('Isabela Rocha', 'isabela.rocha@gmail.com', '11987650019', 'F', 100, 4, '2025-05-18'),
('Leonardo Castro', 'leonardo.castro@gmail.com', '11987650020', 'M', 101, 5, '2025-05-20'),
('Natália Moreira', 'natalia.moreira@gmail.com', '11987650021', 'F', 102, 1, '2025-05-22'),
('Eduardo Pereira', 'eduardo.pereira@gmail.com', '11987650022', 'M', 103, 2, '2025-05-24'),
('Carolina Batista', 'carolina.batista@gmail.com', '11987650023', 'F', 104, 3, '2025-05-26'),
('Henrique Moraes', 'henrique.moraes@gmail.com', '11987650024', 'M', 105, 4, '2025-05-28'),
('Aline Cardoso', 'aline.cardoso@gmail.com', '11987650025', 'F', 100, 5, '2025-06-01'),
('João Victor Silva', 'joaovictor.silva@gmail.com', '11987650026', 'M', 101, 1, '2025-06-03'),
('Tatiane Freitas', 'tatiane.freitas@gmail.com', '11987650027', 'F', 102, 2, '2025-06-05'),
('Murilo Campos', 'murilo.campos@gmail.com', '11987650028', 'M', 103, 3, '2025-06-07'),
('Priscila Araujo', 'priscila.araujo@gmail.com', '11987650029', 'F', 104, 4, '2025-06-09'),
('Caio Fernandes', 'caio.fernandes@gmail.com', '11987650030', 'M', 105, 5, '2025-06-11'),
('Vanessa Melo', 'vanessa.melo@gmail.com', '11987650031', 'F', 100, 1, '2025-06-13'),
('Ruan Carvalho', 'ruan.carvalho@gmail.com', '11987650032', 'M', 101, 2, '2025-06-15'),
('Débora Reis', 'debora.reis@gmail.com', '11987650033', 'F', 102, 3, '2025-06-17'),
('Samuel Barbosa', 'samuel.barbosa@gmail.com', '11987650034', 'M', 103, 4, '2025-06-19'),
('Larissa Monteiro', 'larissa.monteiro@gmail.com', '11987650035', 'F', 104, 5, '2025-06-21');


insert into aluno (nome, email, telefone, sexo, fkProfessor, fkInstrumento, dataCadastro) values
('Lucas Almeida', 'lucas.almeida@gmail.com', '11987650001', 'M', 100, 1, '2025-01-15'),
('Fernanda Souza', 'fernanda.souza@gmail.com', '11987650002', 'F', 101, 2, '2025-01-20'),
('Carlos Henrique', 'carlos.henrique@gmail.com', '11987650003', 'M', 102, 3, '2025-02-03'),
('Juliana Martins', 'juliana.martins@gmail.com', '11987650004', 'F', 103, 4, '2025-02-10'),
('Bruno Oliveira', 'bruno.oliveira@gmail.com', '11987650005', 'M', 104, 5, '2025-02-18'),
('Amanda Ribeiro', 'amanda.ribeiro@gmail.com', '11987650006', 'F', 105, 1, '2025-03-01'),
('Thiago Costa', 'thiago.costa@gmail.com', '11987650007', 'M', 100, 2, '2025-03-05'),
('Larissa Gomes', 'larissa.gomes@gmail.com', '11987650008', 'F', 101, 3, '2025-03-12'),
('Pedro Santos', 'pedro.santos@gmail.com', '11987650009', 'M', 102, 4, '2025-03-20'),
('Camila Ferreira', 'camila.ferreira@gmail.com', '11987650010', 'F', 103, 5, '2025-04-02'),
('Diego Rodrigues', 'diego.rodrigues@gmail.com', '11987650011', 'M', 104, 1, '2025-04-08'),
('Beatriz Lima', 'beatriz.lima@gmail.com', '11987650012', 'F', 105, 2, '2025-04-15'),
('Renato Barros', 'renato.barros@gmail.com', '11987650013', 'M', 100, 3, '2025-04-22'),
('Patricia Mendes', 'patricia.mendes@gmail.com', '11987650014', 'F', 101, 4, '2025-05-01'),
('Gustavo Nunes', 'gustavo.nunes@gmail.com', '11987650015', 'M', 102, 5, '2025-05-10');

insert into aula (fkAluno, dataAula, horaAula, presenca, fkAulaAnterior) values
(1, '2026-04-01', '14:00:00', 'PRESENTE', null),
(1, '2026-04-08', '14:00:00', 'PRESENTE', 1000),
(2, '2026-04-02', '15:00:00', 'AUSENTE', null),
(2, '2026-04-09', '15:00:00', 'FALTA JUSTIFICADA', 1002),
(3, '2026-04-03', '16:00:00', 'PRESENTE', null),
(4, '2026-04-04', '17:00:00', 'PRESENTE', null),
(5, '2026-04-05', '18:00:00', 'AUSENTE', null);

-- QUERYS -----------------------------------------------------------------------------------------------
use majorclass;

select * from aluno;

-- TABELA ALUNOS ----------------------------------------------------------------------------

use majorclass;
delete from aluno where idAluno = 15;

use majorclass;

select au.dataAula, au.presenca, au.fkAluno, al.nome, i.nome from aula au join aluno al 
on al.idAluno = au.fkAluno join
instrumento i on al.fkInstrumento = i.idInstrumento
where fkAluno = 44;

select * from aula;

select au.*, al.* from aula au join aluno al on au.fkAluno = al.idAluno where idAula = 1005;

-- getTotalAlunosByProfessor
select count(*) as totalAlunos from aluno where fkProfessor = 100;

-- getNovosAlunosUltimoMes
select monthname(dataCadastro) as mes, count(idAluno) as novosAlunos
    from aluno 
    where fkProfessor = 101
    group by mes 
    having mes = monthname(now())
    order by mes; 

-- getQtdAlunosPorMes
select month(dataCadastro) as numeroMes, monthname(dataCadastro) as nomeMes, count(idAluno) as novosAlunos
    from aluno 
    where fkProfessor = 101
    group by nomeMes, numeroMes order by numeroMes; 
    
-- getInstrumentoByProfessor
select count(fkInstrumento) as qtdAulasInstrumento, i.nome as nomeInstrumento
from aluno al inner join instrumento i
on al.fkInstrumento = i.idInstrumento
where al.fkProfessor = 103
group by nomeInstrumento
order by qtdAulasInstrumento desc
limit 1;

select * from professor;


-- getAlunosByIdProfessor
select a.*, i.nome as Instrumento, au.* from aluno a inner join
instrumento i on a.fkInstrumento = i.idInstrumento inner join
aula au on au.fkAluno = a.idAluno
where a.fkProfessor = 100;

use majorclass;

SELECT * FROM aluno a WHERE fkProfessor = 100;

-- getHistoricoAulasByAlunoId
select al.nome, au.dataAula as ultimaAula, ant.dataAula as aulaAnterior from aluno al
inner join aula au on au.fkAluno = al.idAluno
left join aula ant on au.fkAulaAnterior = ant.idAula
where al.idAluno = 1
order by au.dataAula desc;

-- TABELA AULAS ----------------------------------------------------------------------------

-- getAulasByIdAluno
select au.*, i.nome as nomeInstrumento, al.nome as nomeAluno from aula au 
inner join aluno al 
on au.fkAluno = al.idAluno
inner join instrumento i
on al.fkInstrumento = i.idInstrumento
where al.fkProfessor = 100;

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

update aluno set email = 'email@gmail.com', 
						telefone = '11987654321', 
                        fkInstrumento = 3 
                        where idAluno = 6;






