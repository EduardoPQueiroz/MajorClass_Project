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
                        where fkAluno = ${fkAluno} and au.realizada = 1;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarAulaById(idAula){
    let instrucaoSql = `select au.*, al.* from aula au join aluno al on au.fkAluno = al.idAluno where idAula = ${idAula}`
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarQuantidadeAulasMes(idProfessor){
    let instrucaoSql = `select count(*) as qtdAulas, monthname(dataAula) as mes from aula au join
                        aluno al on au.fkAluno = al.idAluno join professor p
                        on al.fkProfessor = p.idProfessor
                        where p.idProfessor = ${idProfessor}
                        group by mes;` 

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
    cadastrarAula,
    removerAula,
    editarAula
}