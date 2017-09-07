var DependencyParser = require('dependency-parser');
var flipTreeHeadToChild = require('dependency-parser/flip-tree-head-to-child');
var disambiguatePOS = require('dependency-parser/disambiguate-pos');
var parseGenerator = DependencyParser();

var sentence = [
    {
        "word": "i",
        "pos": [
            "noun"
        ]
    },
    {
        "word": "am",
        "pos": [
            "verb"
        ]
    },
    {
        "word": "a",
        "pos": [
            "indefinite-article"
        ]
    },
    {
        "word": "great",
        "pos": [
            "adjective",
            "noun",
            "adverb"
        ]
    },
    {
        "word": "dog",
        "pos": [
            "noun",
            "adverb",
            "verb-transitive",
            "idiom"
        ]
    }
];

var parseGenerator = DependencyParser();
var disambiguatedSentence = disambiguatePOS(sentence, 'pos');
var parseIterator = parseGenerator(sentence);
var parsed = runIteratorUntilDone(parseIterator);
var childBasedTree = flipTreeHeadToChild(parsed.sentence);

console.log(JSON.stringify(childBasedTree, null, '  '));

function runIteratorUntilDone(iterator) {
    var result;
    do {
        result = iterator.next();
    }
    while (!result.done);

    return result.value;
}

var PartsOfSpeech = {
    'CC':'conjunction',
    'CD':'cardinal-number',
    'DT':'determiner',
    'EX':'existential-there',
    'FW':'foreign-word',
    'IN':'preposition',
    'JJ':'adjective',
    'JJR':'adjective-comparative',
    'JJS':'adjective-superlative',
    'LS':'list-item-marker',
    'MD':'modal',
    'NN':'noun',
    'NNP':'proper-noun',
    'NNPS':'proper-noun-plural',
    'NNS':'noun-plural',
    'POS':'possessive',
    'PDT':'predeterminer',
    'PP$':'possessive-pronoun',
    'PRP':'personal-pronoun',
    'RB':'adverb',
    'RBR':'adverb-comparative',
    'RBS':'adverb-superlative',
    'RP':'particle',
    'SYM':'symbol',
    'TO':'to',
    'UH':'interjection',
    'VB':'verb',
    'VBD':'verb-past-tense',
    'VBG':'verb-gerund',
    'VBN':'verb-past-part',
    'VBP':'verb-present',
    'WDT':'wh-determiner',
    'WP$':'possessive-wh',
    'WRB':'wh-adverb',
    ',':'comma',
    '.':'sent-final-punct',
    '':'mid-sent-punct',
    '$':'dollar-sign',
    '#':'pound-sign',
    '\"':'quote',
    '(':'left-paren',
    ')':'right-paren'
};

var DependencyFormatter = function(sentence){
    var pos = require('pos');
    var words = new pos.Lexer().lex(sentence);
    var tagger = new pos.Tagger();
    var taggedWords = tagger.tag(words);
    var formattedData = [];
    for (i in taggedWords) {
        var token = {};
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        token.word = word;
        var tag = taggedWord[1];
        token.pos = PartsOfSpeech[tag];
        console.log(word + " /" + tag);
        formattedData.push(token);
    }
    return formattedData;
};

module.exports = DependencyFormatter;