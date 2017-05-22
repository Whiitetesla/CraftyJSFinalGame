var express = require('express');
var router = express.Router();

/* GET highscore. */
router.get('/highscore', function (req, res) {
    var db = req.db;
    var collection = db.get('Highscore');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* * POST to addhighscore. */
router.post('/addhighscore', function (req, res) {
    var db = req.db;
    var collection = db.get('Highscore');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

/* * DELETE to deletescore. */
router.delete('/deletescore/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('Highscore');
    var userToDelete = req.params.id;
    collection.remove({'_id': userToDelete}, function (err) {
        res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
    });
});

router.get('/highscoreList', function (req, res) {
    res.render('highscoreList');
});

router.get('/addHighscore/:score', function (req, res) {
    res.render('addScore', { score: (req.params.score) } );
});


module.exports = router;


