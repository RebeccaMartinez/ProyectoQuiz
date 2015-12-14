var Pregunta = require('../models/pregunta.js');

function PreguntaLarga(preg){
  Pregunta.call(this, preg);
  this.vista = "<textarea type='text' name='respuesta' rows='5' cols='50' placeholder='Responda aquí' autofocus=''></textarea>";
}

PreguntaLarga.prototype = new Pregunta();
PreguntaLarga.prototype.constructor = PreguntaLarga;
module.exports = PreguntaLarga;