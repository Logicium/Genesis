/**
 * Created by Kisora Thomas on 2016-08-13.
 */

Relations = function(){
    this.Relations = [
        {'in':['what','where']},
        {'with':['what']},
        {'to':['where']},
        {'is':['what','where']},
        {'from':['where']}
    ];
};

Relations.prototype = {
    detectRelation:function(s){
        Where.detect(s);
        What.detect(s);
    },
    //:function(s){},
};

Where = function(){

};

Where.prototype = {
    detect: function(){},
};

What = function(){};

What.prototype = {
    detect: function(){},
};


