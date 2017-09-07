//A refined call to the Html Base
var Page = function(params){
    if(typeof(params)== undefined){
        params.name = 'WebPage';
        params.scripts = ['WebApp.js'];
        params.styles = ['WebApp.css'];
    }
    this.html = new Html(params);

};

Page = function(){

};

module.exports = Page;
