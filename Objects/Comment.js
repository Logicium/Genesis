var Lingua = require('./../Lingua');

var File = function(params){
    this.name = params.name;
    this.parameters = params.parameters;
    this.string = Lingua.functionType + Lingua.space + this.name +
        Lingua.openParen + this.parameters +
        Lingua.closeParen + functionBody + end;
};

File.prototype = {};
