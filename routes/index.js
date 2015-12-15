var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var pg = require('pg');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/', quizController.index);
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/quizes/questions/:id', quizController.specificQuestion);

router.get('/quizes/questions', quizController.questions);

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM Quizzes', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

module.exports = router;
