var instrumentoModel = require("../models/instrumentoModel")

function buscarInstrumento(req, res){

    instrumentoModel.buscarInstrumentos().then(function (resultado){
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

module.exports = {
    buscarInstrumento
}