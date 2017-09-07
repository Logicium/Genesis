var File = require('./Objects/File');
var Path = require('./Objects/Path');
var App = require('./Templates/App');
var Html = require('./Templates/Bases/Html');

var abstraction = {
    folder: {
        name: 'WebApp',
        children: [
            {folder: {
                name: 'public',
                children:[
                    {folder: {
                        name: 'home'
                    }},
                    {folder: {
                        name: 'libraries'
                    }},
                    {folder:{
                        name: 'styles'
                    }}
                ]
            }}
        ]
    }
};


var a = new App();
//The App is an html base file plus some panels.
a.autoBuildFileSystem(abstraction);




// var h = new Html();
// h.combineScripts();
// console.log(h.assemble());
//
// var f = new File({
//     name: 'WebApp',
//     type: '.html',
//     path: new Path(),
//     lines:['']
// });
//
// f.addLine(h.docType);
// f.addLine(h.assemble());
// f.writeToDisk();


//Auto Row - Creates a view based on data that is presented as an array.
//Auto Card Grid - Creates a view for lists of objects
//Auto Header - Combines Images with a title


