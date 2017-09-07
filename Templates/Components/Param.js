var Lingua = require('./../../Lingua');

//Accepts and array of objects
//that contain a key
var Param = function(params){
    this.params = params;
};

Param.prototype = {
    assemble:function(){
        var paramString = '';
        var self = this;
        $.each(this.params,function(){
           paramString = paramString +
               this.name + Lingua.colon + Lingua.space +
               this.value + Lingua.comma
        });
        return Lingua.openBrace + paramString + Lingua.closeBrace
    }
};

module.exports = Param;