var express = require("express");
var router = express.Router();

var quizzController = require("../controllers/quizzController");


router.post("/guardar", function (req, res) {
    //função a ser chamada quando um quiz for realizado
    quizzController.guardar(req, res);
});

router.get("/puxar", function (req, res) {
    //função a ser chamada quando o dash for carregado
    quizzController.scroll(req,res);
});

module.exports = router;

