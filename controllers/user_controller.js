var models = require('../models/models.js');

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

exports.index = function(req, res) {
	models.User.findAll().then(function(users){
		res.render('users/index', { users: users ,errors:[]});
	}).catch(function(error){next(error);
	});
};

exports.show = function(req, res) {
	models.Quiz.findAll({
		where: {
			UserId: req.params.id2
		}
	}).then(function(quizes){
		console.log("paraaaaaaaaams.id" + req.params.id2);
		res.render('users/mostrar', { quizes: quizes ,errors:[] });
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
	models.User.find({where: {username: user["username"]}}).then(function(result){
		if(result != null){ //Si existe un usuario con ese nombre en la base de datos
			console.log("usuuuuu existe yaaaaa");
			res.render('users/new', {errors: "El usuario ya existe"});
		}
		else{ //Si no existe el usuario
			if(err === null){
				user
				.save({ fields: ["username", "password"]})
				.then(function(){
					res.redirect('/');
				});
				console.log("Registrado exitosamente :" + user);
				//redireccionamos a incio
			}
			else {
				res.render('users/new', {user: user, errors: err});
			}
		}
	});
};
