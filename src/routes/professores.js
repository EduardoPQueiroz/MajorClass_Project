var express = require("express");
var router = express.Router();

var professorController = require("../controllers/professorController");

//Recebendo os dados do html e direcionando para a função cadastrar de professorController.js
router.post("/cadastrar", function (req, res) {
    professorController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    professorController.autenticar(req, res);
});

module.exports = router;