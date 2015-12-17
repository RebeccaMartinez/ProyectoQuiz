var users =  {
	admin: {id:1, username:"admin", password:"1234"},
	rebecca: {id:2, username:"rebecca", password:"4321"}
};

//comprueba si el usuario está registrad en users.
//Si autenticación falla o hay error se ejecuta callback(error)

exports.autenticar = function(login, password, callback) {
	if(user[login]){
		if(password === users[login].password){
			callback(null, users[login]);
		}
		else {
			callback(new Error('La password es incorrecta'));
		}
	}
	else {
		callback(new Error('El usuario no existe'));
	}
};