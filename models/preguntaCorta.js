var Pregunta = require('../models/pregunta.js');

function PreguntaCorta(preg){
  Pregunta.call(this, preg);
  this.vista = "<input type='text' name='respuesta' placeholder='Responda aquí' autofocus=''>";

}


PreguntaCorta.prototype = new Pregunta();
PreguntaCorta.prototype.constructor = PreguntaCorta;
module.exports = PreguntaCorta;
