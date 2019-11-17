// Generated from grid_formula.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var grid_formulaListener = require('./grid_formulaListener').grid_formulaListener;
var grammarFileName = "grid_formula.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003\n\u0017\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u0013",
    "\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0002\u0002\u0005\u0002",
    "\u0004\u0006\u0002\u0003\u0003\u0002\u0005\t\u0014\u0002\b\u0003\u0002",
    "\u0002\u0002\u0004\u0012\u0003\u0002\u0002\u0002\u0006\u0014\u0003\u0002",
    "\u0002\u0002\b\t\u0005\u0004\u0003\u0002\t\n\u0007\u0002\u0002\u0003",
    "\n\u0003\u0003\u0002\u0002\u0002\u000b\f\u0007\u0003\u0002\u0002\f\r",
    "\u0005\u0004\u0003\u0002\r\u000e\u0005\u0006\u0004\u0002\u000e\u000f",
    "\u0005\u0004\u0003\u0002\u000f\u0010\u0007\u0004\u0002\u0002\u0010\u0013",
    "\u0003\u0002\u0002\u0002\u0011\u0013\u0007\n\u0002\u0002\u0012\u000b",
    "\u0003\u0002\u0002\u0002\u0012\u0011\u0003\u0002\u0002\u0002\u0013\u0005",
    "\u0003\u0002\u0002\u0002\u0014\u0015\t\u0002\u0002\u0002\u0015\u0007",
    "\u0003\u0002\u0002\u0002\u0003\u0012"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'('", "')'", "'/'", "'+'", "'*'", "'-'", "'%'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, "NUMBER" ];

var ruleNames =  [ "formulas", "formula", "op" ];

function grid_formulaParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

grid_formulaParser.prototype = Object.create(antlr4.Parser.prototype);
grid_formulaParser.prototype.constructor = grid_formulaParser;

Object.defineProperty(grid_formulaParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

grid_formulaParser.EOF = antlr4.Token.EOF;
grid_formulaParser.T__0 = 1;
grid_formulaParser.T__1 = 2;
grid_formulaParser.T__2 = 3;
grid_formulaParser.T__3 = 4;
grid_formulaParser.T__4 = 5;
grid_formulaParser.T__5 = 6;
grid_formulaParser.T__6 = 7;
grid_formulaParser.NUMBER = 8;

grid_formulaParser.RULE_formulas = 0;
grid_formulaParser.RULE_formula = 1;
grid_formulaParser.RULE_op = 2;

function FormulasContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grid_formulaParser.RULE_formulas;
    return this;
}

FormulasContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FormulasContext.prototype.constructor = FormulasContext;

FormulasContext.prototype.formula = function() {
    return this.getTypedRuleContext(FormulaContext,0);
};

FormulasContext.prototype.EOF = function() {
    return this.getToken(grid_formulaParser.EOF, 0);
};

FormulasContext.prototype.enterRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.enterFormulas(this);
	}
};

FormulasContext.prototype.exitRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.exitFormulas(this);
	}
};




grid_formulaParser.FormulasContext = FormulasContext;

grid_formulaParser.prototype.formulas = function() {

    var localctx = new FormulasContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, grid_formulaParser.RULE_formulas);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 6;
        this.formula();
        this.state = 7;
        this.match(grid_formulaParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FormulaContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grid_formulaParser.RULE_formula;
    return this;
}

FormulaContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FormulaContext.prototype.constructor = FormulaContext;

FormulaContext.prototype.formula = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FormulaContext);
    } else {
        return this.getTypedRuleContext(FormulaContext,i);
    }
};

FormulaContext.prototype.op = function() {
    return this.getTypedRuleContext(OpContext,0);
};

FormulaContext.prototype.NUMBER = function() {
    return this.getToken(grid_formulaParser.NUMBER, 0);
};

FormulaContext.prototype.enterRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.enterFormula(this);
	}
};

FormulaContext.prototype.exitRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.exitFormula(this);
	}
};




grid_formulaParser.FormulaContext = FormulaContext;

grid_formulaParser.prototype.formula = function() {

    var localctx = new FormulaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, grid_formulaParser.RULE_formula);
    try {
        this.state = 16;
        switch(this._input.LA(1)) {
        case grid_formulaParser.T__0:
            this.enterOuterAlt(localctx, 1);
            this.state = 9;
            this.match(grid_formulaParser.T__0);
            this.state = 10;
            this.formula();
            this.state = 11;
            this.op();
            this.state = 12;
            this.formula();
            this.state = 13;
            this.match(grid_formulaParser.T__1);
            break;
        case grid_formulaParser.NUMBER:
            this.enterOuterAlt(localctx, 2);
            this.state = 15;
            this.match(grid_formulaParser.NUMBER);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grid_formulaParser.RULE_op;
    return this;
}

OpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OpContext.prototype.constructor = OpContext;


OpContext.prototype.enterRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.enterOp(this);
	}
};

OpContext.prototype.exitRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.exitOp(this);
	}
};




grid_formulaParser.OpContext = OpContext;

grid_formulaParser.prototype.op = function() {

    var localctx = new OpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, grid_formulaParser.RULE_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 18;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << grid_formulaParser.T__2) | (1 << grid_formulaParser.T__3) | (1 << grid_formulaParser.T__4) | (1 << grid_formulaParser.T__5) | (1 << grid_formulaParser.T__6))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.grid_formulaParser = grid_formulaParser;
