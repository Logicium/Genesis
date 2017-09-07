var Lingua = require('./../Lingua');

var Variable = function(params){
    this.name = params.name;
    this.value = params.value;
    this.string = this.setString();
};

Variable.prototype = {

    setParameter:function(p){
        this.parameters = p;
    },
    setName:function(n){
        this.name = n;
    },
    setBody:function(b){
        this.body = b;
    },
    setString:function(){
        return Lingua.variableType + Lingua.space +
            this.name + Lingua.space + Lingua.equals +
            this.value + Lingua.end;
    }
};
