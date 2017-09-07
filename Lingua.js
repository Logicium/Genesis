var Lingua = function(){

    //DATA LANGUAGE

    this.functionType = "function";//function (functionDeclaration){};
    this.variableType = "var";
    this.space = " ";
    this.openBrack = "[";
    this.closeBrack = "]";
    this.openBrace = "{";
    this.closeBrace = "}";
    this.openParen = "(";
    this.closeParen = ")";
    this.emptyParameters = "( )";
    this.end = ";";
    this.equals = "=";
    this.newLine = "\n";
    this.dot = ".";
    this.colon = ":";
    this.emptyBody = "{ }";
    this.prototypeType = "prototype";
    this.comma = ",";

    //SYSTEM LANGUAGE 

};

Lingua.prototype = {


};

module.exports = new Lingua();
