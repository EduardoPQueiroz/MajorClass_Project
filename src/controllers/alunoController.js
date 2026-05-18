var alunoModel = require("../models/alunoModel")


//MÉTODOS GET
function getQtdNovosAlunosByMonth(req, res) {

    var idProfessor = req.params.idProfessor;

    alunoModel.getQtdNovosAlunosByIdProfessor(idProfessor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a quantidade de novos alunos por mês do professor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getQtdNovosAlunosUltimoMes(req, res) {

    var idProfessor = req.params.idProfessor;

    alunoModel.getQtdNovosAlunosUltimoMes(idProfessor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a quantidade de novos alunos por mês do professor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getTotalAlunosByIdProfessor(req, res) {
    var idProfessor = req.params.idProfessor;

    alunoModel.getTotalAlunosByIdProfessor(idProfessor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o total de alunos do professor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getAlunosByProfessor(req, res) {
    var idProfessor = req.params.idProfessor;

    alunoModel.buscarAlunosPorProfessor(idProfessor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o total de alunos do professor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getInstrumentoMaisAulas(req, res) {
    var idProfessor = req.params.idProfessor;

    alunoModel.getInstrumentoMaisAulas(idProfessor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o total de alunos do professor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarQtdAlunosPorInstrumento(req, res){
    var idProfessor = req.params.idProfessor;

    alunoModel.buscarQtdAlunosPorInstrumento(idProfessor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o total de alunos do professor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//MÉTODOS POST

function cadastrarAlunos(req, res){
    let nome = req.body.nomeServer
    let email = req.body.emailServer
    let telefone = req.body.telefoneServer
    let sexo = req.body.sexoServer
    let fkProfessor = req.body.fkProfessorServer
    let fkInstrumento = req.body.instrumentoServer

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("O email está indefinido!");
    } else if (telefone == undefined) {
        res.status(403).send("O telefone está indefinido!");
    } else if (sexo == undefined) {
        res.status(403).send("O sexo está indefinido!");
    } else if (fkProfessor == undefined) {
        res.status(403).send("O fkProfessor está indefinido!");
    } else if (fkInstrumento == undefined) {
        res.status(403).send("O fkInstrumento está indefinido!");
    }{
        alunoModel.cadastrarAlunos(nome, email, telefone, sexo, fkProfessor, fkInstrumento)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

//MÉTODOS PUT
function editarAluno(req, res){
    let email = req.body.emailServer
    let telefone = req.body.telefoneServer
    let instrumento = req.body.instrumentoServer
    let idAluno = req.params.idAluno

    alunoModel.editarAluno(email, telefone, instrumento, idAluno).then(resultado=>{
        res.json(resultado);
    }).catch(erro=>{
        console.log(erro)
        console.log('Houve um erro ao editar o aluno: ', erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
    })
}

// MÉTODOS DELETE
function removerAluno(req, res){
    var idAluno = req.params.idAluno;

    alunoModel.removerAluno(idAluno)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o aluno: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    getQtdNovosAlunosByMonth,
    getAlunosByProfessor,
    getQtdNovosAlunosUltimoMes,
    getTotalAlunosByIdProfessor,
    getInstrumentoMaisAulas,
    buscarQtdAlunosPorInstrumento,
    cadastrarAlunos,
    removerAluno,
    editarAluno
}