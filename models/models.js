var path = require('path');

var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)\:(.*)\/(.*)/);
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
var sequelize = new Sequelize(BD_name, user, pwd,
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
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; //exportar definición de la tabla Quiz (models/quiz.js)

//sequelize.sync() crea e inicia tabla de preguntas en la base de datos
sequelize.sync().success(function() {
	Quiz.count().success(function (count) {
		if(count === 0) {
			Quiz.create({pregunta: 'Capital de Italia',
						respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos inicializada');});
		}
	});

});
