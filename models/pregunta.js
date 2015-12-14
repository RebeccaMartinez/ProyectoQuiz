function Pregunta(preg){
  this.preg = preg;
  this.vista;
}

Pregunta.prototype.getTipo = function(){
  return this.vista;
}

Pregunta.prototype.getPreg = function(){
  return this.preg;
}

/*Pregunta.prototype.Tipo = function() {
  if(this instanceof PreguntaCorta){
    this.vista = "<input type='text' name='respuesta' placeholder='Responda aquí' autofocus=''>";
  }
  else {
    this.vista = "<textarea type='text' name='respuesta' rows='5' cols='50' placeholder='Responda aquí' autofocus=''></textarea>";
  }

}*/

module.exports = Pregunta;

