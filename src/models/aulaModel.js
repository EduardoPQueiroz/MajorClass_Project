var database = require("../database/config");

function buscarAulasPorProfessor(idProfessor) {

    var instrucaoSql = `select au.*, i.nome as nomeInstrumento, al.nome as nomeAluno from aula au 
                        inner join aluno al 
                        on au.fkAluno = al.idAluno
                        inner join instrumento i
                        on al.fkInstrumento = i.idInstrumento
                        where al.fkProfessor = ${idProfessor} and au.realizada = 0
                        order by au.dataAula
                        ;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHistoricoAulas(fkAluno){
    var instrucaoSql = `select au.dataAula, au.presenca, au.fkAluno, al.nome, i.nome as nomeInstrumento from aula au join aluno al 
                        on al.idAluno = au.fkAluno join
                        instrumento i on al.fkInstrumento = i.idInstrumento
                        where fkAluno = ${fkAluno} and au.realizada = 1
                        order by au.dataAula desc;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarAulaById(idAula){
    let instrucaoSql = `select au.*, al.* from aula au join aluno al on au.fkAluno = al.idAluno where idAula = ${idAula}`
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarQuantidadeAulasMes(idProfessor){
    let instrucaoSql = `select count(*) as qtdAulas, monthname(dataAula) as mes, month(dataAula) as numeroMes from aula au join
                        aluno al on au.fkAluno = al.idAluno join professor p
                        on al.fkProfessor = p.idProfessor
                        where p.idProfessor = ${idProfessor}
                        group by mes, numeroMes
                        order by numeroMes;` 

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)                        
}

function buscarQtdAulasUltimoMes(idProfessor){    
    let instrucaoSql = `select count(*) as qtdAulas, monthname(dataAula) as mes from aula au join
                        aluno al on au.fkAluno = al.idAluno join professor p
                        on al.fkProfessor = p.idProfessor
                        where p.idProfessor = ${idProfessor}
                        group by mes
                        having mes = monthname(now());` 

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarInstrumentoMaisAulas(idProfessor){
    let instrucaoSql = `select count(*) as qtdAulas, monthname(dataAula) as mes, i.nome as nomeInstrumento from aula au join
                        aluno al on au.fkAluno = al.idAluno join professor p
                        on al.fkProfessor = p.idProfessor join instrumento i
                        on al.fkInstrumento = i.idInstrumento
                        where p.idProfessor = ${idProfessor}
                        group by mes, nomeInstrumento
                        having mes = monthname(now())
                        order by qtdAulas desc
                        limit 1`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarInstrumentoMenosAulas(idProfessor){
    let instrucaoSql = `select count(*) as qtdAulas, monthname(dataAula) as mes, i.nome as nomeInstrumento from aula au join
                        aluno al on au.fkAluno = al.idAluno join professor p
                        on al.fkProfessor = p.idProfessor join instrumento i
                        on al.fkInstrumento = i.idInstrumento
                        where p.idProfessor = ${idProfessor}
                        group by mes, nomeInstrumento
                        having mes = monthname(now())
                        order by qtdAulas
                        limit 1`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarQtdFaltasMes(idProfessor){
    let instrucaoSql = `select monthname(dataAula) mes, count(presenca) as numeroFaltas, month(dataAula) as numeroMes from aula join aluno on
                        aula.fkAluno = aluno.idAluno join professor on
                        aluno.fkProfessor = professor.idProfessor
                        where presenca = 'AUSENTE' and professor.idProfessor = ${idProfessor}
                        group by mes, numeroMes
                        order by numeroMes;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarQtdFaltasUltimoMes(idProfessor){
    let instrucaoSql = `select monthname(dataAula) mes, count(presenca) as numeroFaltas from aula join aluno on
                        aula.fkAluno = aluno.idAluno join professor on
                        aluno.fkProfessor = professor.idProfessor
                        where presenca = 'AUSENTE' and professor.idProfessor = ${idProfessor}
                        group by mes
                        having mes = monthname(now());`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarAlunoMaisFaltas(idProfessor){
    let instrucaoSql = `select monthname(aula.dataAula) mes, count(aula.presenca) as numeroFaltas, aluno.nome as nomeAluno from aula join aluno on
                        aula.fkAluno = aluno.idAluno join professor on
                        aluno.fkProfessor = professor.idProfessor
                        where presenca = 'AUSENTE' and professor.idProfessor = ${idProfessor}
                        group by mes, nomeAluno
                        having mes = monthname(now())
                        order by numeroFaltas desc
                        limit 1;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarQtdAulasDiaSemana(idProfessor){
    let instrucaoSql = `select count(*) as qtdAulas, weekday(dataAula) as diaSemana, yearweek(dataAula, 1) as semana  from 
                        aula join aluno on
                        aula.fkAluno = aluno.idAluno join professor on
                        aluno.fkProfessor = professor.idProfessor
                        where idProfessor = ${idProfessor}
                        group by diaSemana, semana
                        having semana = yearweek(now(), 1)
                        order by diaSemana;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarDiaMaisAulas(idProfessor){
    let instrucaoSql = `select count(*) as qtdAulas, weekday(dataAula) as diaSemana, yearweek(dataAula, 1) as semana from 
                        aula join aluno on
                        aula.fkAluno = aluno.idAluno join professor on
                        aluno.fkProfessor = professor.idProfessor
                        where idProfessor = ${idProfessor}
                        group by diaSemana, semana
                        having semana = yearweek(now(), 1)
                        order by qtdAulas desc
                        limit 1;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarDiaMenosAulas(idProfessor){
    let instrucaoSql = `select count(*) as qtdAulas, weekday(dataAula) as diaSemana, yearweek(dataAula, 1) as semana from 
                        aula join aluno on
                        aula.fkAluno = aluno.idAluno join professor on
                        aluno.fkProfessor = professor.idProfessor
                        where idProfessor = ${idProfessor}
                        group by diaSemana, semana
                        having semana = yearweek(now(), 1)
                        order by qtdAulas
                        limit 1;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarTotalSemana(idProfessor){
    let instrucaoSql = `select count(*) as qtdAulas, yearweek(dataAula, 1) as semana from 
                        aula join aluno on
                        aula.fkAluno = aluno.idAluno join professor on
                        aluno.fkProfessor = professor.idProfessor
                        where idProfessor = ${idProfessor}
                        group by semana
                        having semana = yearweek(now(), 1);`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}



function cadastrarAula(fkAluno, dataAula, horaAula){
    let instrucaoSql = `insert into aula(fkAluno, dataAula, horaAula) values
                        (${fkAluno}, '${dataAula}', '${horaAula}:00')`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function removerAula(idAula){
    let instrucaoSql = `delete from aula where idAula = ${idAula}`
    console.log('Executando a instrução SQL: \n' + instrucaoSql)
    return database.executar(instrucaoSql)
}

function editarAula(presenca, realizada, idAula){
    let instrucaoSql = `update aula
                        set presenca = '${presenca}',
                        realizada = ${realizada}
                        where idAula = ${idAula}`

    console.log('Executando a instrução SQL: \n' + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
    buscarAulasPorProfessor,
    buscarAulaById,
    buscarHistoricoAulas,
    buscarQuantidadeAulasMes,
    buscarQtdAulasUltimoMes,
    buscarInstrumentoMaisAulas,
    buscarInstrumentoMenosAulas,
    buscarQtdFaltasMes,
    buscarQtdFaltasUltimoMes,
    buscarAlunoMaisFaltas,
    buscarQtdAulasDiaSemana,
    buscarDiaMaisAulas,
    buscarDiaMenosAulas,
    buscarTotalSemana,
    cadastrarAula,
    removerAula,
    editarAula
}