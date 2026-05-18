var express = require("express");
var router = express.Router();

var aulaController = require("../controllers/aulaController")

router.get("/getAulasByProfessor/:idProfessor", function (req, res) {
    aulaController.buscarAulasPorProfessor(req, res);
});

router.get("/buscarAulaById/:idAula", function(req, res){
    aulaController.buscarAulaById(req, res);
})

router.get("/buscarHistoricoAluno/:fkAluno", function(req, res){
    aulaController.buscarHistoricoAulas(req, res);
})

router.get("/buscarQtdAulasMes/:idProfessor", function(req, res){
    aulaController.buscarQtdAulasMes(req, res)
})

router.get("/buscarQtdAulasUltimoMes/:idProfessor", function(req, res){
    aulaController.buscarQtdAulasUltimoMes(req, res)
})

router.get("/buscarInstrumentoMaisAulas/:idProfessor", function(req, res){
    aulaController.buscarInstrumentoMaisAulas(req, res)
})

router.get("/buscarQtdFaltasMes/:idProfessor", function(req, res){
    aulaController.buscarQtdFaltasMes(req, res)
})


router.get("/buscarQtdFaltasUltimoMes/:idProfessor", function(req, res){
    aulaController.buscarQtdFaltasUltimoMes(req, res)
})

router.get("/buscarAlunoMaisFaltas/:idProfessor", function(req, res){
    aulaController.buscarAlunoMaisFaltas(req, res)
})

router.get("/buscarQtdAulasDiaSemana/:idProfessor", function(req, res){
    aulaController.buscarAulaDiaSemana(req, res)
})

router.get("/buscarDiaMaisAulas/:idProfessor", function(req, res){
    aulaController.buscarDiaMaisAulas(req, res)
})

router.get("/buscarDiaMenosAulas/:idProfessor", function(req, res){
    aulaController.buscarDiaMenosAulas(req, res)
})

router.get("/buscarTotalSemana/:idProfessor", function(req, res){
    aulaController.buscarTotalSemana(req, res)
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