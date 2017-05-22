/**
 * Created by Whiitetesla  on 19-05-2017.
 */

var express = require('express');
var router = express.Router();

router.get('/Greetings', function (req, res) {
    res.render('gameInto');
});

router.get('/WinLose/:status', function (req, res) {
    res.render('win_lose', { status: (req.params.status) });
});

router.get('/restart_game', function (req, res) {
    res.render('restart_gameBttn');
});

module.exports = router;