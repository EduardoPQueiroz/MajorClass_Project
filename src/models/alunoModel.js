var database = require("../database/config");

function buscarAlunosPorProfessor(idProfessor) {

    var instrucaoSql = `select a.*, i.nome as instrumento, au.* from aluno a inner join
                        instrumento i on a.fkInstrumento = i.idInstrumento inner join
                        aula au on au.fkAluno = a.idAluno
                        where a.fkProfessor = ${idProfessor};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarAlunos(nome, email, telefone, sexo, fkProfessor, fkInstrumento) {

    var instrucaoSql = `INSERT INTO aluno (nome, email, telefone, sexo, fkProfessor, fkInstrumento) VALUES (${nome}, ${email}, ${telefone}, ${sexo}, ${fkProfessor}, ${fkInstrumento})`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getQtdNovosAlunosByIdProfessor(idProfessor) {
    var instrucaoSql = `select monthname(dataCadastro) as mes, count(idAluno) as novosAlunos, p.nome 
    from aluno 
    where fkProfessor = ${idProfessor}
    group by mes order by mes;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarAlunosPorProfessor,
    getQtdNovosAlunosByIdProfessor,
    cadastrarAlunos
}
