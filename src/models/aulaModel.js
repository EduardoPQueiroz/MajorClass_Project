var database = require("../database/config");

function buscarAulasPorProfessor(idProfessor) {

    var instrucaoSql = `select au.*, i.nome as nomeInstrumento, al.nome as nomeAluno from aula au 
                        inner join aluno al 
                        on au.fkAluno = al.idAluno
                        inner join instrumento i
                        on al.fkInstrumento = i.idInstrumento
                        where al.fkProfessor = ${idProfessor}
                        order by au.dataAula
                        ;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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

module.exports = {
    buscarAulasPorProfessor,
    cadastrarAula,
    removerAula,
}