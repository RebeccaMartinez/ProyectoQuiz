var models = require('../models/models.js');

var users =  {
	admin: {id:1, username:"admin", password:"1234"},
	rebecca: {id:2, username:"rebecca", password:"4321"}
};

//comprueba si el usuario está registrad en users.
//Si autenticación falla o hay error se ejecuta callback(error)

exports.autenticar = function(login, password, callback) {
	models.User.find({where: {username: login}}).then(function(user){
		console.log('pass:' + user.password)
		if(user.password === password){
			console.log('uuuuuuuuuser:' + user.username);
			callback(null, user);
		}
		else {
			callback(new Error('La password es incorrecta'));
		}
	})
};

exports.newq = function(req, res){
		var user = models.User.build ( //Crea objeto quiz
			{ username: "Username", password: "Password"}
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
		console.log("Registrado exitosamente :" + user);
		//redireccionamos a incio
	}
	else {
		res.render('users/new', {user: user, errors: err});
		console.log("NO Registrado exitosamente :" + err.username);

	}

};