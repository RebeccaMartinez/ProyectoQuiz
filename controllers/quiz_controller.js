var models = require('../models/models.js');

exports.load= function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe pregunta don el id es :'+ quizId));
			}
		}
	).catch(function(error){next(error);
	});
};

exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', { quizes: quizes });
	}).catch(function(error){next(error);
	});
};

//GET /quizes/:id --> este es el metodo question de antes.
exports.show = function(req, res) {
	models.Quiz.find(req.params.id).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz });
	});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.id).then(function(quiz){
		if(req.query.respuesta === req.quiz.respuesta) {
			res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Correcto' });
		} else {
			res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto' });
		}
	});
};




/*;
var quiz = new Quiz();
var current = quiz.randomQuestion();

exports.question = function(req,res) {
	current = quiz.randomQuestion();
	res.render('quizes/question', {pregunta: current.pregunta });
};
exports.answer = function(req, res) {
	var c = 'Incorrecto';
	if (current.respuesta(req.query.respuesta)) { c = 'Correcto'; }
	res.render('quizes/answer', {respuesta: c});
};

exports.questions = function(req,res) {
	var nPreg = quiz.numQuestions();
	var array = new Array(nPreg);
	for(var i=0; i<nPreg; i++) {
		array[i] = quiz.getQ(i);
	}
	res.render('quizes/questions', {prg: array});
};

exports.specificQuestion = function(req, res) {
	var id = req.params.id;
	var nPreg = quiz.numQuestions();
	if(id < 1 || id > nPreg){
		res.render('quizes/SpecificQuestion', {prg: "No existe esa pregunta."});
	}
	else if(isNaN(id) === true) {
		res.render('quizes/SpecificQuestion', {prg: "Error en la URL."});
	}
	else {
		current = quiz.q[id-1];
		res.render('quizes/question', {pregunta: current.pregunta});
	}
};*/
