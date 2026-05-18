var database = require("../database/config");


//MÉTODOS GET
function buscarAlunosPorProfessor(idProfessor) {

    var instrucaoSql = `select a.*, i.nome as instrumento from aluno a inner join
                        instrumento i on a.fkInstrumento = i.idInstrumento 
                        where a.fkProfessor = ${idProfessor};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getQtdNovosAlunosByIdProfessor(idProfessor) {
    var instrucaoSql = `select month(dataCadastro) as numeroMes, monthname(dataCadastro) as nomeMes, count(idAluno) as novosAlunos 
    from aluno 
    where fkProfessor = ${idProfessor}
    group by nomeMes, numeroMes order by numeroMes;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getQtdNovosAlunosUltimoMes(idProfessor) {
    var instrucaoSql = `select monthname(dataCadastro) as mes, count(idAluno) as novosAlunos 
    from aluno 
    where fkProfessor = ${idProfessor}
    group by mes 
    having mes = monthname(now())
    order by mes;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function getTotalAlunosByIdProfessor(idProfessor){
    var instrucaoSql = `select count(*) as totalAlunos from aluno where fkProfessor = ${idProfessor};`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getInstrumentoMaisAulas(idProfessor){
    var instrucaoSql = `select count(fkInstrumento) as qtdAulasInstrumento, i.nome as nomeInstrumento
                        from aluno al inner join instrumento i
                        on al.fkInstrumento = i.idInstrumento
                        where al.fkProfessor = ${idProfessor}
                        group by nomeInstrumento
                        order by qtdAulasInstrumento desc
                        limit 1;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarQtdAlunosPorInstrumento(idProfessor){
    instrucaoSql = `select count(fkInstrumento) as qtdAulasInstrumento, i.nome as nomeInstrumento
                    from aluno al inner join instrumento i
                    on al.fkInstrumento = i.idInstrumento
                    where al.fkProfessor = 103
                    group by nomeInstrumento;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

//MÉTODOS POST

function cadastrarAlunos(nome, email, telefone, sexo, fkProfessor, fkInstrumento) {
    var instrucaoSql = `INSERT INTO aluno (nome, email, telefone, sexo, fkProfessor, fkInstrumento) VALUES ('${nome}', '${email}', '${telefone}', '${sexo}', ${fkProfessor}, ${fkInstrumento})`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//MÉTODOS PUT
function editarAluno(email, telefone, fkInstrumento, idAluno){
    var instrucaoSql = `update aluno set email = '${email}', 
                        telefone = '${telefone}', 
                        fkInstrumento = ${fkInstrumento} 
                        where idAluno = ${idAluno}`
    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql)
}

// MÉTODOS DELETE
function removerAluno(idAluno){
    var instrucaoSql = `delete from aluno where idAluno = ${idAluno}`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql) 
}



module.exports = {
    buscarAlunosPorProfessor,
    getQtdNovosAlunosByIdProfessor,
    getQtdNovosAlunosUltimoMes,
    getTotalAlunosByIdProfessor,
    getInstrumentoMaisAulas,
    buscarQtdAlunosPorInstrumento,
    cadastrarAlunos,
    removerAluno,
    editarAluno
}
