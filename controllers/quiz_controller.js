var models = require('../models/models.js');

exports.load= function(req,res,next,quizId) {
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
		res.render('quizes/index', { quizes: quizes ,errors:[]});
	}).catch(function(error){next(error);
	});
};

//GET /quizes/:id --> este es el metodo question de antes.
exports.show = function(req, res) {
	models.Quiz.find(req.params.id).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz ,errors:[] });
	});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.id).then(function(quiz){
		if(req.query.respuesta === req.quiz.respuesta) {
			res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Correcto' ,errors:[]});
		} else {
			res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto' ,errors:[]});
		}
	});
};

exports.newq = function(req, res) {
	var quiz = models.Quiz.build ( //Crea objeto quiz
			{ pregunta: "Pregunta", respuesta: "Respuesta", UserId: "UserId"}
		);
	res.render('quizes/new', { quiz: quiz ,errors:[]});
};

//POST /quizes/create

exports.create = function(req, res) {
	/*models.Quiz.find({where:{pregunta:'prueba4'}})
	.then(function(valor){
		console.log("asdasdasdasdasdasd  :"+valor.UserId);
	});*/
	var quiz = models.Quiz.build(req.body.quiz);
	// console.log("IIIIIIIIIIIID :" + prueba);
	var err = models.Quiz.build(req.body.quiz).validate();
	console.log('quiiiiz' + quiz.pregunta);
	console.log('iiiiiiiiiiiiiiiiiid' + quiz.UserId);
	if(err === null){
		quiz
		.save({ fields: ["pregunta", "respuesta", "UserId"]})
		.then(function(){
			res.redirect('/quizes');
		});
		//redireccionamos a la lista de preguntas
	}
	else {
		res.render('quizes/new', {quiz: quiz, errors: err});
	}

};


exports.edit = function(req,res){
	var quiz=req.quiz;
	res.render('quizes/edit',{quiz:quiz, errors :[]});
};

exports.update = function(req,res){

	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	var err = models.Quiz.build(req.body.quiz).validate();
	if(err === null){
		req.quiz
		.save({ fields: ["pregunta", "respuesta"]})
		.then(function(){
			res.redirect('/quizes');
		});
		//redireccionamos a la lista de preguntas
	}
	else {
		res.render('quizes/edit', {quiz: quiz, errors: err});
	}
};

exports.destroy = function(req, res){
	req.quiz.destroy().then( function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error);});
};
