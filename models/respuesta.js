function Respuesta(res){
  this.res = res;
  if(typeof(this.res) === 'string' || typeof(this.res) === 'number') {
    return function(x){return x === this.res;};  
  }
  else if (this.res instanceof RegExp) {
    return function(x){return x.match(res);};
  }
  else {
    return res;
  }
}

module.exports = Respuesta;
