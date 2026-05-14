var aulaModel = require("../models/aulaModel")

function buscarAulasPorProfessor(req, res){

    var idProfessor = req.params.idProfessor;

    aulaModel.buscarAulasPorProfessor(idProfessor).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as aulas do professor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAulaById(req, res){
    let idAula = req.params.idAula

    aulaModel.buscarAulaById(idAula).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar as aulas pelo ID.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrarAula(req, res){
    let fkAluno = req.body.fkAlunoServer
    let dataAula = req.body.dataAulaServer
    let horaAula = req.body.horaAulaServer

    aulaModel.cadastrarAula(fkAluno, dataAula, horaAula)
    .then(resultado=>{
        res.json(resultado)
    }).catch(error=>{
        console.log(error);
        console.log("Houve um erro ao realizar o post: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function removerAula(req, res){
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

function editarAula(req, res){
    let presenca = req.body.presencaServer
    let realizada = req.body.realizadaServer
    let idAula = req.params.idAula

    aulaModel.editarAula(presenca, realizada, idAula).then(response =>{
        res.json(response)
    }).catch(error=>{
        console.log(error);
        console.log("Houve um erro ao editar o aluno: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

module.exports = {
    buscarAulasPorProfessor,
    buscarAulaById,
    cadastrarAula,
    removerAula,
    editarAula
}