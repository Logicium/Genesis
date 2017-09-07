var Lingua = require('./../Lingua');

var Function = function(params){

    if (typeof (params) == 'undefined'){
        params = {
            name:'emptyFunction',//Include naming system next
            parameter:' ',
            body:' '
        };
    }

    this.name = params.name;
    this.parameter = params.parameter; //Solid string
    this.body = params.body;
    this.string = this.setString();
    return this.string;
};

Function.prototype = {
    addParameter: function(p){
        this.parameters.push(p);
    },
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
        return Lingua.functionType + Lingua.space+this.name +
            Lingua.openParen + this.parameter +
            Lingua.closeParen + Lingua.openBrace+ this.body + Lingua.closeBrace;
    },
    protoForm: function(){
        return this.name + Lingua.colon + Lingua.functionType + Lingua.emptyParameters + Lingua.emptyBody;
    },
    constructorForm: function(){
        return Lingua.variableType + Lingua.space+ this.name + Lingua.equals +
            Lingua.functionType + Lingua.emptyParameters + Lingua.emptyBody + Lingua.end;
    },
    execute:function(params){
        return this.name + Lingua.openParen +
            params +
            Lingua.closeParen + Lingua.end;
    }
};

module.exports = Function;
