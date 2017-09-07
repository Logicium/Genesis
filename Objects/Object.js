var Lingua = require('./../Lingua');
var Function = require('./Function');
var Oebject = function(params){

    params = {
        name: params.name || 'emptyObject',//Include naming system next
        parameter:params.parameter || ' ',
        body:params.body || ' '
    };

    this.name = params.name;
    this.constructor = new Function({'name':this.name}).constructorForm();
    this.constructors = [].push(this.constructor);
    this.constructorVariables = [];
    this.prototype = "";
    this.prototypes = [];
};

Oebject.prototype = {

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

        var prototype = this.name + Lingua.dot + Lingua.prototypeType + Lingua.equals + Lingua.openBrace+
                this.prototypes.toString() + Lingua.closeBrace+Lingua.end;

        this.string = this.constructor + Lingua.newLine + prototype;
        return this.string;
    },
    addFunction:function(functionString){
        this.prototypes.push(functionString);
    }
};

module.exports = Oebject;
