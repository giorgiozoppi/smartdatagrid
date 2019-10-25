// Generated from grid_formula.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var grid_formulaListener = require('./grid_formulaListener').grid_formulaListener;
var grammarFileName = "grid_formula.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\n:\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0003\u0002\u0007",
    "\u0002\u000f\n\u0002\f\u0002\u000e\u0002\u0012\u000b\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0005\u0003!\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0006\u0004\'\n\u0004\r\u0004\u000e\u0004(\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0006\u00040\n\u0004\r\u0004\u000e",
    "\u00041\u0005\u00044\n\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0002\u0002\u0007\u0002\u0004\u0006\b\n\u0002\u0003",
    "\u0003\u0002\u0005\b\u0002<\u0002\u0010\u0003\u0002\u0002\u0002\u0004",
    " \u0003\u0002\u0002\u0002\u00063\u0003\u0002\u0002\u0002\b5\u0003\u0002",
    "\u0002\u0002\n7\u0003\u0002\u0002\u0002\f\u000f\u0005\u0004\u0003\u0002",
    "\r\u000f\u0005\b\u0005\u0002\u000e\f\u0003\u0002\u0002\u0002\u000e\r",
    "\u0003\u0002\u0002\u0002\u000f\u0012\u0003\u0002\u0002\u0002\u0010\u000e",
    "\u0003\u0002\u0002\u0002\u0010\u0011\u0003\u0002\u0002\u0002\u0011\u0013",
    "\u0003\u0002\u0002\u0002\u0012\u0010\u0003\u0002\u0002\u0002\u0013\u0014",
    "\u0007\u0002\u0002\u0003\u0014\u0003\u0003\u0002\u0002\u0002\u0015\u0016",
    "\u0005\n\u0006\u0002\u0016\u0017\u0005\u0006\u0004\u0002\u0017!\u0003",
    "\u0002\u0002\u0002\u0018\u0019\u0005\n\u0006\u0002\u0019\u001a\u0005",
    "\u0006\u0004\u0002\u001a\u001b\u0005\u0006\u0004\u0002\u001b!\u0003",
    "\u0002\u0002\u0002\u001c!\u0005\u0006\u0004\u0002\u001d\u001e\u0007",
    "\u0003\u0002\u0002\u001e\u001f\u0007\n\u0002\u0002\u001f!\u0005\u0006",
    "\u0004\u0002 \u0015\u0003\u0002\u0002\u0002 \u0018\u0003\u0002\u0002",
    "\u0002 \u001c\u0003\u0002\u0002\u0002 \u001d\u0003\u0002\u0002\u0002",
    "!\u0005\u0003\u0002\u0002\u0002\"#\u0005\n\u0006\u0002#$\u0007\u0004",
    "\u0002\u0002$&\u0007\n\u0002\u0002%\'\u0007\t\u0002\u0002&%\u0003\u0002",
    "\u0002\u0002\'(\u0003\u0002\u0002\u0002(&\u0003\u0002\u0002\u0002()",
    "\u0003\u0002\u0002\u0002)4\u0003\u0002\u0002\u0002*+\u0005\n\u0006\u0002",
    "+,\u0007\u0004\u0002\u0002,-\u0007\n\u0002\u0002-/\u0007\n\u0002\u0002",
    ".0\u0007\t\u0002\u0002/.\u0003\u0002\u0002\u000201\u0003\u0002\u0002",
    "\u00021/\u0003\u0002\u0002\u000212\u0003\u0002\u0002\u000224\u0003\u0002",
    "\u0002\u00023\"\u0003\u0002\u0002\u00023*\u0003\u0002\u0002\u00024\u0007",
    "\u0003\u0002\u0002\u000256\u0007\t\u0002\u00026\t\u0003\u0002\u0002",
    "\u000278\t\u0002\u0002\u00028\u000b\u0003\u0002\u0002\u0002\b\u000e",
    "\u0010 (13"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'percent'", "'col'", "'div'", "'sum'", "'mul'", 
                     "'min'" ];

var symbolicNames = [ null, null, null, null, null, null, null, "NL", "NUMBER" ];

var ruleNames =  [ "formulas", "formula", "baseformula", "emptyLine", "op" ];

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
grid_formulaParser.NL = 7;
grid_formulaParser.NUMBER = 8;

grid_formulaParser.RULE_formulas = 0;
grid_formulaParser.RULE_formula = 1;
grid_formulaParser.RULE_baseformula = 2;
grid_formulaParser.RULE_emptyLine = 3;
grid_formulaParser.RULE_op = 4;

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

FormulasContext.prototype.EOF = function() {
    return this.getToken(grid_formulaParser.EOF, 0);
};

FormulasContext.prototype.formula = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FormulaContext);
    } else {
        return this.getTypedRuleContext(FormulaContext,i);
    }
};

