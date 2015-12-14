var Pregunta = require('../models/pregunta.js');
var ejs=  require('ejs');

function PSeleccionMultiple(preg, opciones){
  //Pregunta.call(this, preg[0]);
  //this.opciones = preg.slice(1,preg.length);
  Pregunta.call(this,preg);
  this.opciones = opciones;
  
  var self=this;
  ejs.renderFile('views/quizes/PSeleccionMultiple.ejs',{opciones: this.opciones},
  function(err,result){
    if(!err) {
      self.vista=result;
    }
  });
  /*this.vista = "";
  for(var i=0; i<this.opciones.length; i++){
    this.vista += "<input type='checkbox' name='respuesta[]' + value='" + this.opciones[i] +"'>" + this.opciones[i]+"<br>";
  }*/
}

PSeleccionMultiple.prototype = new Pregunta();
PSeleccionMultiple.prototype.constructor = PSeleccionMultiple;
module.exports = PSeleccionMultiple;
