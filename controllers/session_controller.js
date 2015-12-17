// MW de autorizacion de accesos http restringidos
exports.loginRequired = function(req,res,next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
};


//Get /login -- Formulario de login
exports.newq = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

//POST /login -- Crear la sesión
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error){
			console.log(error);
			req.session.errors = [{"message": 'Se ha producido un error:' + error}];
			res.redirect("/login");
			return;
		}
		//Crear req.session.user y guarda campos id y username
		//La sesión se define por la existencia de: req.session.user
		req.session.user = {if:user.id, username: user.username};
		res.redirect('/'); //redirección a path anterior a login
	});

};

//DELETE /logout -- Destruir sesion
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};
