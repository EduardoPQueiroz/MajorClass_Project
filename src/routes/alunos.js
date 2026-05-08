var express = require("express");
var router = express.Router();

var alunoController = require("../controllers/alunoController")

router.get("/getQtdAlunosByIdProfessor/:idProfessor", function (req, res) {
    alunoController.getQtdNovosAlunosByMonth(req, res)
});

router.get("/getAlunos/:idProfessor", function(req, res){
    alunoController.getAlunosByProfessor(req, res);
});

router.get("/getQtdAlunosUltimoMes/:idProfessor", function (req, res) {
    alunoController.getQtdNovosAlunosUltimoMes(req, res)
});

router.get("/getTotalAlunosByIdProfessor/:idProfessor", function(req, res){
    alunoController.getTotalAlunosByIdProfessor(req, res)
})

router.get("/getInstrumentoMaisAulas/:idProfessor", function(req, res){
    alunoController.getInstrumentoMaisAulas(req, res)
})

router.post('/cadastrarAluno', function(req, res){
    alunoController.cadastrarAlunos(req, res)
})

module.exports = router;