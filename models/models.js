var path = require('path');

var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name=(url[6]||null);
var user=(url[2]||null);
var pwd=(url[3]||null);
var protocol=(url[1]||null);
var dialect=(url[1]||null);
var port=(url[5]||null);
var host=(url[4]||null);
var storage =process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');


//Usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
		{dialect: protocol,
		protocol: protocol,
		port : port,
		host:host,
		storage: storage,
		omitNull:true
		}
	);

//Importar la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var user_path = path.join(__dirname,'user');
var Quiz = sequelize.import(quiz_path);
var User = sequelize.import(user_path);

//Relaciones de tablas
User.hasMany(Quiz);
Quiz.belongsTo(User);

exports.Quiz = Quiz; //exportar definición de la tabla Quiz (models/quiz.js)
exports.User = User;
exports.Sequelize = sequelize;

//sequelize.sync() crea e inicia tabla de preguntas en la base de datos
sequelize.sync().then(function() {
	Quiz.count().then(function (count) {
		if(count === 0) {
			Quiz.create({pregunta: 'Capital de Italia',
						respuesta: 'Roma'
					});
			Quiz.create({pregunta: 'Capital de Portugal',
						respuesta: 'Lisboa'
			})
			.then(function(){console.log('Base de datos inicializada');});
		}
	});
	User.count().then(function (count) {
		if(count === 0) {
			User.create({username: 'admin',
						password: 'admin'
					})
			.then(function(){console.log('Creado el admin');});
		}
	});

});
