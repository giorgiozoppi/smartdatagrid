// Generated from grid_formula.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0002\n&\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0006\t#\n\t\r\t\u000e",
    "\t$\u0002\u0002\n\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b",
    "\u0007\r\b\u000f\t\u0011\n\u0003\u0002\u0003\u0003\u00022;&\u0002\u0003",
    "\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007",
    "\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b",
    "\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f",
    "\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0003\u0013",
    "\u0003\u0002\u0002\u0002\u0005\u0015\u0003\u0002\u0002\u0002\u0007\u0017",
    "\u0003\u0002\u0002\u0002\t\u0019\u0003\u0002\u0002\u0002\u000b\u001b",
    "\u0003\u0002\u0002\u0002\r\u001d\u0003\u0002\u0002\u0002\u000f\u001f",
    "\u0003\u0002\u0002\u0002\u0011\"\u0003\u0002\u0002\u0002\u0013\u0014",
    "\u0007*\u0002\u0002\u0014\u0004\u0003\u0002\u0002\u0002\u0015\u0016",
    "\u0007+\u0002\u0002\u0016\u0006\u0003\u0002\u0002\u0002\u0017\u0018",
    "\u00071\u0002\u0002\u0018\b\u0003\u0002\u0002\u0002\u0019\u001a\u0007",
    "-\u0002\u0002\u001a\n\u0003\u0002\u0002\u0002\u001b\u001c\u0007,\u0002",
    "\u0002\u001c\f\u0003\u0002\u0002\u0002\u001d\u001e\u0007/\u0002\u0002",
    "\u001e\u000e\u0003\u0002\u0002\u0002\u001f \u0007\'\u0002\u0002 \u0010",
    "\u0003\u0002\u0002\u0002!#\t\u0002\u0002\u0002\"!\u0003\u0002\u0002",
    "\u0002#$\u0003\u0002\u0002\u0002$\"\u0003\u0002\u0002\u0002$%\u0003",
    "\u0002\u0002\u0002%\u0012\u0003\u0002\u0002\u0002\u0004\u0002$\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function grid_formulaLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

grid_formulaLexer.prototype = Object.create(antlr4.Lexer.prototype);
grid_formulaLexer.prototype.constructor = grid_formulaLexer;

grid_formulaLexer.EOF = antlr4.Token.EOF;
grid_formulaLexer.T__0 = 1;
grid_formulaLexer.T__1 = 2;
grid_formulaLexer.T__2 = 3;
grid_formulaLexer.T__3 = 4;
grid_formulaLexer.T__4 = 5;
grid_formulaLexer.T__5 = 6;
grid_formulaLexer.T__6 = 7;
grid_formulaLexer.NUMBER = 8;


grid_formulaLexer.modeNames = [ "DEFAULT_MODE" ];

grid_formulaLexer.literalNames = [ null, "'('", "')'", "'/'", "'+'", "'*'", 
                                   "'-'", "'%'" ];

grid_formulaLexer.symbolicNames = [ null, null, null, null, null, null, 
                                    null, null, "NUMBER" ];

grid_formulaLexer.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", 
                                "T__5", "T__6", "NUMBER" ];

grid_formulaLexer.grammarFileName = "grid_formula.g4";



exports.grid_formulaLexer = grid_formulaLexer;

