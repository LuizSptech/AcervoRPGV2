var express = require("express");
var router = express.Router();

var feedController = require("../controllers/feedController");


router.post("/postar", function (req, res) {
    //função a ser chamada quando um post for realizado
    feedController.postar(req, res);
});

router.get("/scroll", function (req, res) {
    //função a ser chamada quando o feed for carregado
    feedController.scroll(req,res);
});

module.exports = router;

