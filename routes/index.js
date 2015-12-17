var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var sessionController = require('../controllers/session_controller');
/* GET home page.  */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' ,errors:[]});
});

//Autoload de comando con quizId
router.param(':id',quizController.load);

//Definición de rutas de sesión
router.get('/login', sessionController.newq);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

//Visualizar elementos de una colección de recursos
router.get('/quizes', quizController.index);
router.get('/quizes/:id', quizController.show);
router.get('/quizes/:id/answer', quizController.answer);
router.get('/quizes/preguntas/new', quizController.newq);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:id/edit',quizController.edit);
router.put('/quizes/:id', quizController.update);
router.delete('/quizes/:id', quizController.destroy);

//router.get('/quizes/questions/:id', quizController.specificQuestion);

//router.get('/quizes/questions', quizController.questions);

module.exports = router;