FormulasContext.prototype.emptyLine = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EmptyLineContext);
    } else {
        return this.getTypedRuleContext(EmptyLineContext,i);
    }
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
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 14;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << grid_formulaParser.T__0) | (1 << grid_formulaParser.T__2) | (1 << grid_formulaParser.T__3) | (1 << grid_formulaParser.T__4) | (1 << grid_formulaParser.T__5) | (1 << grid_formulaParser.NL))) !== 0)) {
            this.state = 12;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case grid_formulaParser.T__0:
            case grid_formulaParser.T__2:
            case grid_formulaParser.T__3:
            case grid_formulaParser.T__4:
            case grid_formulaParser.T__5:
                this.state = 10;
                this.formula();
                break;
            case grid_formulaParser.NL:
                this.state = 11;
                this.emptyLine();
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 16;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 17;
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

FormulaContext.prototype.op = function() {
    return this.getTypedRuleContext(OpContext,0);
};

FormulaContext.prototype.baseformula = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BaseformulaContext);
    } else {
        return this.getTypedRuleContext(BaseformulaContext,i);
    }
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
        this.state = 30;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 19;
            this.op();
            this.state = 20;
            this.baseformula();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 22;
            this.op();
            this.state = 23;
            this.baseformula();
            this.state = 24;
            this.baseformula();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 26;
            this.baseformula();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 27;
            this.match(grid_formulaParser.T__0);
            this.state = 28;
            this.match(grid_formulaParser.NUMBER);
            this.state = 29;
            this.baseformula();
            break;

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

function BaseformulaContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grid_formulaParser.RULE_baseformula;
    return this;
}

BaseformulaContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BaseformulaContext.prototype.constructor = BaseformulaContext;

BaseformulaContext.prototype.op = function() {
    return this.getTypedRuleContext(OpContext,0);
};

BaseformulaContext.prototype.NUMBER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(grid_formulaParser.NUMBER);
    } else {
        return this.getToken(grid_formulaParser.NUMBER, i);
    }
};


BaseformulaContext.prototype.NL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(grid_formulaParser.NL);
    } else {
        return this.getToken(grid_formulaParser.NL, i);
    }
};


BaseformulaContext.prototype.enterRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.enterBaseformula(this);
	}
};

BaseformulaContext.prototype.exitRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.exitBaseformula(this);
	}
};




grid_formulaParser.BaseformulaContext = BaseformulaContext;

grid_formulaParser.prototype.baseformula = function() {

    var localctx = new BaseformulaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, grid_formulaParser.RULE_baseformula);
    try {
        this.state = 49;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 32;
            this.op();
            this.state = 33;
            this.match(grid_formulaParser.T__1);
            this.state = 34;
            this.match(grid_formulaParser.NUMBER);
            this.state = 36; 
            this._errHandler.sync(this);
            var _alt = 1;
            do {
            	switch (_alt) {
            	case 1:
            		this.state = 35;
            		this.match(grid_formulaParser.NL);
            		break;
            	default:
            		throw new antlr4.error.NoViableAltException(this);
            	}
            	this.state = 38; 
            	this._errHandler.sync(this);
            	_alt = this._interp.adaptivePredict(this._input,3, this._ctx);
            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 40;
            this.op();
            this.state = 41;
            this.match(grid_formulaParser.T__1);
            this.state = 42;
            this.match(grid_formulaParser.NUMBER);
            this.state = 43;
            this.match(grid_formulaParser.NUMBER);
            this.state = 45; 
            this._errHandler.sync(this);
            var _alt = 1;
            do {
            	switch (_alt) {
            	case 1:
            		this.state = 44;
            		this.match(grid_formulaParser.NL);
            		break;
            	default:
            		throw new antlr4.error.NoViableAltException(this);
            	}
            	this.state = 47; 
            	this._errHandler.sync(this);
            	_alt = this._interp.adaptivePredict(this._input,4, this._ctx);
            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
            break;

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

function EmptyLineContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grid_formulaParser.RULE_emptyLine;
    return this;
}

EmptyLineContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EmptyLineContext.prototype.constructor = EmptyLineContext;

EmptyLineContext.prototype.NL = function() {
    return this.getToken(grid_formulaParser.NL, 0);
};

EmptyLineContext.prototype.enterRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.enterEmptyLine(this);
	}
};

EmptyLineContext.prototype.exitRule = function(listener) {
    if(listener instanceof grid_formulaListener ) {
        listener.exitEmptyLine(this);
	}
};




grid_formulaParser.EmptyLineContext = EmptyLineContext;

grid_formulaParser.prototype.emptyLine = function() {

    var localctx = new EmptyLineContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, grid_formulaParser.RULE_emptyLine);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 51;
        this.match(grid_formulaParser.NL);
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
    this.enterRule(localctx, 8, grid_formulaParser.RULE_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 53;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << grid_formulaParser.T__2) | (1 << grid_formulaParser.T__3) | (1 << grid_formulaParser.T__4) | (1 << grid_formulaParser.T__5))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
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
