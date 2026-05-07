var express = require("express");
var router = express.Router();

var instrumentoController = require("../controllers/instrumentoController")

router.get("/buscarInstrumentos", function (req, res) {
    instrumentoController.buscarInstrumento(req, res);
});

module.exports = router;