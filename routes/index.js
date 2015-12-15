var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Visualizar elementos de una colección de recursos
router.get('/quizes', quizController.index);
router.get('/quizes/quizId(\\d+)', quizController.show);
router.get('/quizes/quizId(\\d+)/answer', quizController.answer);

//router.get('/quizes/questions/:id', quizController.specificQuestion);

//router.get('/quizes/questions', quizController.questions);

module.exports = router;
