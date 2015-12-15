var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page.  */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comando con quizId
router.param(':id',quizController.load);

//Visualizar elementos de una colección de recursos
router.get('/quizes', quizController.index);
router.get('/quizes/:id', quizController.show);
router.get('/quizes/:id/answer', quizController.answer);

//router.get('/quizes/questions/:id', quizController.specificQuestion);

//router.get('/quizes/questions', quizController.questions);

module.exports = router;
