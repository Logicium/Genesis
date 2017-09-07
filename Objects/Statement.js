const jsdom = require("jsdom");
//noinspection JSAnnotator
const { JSDOM } = jsdom;
//noinspection JSAnnotator
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);


var Statement = function(body){
    this.lines = [];
    this.lines.push(body);
};

Statement.prototype = {
   assemble:function(){
        var lines = '';
        var self = this;
        $.each(this.lines,function(){
            lines = lines + this;
        });
        return lines;
   },
   addLine:function(line){
       this.lines.push(line);
   }
};


module.exports = Statement;