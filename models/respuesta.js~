function Respuesta(res){
  this.res = res;
  if(typeof(this.res) === 'string' || typeof(this.res) === 'number') {
    return function(x){return x === this.res;};  
  }
  else if (this.res instanceof RegExp) {
    return function(x){return x.match(res);};
  }
  else if(this.res instanceof Array){
    return function(x){
      if(res.length != x.length) {
	return false;
      }
      var opc = true;
      for(var i=0; i<res.length; i++){
	if(res[i] != x[i]) {
	  opc = false;
	}
      }
      return opc;
  };
}
  else {
    return res;
  }
}

module.exports = Respuesta;
