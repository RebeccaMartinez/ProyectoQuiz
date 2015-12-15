//var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{
			pregunta: {
				type: DataTypes.STRING,
				validate: { notEmpty : {msg:"* Falta poner la pregunta!"}}
			},
			respuesta:{
				type: DataTypes.STRING,
				validate: { notEmpty : {msg:"* Falta poner la respuesta!"}}

			}
		});
};
