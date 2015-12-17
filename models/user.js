module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User',
		{
			username: {
				type: DataTypes.STRING,
				validate: { notEmpty : {msg:"* Falta poner el nombre de usuario!"}}
			},
			password:{
				type: DataTypes.STRING,
				validate: { notEmpty : {msg:"* Falta poner la contraseña!"},
				// isLongEnough: function(val){
				// 		if(val.length < 7){
				// 			throw new Error("IIntroduza una contraseña más larga")
				// 		}
				// 	}
				}

			}
		});
};
