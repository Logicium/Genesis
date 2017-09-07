var NLP = require('stanford-corenlp');

var options = {
    'nlpPath'   : './../corenlp',
    'version'   : '3.5.2',
    'annotators': ['ssplit']
};

coreNLP = new NLP.StanfordNLP(options);
coreNLP.loadPipelineSync();
coreNLP.process('This is so good.', function(err, result) {
    console.log(err,JSON.stringify(result));
});