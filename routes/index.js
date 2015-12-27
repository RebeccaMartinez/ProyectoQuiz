var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');
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
router.get('/quizes/preguntas/new', sessionController.loginRequired, quizController.newq);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:id/edit', sessionController.loginRequired,quizController.edit);
router.put('/quizes/:id', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:id', sessionController.loginRequired, quizController.destroy);
router.get('/quizes/user/perfil', quizController.perfil);


//router.get('/quizes/questions/:id', quizController.specificQuestion);

//router.get('/quizes/questions', quizController.questions);

//Rutas de creacion de usuario
router.get('/signin', userController.newq);
router.post('/signin', userController.create);
router.get('/user/perfil/newpass', sessionController.loginRequired, userController.newpass);
router.put('/user/perfil/passw', sessionController.loginRequired, userController.passw);
//router.get('/quizes/user/perfil/nombre', userController.nombre);

module.exports = router;
