//Base template for all html documents will be stored here, as well as associated editing procedures. ;)
var File = require('./../../Objects/File');
var Variable = require('./../../Objects/Variable');
var Statement = require('./../../Objects/Statement');
var Folder =require('./../../Objects/Folder');
var Function = require('./../../Objects/Function');
var Loop = require('./../../Objects/Loop');
var Oebject = require('./../../Objects/Object');
var Lingua = require('./../../Lingua');
const jsdom = require("jsdom");
//noinspection JSAnnotator
const { JSDOM } = jsdom;
//noinspection JSAnnotator
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);

var Html = function(params){

    if (typeof (params) == 'undefined'){
        params = {
            name: 'WebApp',
            description: 'A simple, one page webapp',
            author: 'Genesis',
            styles: ['WebApp.css'],
            imports: ['libraries','home']
        };
    }

    this.docType = '<!doctype html>';
    this.html = $('<html>').attr('lang','en');
    this.head = $('<head>');
    this.charset = $('<meta>').attr('charset','utf-8');
    this.title = $('<title>').text(params.name);
    this.description = $('<meta>').attr('name','description').attr('content',params.description);
    this.author = $('<meta>').attr('name','author').attr('content',params.author);
    this.stylesheets = $('<link>').attr('rel','stylesheet').attr('href','styles/WebApp.css');
    this.scripts = params.imports;
    this.body = $('<body>');
    this.script = $('<script>');

};

Html.prototype={
    assemble:function(){
        //console.log(this.doctype);
        this.html.prepend(this.docType).append(
            this.head.append(
                this.charset,
                this.title,
                this.description,
                this.author,
                this.stylesheets
            ),
            this.body
        );
        return this.html.html();
    },

    combineStyles:function(){
        $.each(this.styles,function(){

        });
    },

    combineScripts:function(){
        var self = this;

        var importFunc = new Function();
        importFunc.setName('importScript');
        importFunc.setParameter('path');

        var s = new Statement(
            new Function({name:'console.log'}).execute('path')
        );
        s.addLine(
            '$.ajax({'+
                'async: false,'+
                'url: \"public/\"+path,'+
                'dataType: \"script\"'+
            '});'
        );
        importFunc.setBody(s.assemble());

        var getAllImportsFunc = new Function();
        getAllImportsFunc.setName('getAllJsImports');
        getAllImportsFunc.setParameter('pathExtension');
        var s2 = new Statement(
            '$.ajax({'+
                'async:false,'+
                'url:\'http://localhost:5000/imports/\'+pathExtension,'+
                'success:function(data){'+
                    'console.log(data);'+
                    '$.each(data,function(){'+
                        'importScript(pathExtension+\"/\"+this.name);'+
                    '});'+
                '}'+
            '});'
        );
        getAllImportsFunc.setBody(s2.assemble());

        self.script.append(importFunc.setString());
        self.script.append(getAllImportsFunc.setString());

        $.each(this.scripts,function(){
            var f = new Function({name:'getAllJsImports'});
            self.script.append(f.execute('"'+this+'"'));
        });

        self.body.append(self.script);
    }

};

module.exports = Html;