//An App has some defaults. ;)
//A single page web app
//With navigation for all of the valid Panels in the public/panels folder
//Js in Objects receives its own database each, with auto relations
var Page = require('./Page');
var Panel = require('./Panel');
var Navi = require('./Navi');
var Folder = require('./../Objects/Folder');
var File = require('./../Objects/File');
var Path = require('./../Objects/Path');
var Oebject  = require('./../Objects/Object');
var Function = require('./../Objects/Function');
var Html = require('./Bases/Html');

var App = function(params){

    if (typeof (params) == 'undefined'){
        params = {
            name: 'WebApp',
            home: new Page(),
            panels:[ new Panel()],
            imports:[],
            styles:['Webapp.css'],
            cards:[],
            objects:[],
            navi: new Navi()
        }
    }
    this.name = params.name;
    this.home = params.home;
    this.panels = params.panels;
    this.cards = params.cards;
    this.objects = params.objects;
    this.navi = params.navi;
    this.fileSystem = [];

};

App.prototype = {

    generateCss:function(){
        var self = this;
        $.each(this.styles,function(){
            //create new styles and add file to style folder
        });
    },

    generateScripts:function(){
        var self = this;
        $.each(this.imports,function(){
            //Add this import to the params to be sent to new Html()
            //And add this import as a function in the Routes File.
        });
    },

    descendFolder:function(object){
        var self = this;
        for(var property in object){
            if(property.match('folder')){

                self.descendFolder(object[property]);
            }
            else if(property.match('name')){

            }
        }
    },


    autoBuildFileSystem:function(abstraction){
        var self = this;
        for (var property in abstraction) {
            if (abstraction.hasOwnProperty(property)) {
                if(property.match('folder')){
                    self.fileSystem.push(
                        {folder:new Folder({
                            name:abstraction[property],
                            path: new Path(),
                            folders:[],
                            files:[]
                        })
                    })
                }
                else if(property.match('children')){
                    self.descendFolder(abstraction)
                }
            }
        }
    },

    assemble:function(){
        //Later, the abstraction will be what the app is assembled from
        //The api will then create an Abstraction that
        //Will be turned more directly into code

        var abstraction = {
            folder: 'WebApp',
            children: [
                {
                    folder: 'public',
                    children: [
                        {folder: 'home',children:[
                            {file:'Home',type:'.js'},
                        ]},
                        {folder: 'libraries'},
                        {folder: 'styles'},
                        {}
                    ]
                }
            ]
        };


        var appFolder = new Folder({name:'WebApp',path:new Path(),folders:[],files:[]});
        var publicFolder = new Folder({name:'public',path:new Path(),folders:[],files:[]});
        var homeFolder = new Folder({name:'home',path:new Path(),folders:[],files:[]});
        var stylesFolder = new Folder({name:'styles',path:new Path(),folders:[],files:[]});
        var librariesFolder = new Folder({name:'libraries',path:new Path(),folders:[],files:[]});

        appFolder.addFolder(publicFolder);
        publicFolder.addFolder(homeFolder);
        publicFolder.addFolder(stylesFolder);
        publicFolder.addFolder(librariesFolder);

        var homeJs = new Oebject({name: 'Home'});
        homeJs.addFunction(new Function({name:'assemble'}).protoForm());

        var homeJsFile = new File({
            name: 'Home',
            type: '.js',
            path: new Path(),
            lines:[homeJs.setString()]
        });

        var homeHtml = new Html();
        homeHtml.combineScripts();

        var homeHtmlFile = new File({
            name: 'Home',
            type: '.html',
            path: new Path(),
            lines:[
                homeHtml.docType,
                homeHtml.assemble()
            ]
        });

        publicFolder.addFile(homeHtmlFile);
        homeFolder.addFile(homeJsFile);
        appFolder.writeAllToDisk();
    },
    abstract:function(){

    },
    buildAbstraction:function(){

    }

};

module.exports = App;