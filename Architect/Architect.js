//Command line interface that will allow user to create a file or files from the simple command set.
var prompt = require('prompt');
var Commands = require('./Commands.js');
var C = new Commands();
var Execution = require('./Execution.js');
var E = new Execution();
var Architect = function(){
};

Architect.prototype = {
  start: function () {
      console.log('Welcome to Genesis Architect.');
      this.callback();
  },
  callback:function(){
      var self = this;
      console.log('Enter a command:');
      prompt.start();
      prompt.get(['command'], function (err, result) {

          if(result.command.match("bye")){
            console.log('Later.');
            return;
          }else{
              console.log('  command: ' + result.command);
              var detection  = C.detect(result.command);
              console.log(detection);
              //console.log("\nPrinting command analysis: \n");
              var analysis = C.getAnalysis(result.command);
              //console.log(analysis);
              console.log("\nPrinting command dependents: \n");
              var dependents = C.getDependents(result.command);
              console.log(dependents);
              console.log("\nPrinting qualifier: \n");
              var qualifier = C.getQualifier(
                  {commandType:detection[0],commandKeyword:detection[1]},dependents
              );
              console.log(qualifier);

              console.log("\nExecuting Command: \n");
              E.execute(detection[0],detection[1],qualifier);

              self.callback();
          }
      });
  }
};

var A = new Architect().start();