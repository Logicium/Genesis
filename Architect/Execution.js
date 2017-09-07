var Execution = function(){

};

Execution.prototype = {
    execute:function(type,keyword,qualifier){
        var C = new Commands();
        if(type!='' && keyword!='' && qualifier!=''){
            C[type].forEach(function(token){
                if(token == keyword){
                    C[type][token](qualifier)
                }
            });
        }
        else{console.log('Unable to execute command in that format.')}
    }
};

module.exports = Execution;