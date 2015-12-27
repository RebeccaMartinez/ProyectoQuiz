var models = require('../models/models.js');

var users =  {
	admin: {id:1, username:"admin", password:"1234"},
	rebecca: {id:2, username:"rebecca", password:"4321"}
};

//comprueba si el usuario está registrad en users.
//Si autenticación falla o hay error se ejecuta callback(error)

exports.autenticar = function(login, password, callback) {
	models.User.find({where: {username: login}}).then(function(user){
		if(user.password === password){
			console.log('uuuuuuuuuser:' + user.username);
			callback(null, user);
		}
		else {
			callback(new Error('La password es incorrecta'));
		}
	});
};

exports.newq = function(req, res){
		var user = models.User.build ( //Crea objeto quiz
			{ username: "Username", password: "Password"}
		);
	res.render('users/new', { user: user, errors:[]});
};

exports.create = function(req, res){
	var user = models.User.build(req.body.user);
	var err = models.User.build(req.body.user).validate();
	models.User.find({where: {username: "username"}}).then(function(){
		concole.log("usuuuuu existe yaaaaa");
		res.redirect('/quizes');
		//TODO: poner mensaje de erro. El usuario ya esxite!!!
	});

	if(err === null){
		user
		.save({ fields: ["username", "password"]})
		.then(function(){
			console.log("Usuuuu ya existe");
			res.redirect('/quizes');
		});
		console.log("Registrado exitosamente :" + user);
		//redireccionamos a incio
	}
	else {
		res.render('users/new', {user: user, errors: err});
	}
};

exports.newpass = function(req, res){
	var user=req.user;
	res.render('users/updatepass',{user:user, errors :[]});
};

exports.passw = function(req, res){
	req.user.password = req.body.user.password;
	//req.quiz.respuesta = req.body.quiz.respuesta;
	var err = models.User.build(req.body.user).validate();
	if(err === null){
		req.quiz
		.save({ fields: ["password"]})
		.then(function(){
			res.redirect('/quizes');
		});
		//redireccionamos a la lista de preguntas
	}
	else {
		res.render('quizes/edit', {quiz: quiz, errors: err});
	}
};
