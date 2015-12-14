var Pregunta = require('../models/pregunta.js');
var ejs=  require('ejs');

function PSeleccionSimple(preg, opciones){
  Pregunta.call(this, preg);
  this.opciones = opciones;
  
  var self=this;
   
  ejs.renderFile('views/quizes/PSeleccionSimple.ejs',{opciones: this.opciones},
  function(err,result){
    if(!err) {
      self.vista=result;
    }
  });
}

PSeleccionSimple.prototype = new Pregunta();
PSeleccionSimple.prototype.constructor = PSeleccionSimple;
module.exports = PSeleccionSimple;



