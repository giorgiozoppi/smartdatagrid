// Generated from grid_formula.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\n6\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\b\u0003\b\u0003\t\u0006\t3\n\t\r\t\u000e\t4\u0002\u0002\n\u0003",
    "\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011",
    "\n\u0003\u0002\u0004\u0004\u0002\f\f\u000f\u000f\u0004\u0002002;\u0002",
    "6\u0002\u0003\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002",
    "\u0002\u0002\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002",
    "\u0002\u0002\u000b\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002",
    "\u0002\u0002\u000f\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002",
    "\u0002\u0003\u0013\u0003\u0002\u0002\u0002\u0005\u001b\u0003\u0002\u0002",
    "\u0002\u0007\u001f\u0003\u0002\u0002\u0002\t#\u0003\u0002\u0002\u0002",
    "\u000b\'\u0003\u0002\u0002\u0002\r+\u0003\u0002\u0002\u0002\u000f/\u0003",
    "\u0002\u0002\u0002\u00112\u0003\u0002\u0002\u0002\u0013\u0014\u0007",
    "r\u0002\u0002\u0014\u0015\u0007g\u0002\u0002\u0015\u0016\u0007t\u0002",
    "\u0002\u0016\u0017\u0007e\u0002\u0002\u0017\u0018\u0007g\u0002\u0002",
    "\u0018\u0019\u0007p\u0002\u0002\u0019\u001a\u0007v\u0002\u0002\u001a",
    "\u0004\u0003\u0002\u0002\u0002\u001b\u001c\u0007e\u0002\u0002\u001c",
    "\u001d\u0007q\u0002\u0002\u001d\u001e\u0007n\u0002\u0002\u001e\u0006",
    "\u0003\u0002\u0002\u0002\u001f \u0007f\u0002\u0002 !\u0007k\u0002\u0002",
    "!\"\u0007x\u0002\u0002\"\b\u0003\u0002\u0002\u0002#$\u0007u\u0002\u0002",
    "$%\u0007w\u0002\u0002%&\u0007o\u0002\u0002&\n\u0003\u0002\u0002\u0002",
    "\'(\u0007o\u0002\u0002()\u0007w\u0002\u0002)*\u0007n\u0002\u0002*\f",
    "\u0003\u0002\u0002\u0002+,\u0007o\u0002\u0002,-\u0007k\u0002\u0002-",
    ".\u0007p\u0002\u0002.\u000e\u0003\u0002\u0002\u0002/0\t\u0002\u0002",
    "\u00020\u0010\u0003\u0002\u0002\u000213\t\u0003\u0002\u000221\u0003",
    "\u0002\u0002\u000234\u0003\u0002\u0002\u000242\u0003\u0002\u0002\u0002",
    "45\u0003\u0002\u0002\u00025\u0012\u0003\u0002\u0002\u0002\u0004\u0002",
    "4\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function grid_formulaLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

grid_formulaLexer.prototype = Object.create(antlr4.Lexer.prototype);
grid_formulaLexer.prototype.constructor = grid_formulaLexer;

Object.defineProperty(grid_formulaLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

grid_formulaLexer.EOF = antlr4.Token.EOF;
grid_formulaLexer.T__0 = 1;
grid_formulaLexer.T__1 = 2;
grid_formulaLexer.T__2 = 3;
grid_formulaLexer.T__3 = 4;
grid_formulaLexer.T__4 = 5;
grid_formulaLexer.T__5 = 6;
grid_formulaLexer.NL = 7;
grid_formulaLexer.NUMBER = 8;

grid_formulaLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

grid_formulaLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

grid_formulaLexer.prototype.literalNames = [ null, "'percent'", "'col'", 
                                             "'div'", "'sum'", "'mul'", 
                                             "'min'" ];

grid_formulaLexer.prototype.symbolicNames = [ null, null, null, null, null, 
                                              null, null, "NL", "NUMBER" ];

grid_formulaLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", 
                                          "T__4", "T__5", "NL", "NUMBER" ];

grid_formulaLexer.prototype.grammarFileName = "grid_formula.g4";



exports.grid_formulaLexer = grid_formulaLexer;

