var models = require('../models/models.js');

var users =  {
	admin: {id:1, username:"admin", password:"1234"},
	rebecca: {id:2, username:"rebecca", password:"4321"}
};

//comprueba si el usuario está registrad en users.
//Si autenticación falla o hay error se ejecuta callback(error)

exports.autenticar = function(login, password, callback) {
	models.User.find(login).then(function(user){
		if(query.password === password){
			callback(null, req.body);
		}
		else {
			callback(new Error('La password es incorrecta'));
		}
	})
};

exports.newq = function(req, res){
		var user = models.User.build ( //Crea objeto quiz
			{ username: "Nombre", password: "Password"}
		);
	res.render('users/new', { user: user ,errors:[]});
};

exports.create = function(req, res){
	var user = models.User.build(req.body.user);
	var err = models.User.build(req.body.user).validate();
	if(err === null){
		user
		.save({ fields: ["nombre", "password"]})
		.then(function(){
			res.redirect('/');
		});
		//redireccionamos a incio
	}
	else {
		res.render('users/new', {user: user, errors: err});
	}

};