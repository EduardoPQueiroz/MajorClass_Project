var express = require("express");
var router = express.Router();

var aulaController = require("../controllers/aulaController")

router.get("/getAulasByProfessor/:idProfessor", function (req, res) {
    aulaController.buscarAulasPorProfessor(req, res);
});

module.exports = router;