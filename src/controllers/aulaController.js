var aulaModel = require("../models/aulaModel")

function buscarAulasPorProfessor(req, res) {

    var idProfessor = req.params.idProfessor;

    aulaModel.buscarAulasPorProfessor(idProfessor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as aulas do professor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAulaById(req, res) {
    let idAula = req.params.idAula

    aulaModel.buscarAulaById(idAula).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as aulas pelo ID.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarHistoricoAulas(req, res) {
    let fkAluno = req.params.fkAluno
    aulaModel.buscarHistoricoAulas(fkAluno).then(resultado => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(error => {
        console.log(error);
        console.log("Houve um erro ao buscar as aulas pelo ID.", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function buscarQtdAulasMes(req, res){
    let idProfessor = req.params.idProfessor
    aulaModel.buscarQuantidadeAulasMes(idProfessor).then(resultado =>{
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(error=>{
        console.log(error);
        console.log("Houve um erro ao buscar as aulas pelo ID.", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function buscarQtdAulasUltimoMes(req, res){
    let idProfessor = req.params.idProfessor
    aulaModel.buscarQtdAulasUltimoMes(idProfessor).then(resultado =>{
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(error=>{
        console.log(error);
        console.log("Houve um erro ao buscar as aulas pelo ID.", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function buscarInstrumentoMaisAulas(req, res){
    let idProfessor = req.params.idProfessor
    aulaModel.buscarInstrumentoMaisAulas(idProfessor).then(resultado =>{
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(error=>{
        console.log(error);
        console.log("Houve um erro ao buscar as aulas pelo ID.", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function buscarQtdFaltasMes(req, res){
    let idProfessor = req.params.idProfessor
    aulaModel.buscarQtdFaltasMes(idProfessor).then(resultado =>{
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(error=>{
        console.log(error);
        console.log("Houve um erro ao buscar as aulas pelo ID.", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function buscarQtdFaltasUltimoMes(req, res){
    let idProfessor = req.params.idProfessor
    aulaModel.buscarQtdFaltasUltimoMes(idProfessor).then(resultado =>{
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(error=>{
        console.log(error);
        console.log("Houve um erro ao buscar as aulas pelo ID.", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function buscarAlunoMaisFaltas(req, res){
    let idProfessor = req.params.idProfessor
    aulaModel.buscarAlunoMaisFaltas(idProfessor).then(resultado =>{
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(error=>{
        console.log(error);
        console.log("Houve um erro ao buscar as aulas pelo ID.", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function cadastrarAula(req, res) {
    let fkAluno = req.body.fkAlunoServer
    let dataAula = req.body.dataAulaServer
    let horaAula = req.body.horaAulaServer

    aulaModel.cadastrarAula(fkAluno, dataAula, horaAula)
        .then(resultado => {
            res.json(resultado)
        }).catch(error => {
            console.log(error);
            console.log("Houve um erro ao realizar o post: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        })
}

function removerAula(req, res) {
    let idAula = req.params.idAula

    aulaModel.removerAula(idAula)
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

function editarAula(req, res) {
    let presenca = req.body.presencaServer
    let realizada = req.body.realizadaServer
    let idAula = req.params.idAula

    aulaModel.editarAula(presenca, realizada, idAula).then(response => {
        res.json(response)
    }).catch(error => {
        console.log(error);
        console.log("Houve um erro ao editar o aluno: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

module.exports = {
    buscarAulasPorProfessor,
    buscarAulaById,
    buscarHistoricoAulas,
    buscarQtdAulasMes,
    buscarQtdAulasUltimoMes,
    buscarInstrumentoMaisAulas,
    buscarQtdFaltasMes,
    buscarQtdFaltasUltimoMes,
    buscarAlunoMaisFaltas,
    cadastrarAula,
    removerAula,
    editarAula
}