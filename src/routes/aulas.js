var express = require("express");
var router = express.Router();

var aulaController = require("../controllers/aulaController")

router.get("/getAulasByProfessor/:idProfessor", function (req, res) {
    aulaController.buscarAulasPorProfessor(req, res);
});

router.get("/buscarAulaById/:idAula", function(req, res){
    aulaController.buscarAulaById(req, res);
})

router.post("/cadastrarAula", function(req, res){
    aulaController.cadastrarAula(req, res)
})

router.delete("/removerAula/:idAula", function(req, res){
    aulaController.removerAula(req, res)
})

router.put('/editarAula/:idAula', function(req, res){
    aulaController.editarAula(req, res)
})

module.exports = router;