var writeFile = require('write');
var Path = require('./Objects/Path');
var File = require('./Objects/File');
var Variable = require('./Objects/Variable');
var Statement = require('./Objects/Statement');
var Folder =require('./Objects/Folder');
var Function = require('./Objects/Function');
var Loop = require('./Objects/Loop');
var Oebject = require('./Objects/Object');
var Lingua = require('./Lingua');

function createEmptyFunction(){
    var f = new Function();
    console.log(f.String);
}

function createNamedFunction(){
    var f = new Function({name:'sayHi'})
}

function createVariable(){
    var v = new Variable({name:'greeting', value:'\"Hello!\"'});
}

function createObject(){
    var o = new Oebject({name:'Bear'});
    o.addFunction(new Function({name:'roar'}).protoForm());
    o.addFunction(new Function({name:'mate'}).protoForm());
    o.addFunction(new Function({name:'forage'}).protoForm());
    var f = new File();
    f.addLine(o.setString());
    f.writeToDisk();
    //In Architect:create object Bear that can roar, mate, and forage
}

function writeHelloProgram(){
    var f = new File();
    f.addLine("console.log(\"Hello\");"+Lingua.newLine);
    f.addLine(new Function({name:'FirstFunction'}).string);
    f.writeToDisk();
}

function writeFolder(){
    var folder = new Folder();
    for(var i=0;i<3;i++){
        var file = new File();
        file.setName('Gen-'+i);
        folder.addFile(file)
    }
    var childFolder = new Folder();
    childFolder.setName('Childfolder');
    folder.addFolder(childFolder);
    childFolder.addFile(new File());
    folder.writeAllToDisk();
}

//writeHelloProgram();
//createObject();
writeFolder();
