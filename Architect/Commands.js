var DependencyParser = require('dependency-parser');
var flipTreeHeadToChild = require('dependency-parser/flip-tree-head-to-child');
var disambiguatePOS = require('dependency-parser/disambiguate-pos');
var parseGenerator = DependencyParser();
var compendium = require('compendium-js');

var Commands = function(){
    this.Keywords  = [
        'create','modify',
        'delete','undo',
        'redo','generate',
        'go'
    ];
    this.create = [
        //Object folder
        {'file':function(qualifier){new File(qualifier)}},
        {'folder':function(qualifier){new Folder(qualifier)}},
        {'function':function(qualifier){new Function(qualifier) }},
        {'object':function(qualifier){new Oebject(qualifier)}},
        {'path':function(qualifier){new Path(qualifier)}},
        {'statement':function(qualifier){new Statement(qualifier)}},
        {'variable':function(qualifier){new Variable(qualifier)}},
        {'loop':function(qualifier){new Loop(qualifier)}},
       //Templates folder
        {'app':function(qualifier){new App(qualifier)}},
        {'card':function(qualifier){new Card(qualifier)}},
        {'navi':function(qualifier){new Navi(qualifier)}},
        {'page':function(qualifier){new Page(qualifier)}},
        {'panel':function(qualifier){new Panel(qualifier)}},
        //Componenents folder
        {'button':function(qualifier){new Button(qualifier)}},
        {'color':function(qualifier){new Color(qualifier)}},
        {'image':function(qualifier){new Image(qualifier)}},
        {'input':function(qualifier){new Input(qualifier)}},
        {'param':function(qualifier){new Param(qualifier)}},
        //Bases folder
        {'html':function(qualifier){new Html(qualifier)}},
        {'css':function(qualifier){new Css(qualifier)}},
        {'js':function(qualifier){new Js(qualifier)}}
    ];
    this.Modify = {
        //variable name + context/relation
        //variable id
        //reference statement
    };
    this.Add = [];
    this.Delete = {};
    this.Undo = {};
    this.Generate = {};
    this.Go = {};
};

Commands.prototype = {
    getSynonyms : function(){

    },

    detect : function(command){
        var self = this;
        var commandKeyword = "";
        var commandType = "";
        this.Keywords.forEach(function (value, index) {
            if(command.match(value)){
                commandKeyword = value;
                commandType = self.detectCreate(command)
            }
        });
        return [commandKeyword,commandType];
    },

    detectCreate : function(command){
        var createKeyword = "";
        this.create.forEach(function (value, index) {
            if(command.match(value)){
                createKeyword = value;
            }
        });
        return createKeyword;
    },

    getQualifier : function(detection,dependents){
        var qualifiers = '';
        dependents.forEach(function(token){
            if(token.name==detection.commandType || token.dependents.length>0){
                console.log('1st Dependent Qualifier for '+detection.commandKeyword+': '+JSON.parse(token.dependents));
                qualifiers = JSON.parse(token.dependents);
                qualifiers = qualifiers.filter(function(a){return a !== detection.commandKeyword;});
           }
        });
        return qualifiers;
    },

    getAnalysis: function(command){
        var commandTypeDependents = compendium.analyse(command)[0];
        return commandTypeDependents;
    },

    removeCommand: function(commandType,dependencies){

    },

    convertFromIntToString:function(allTokens,intDeps){
        var stringDeps = [];
        for(var i =0;i<intDeps.length;i++){
            stringDeps.push(allTokens[intDeps[i]].raw)
        }
        return stringDeps
    },

    getDependents : function(command){
        var commandType = this.detectCreate(command)[1];
        var analysis = compendium.analyse(command)[0];
        var commandTypeDependents = [];
        for(var i = 0;i<analysis.tokens.length;i++){
            var tokenDep = {};
            if(analysis.tokens[i].deps.governor == true || analysis.tokens[i].deps.dependencies.length > 0){
                tokenDep = {
                    name: analysis.tokens[i].raw,
                    fullDependency: analysis.tokens[i].deps,
                    dependents: JSON.stringify(this.convertFromIntToString(
                        analysis.tokens,
                        analysis.tokens[i].deps.dependencies
                    ))
                };
            }
            else {
                tokenDep = {
                    name: analysis.tokens[i].raw,
                    fullDependency: analysis.tokens[i].deps,
                    dependents: []
                };
                if(tokenDep.fullDependency.master != null) {
                    tokenDep.fullDependency.master = this.convertFromIntToString(
                        analysis.tokens,
                        [(analysis.tokens[i].deps.master)]
                    )[0]
                };

            }
            commandTypeDependents.push(tokenDep);
        }
        return commandTypeDependents;
    }

};

Synonyms = [
    function(){},
    function(){},
    function(){},
    function(){}
];

module.exports = Commands;
