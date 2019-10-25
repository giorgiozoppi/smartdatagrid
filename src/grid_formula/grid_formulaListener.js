// Generated from grid_formula.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by grid_formulaParser.
function grid_formulaListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

grid_formulaListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
grid_formulaListener.prototype.constructor = grid_formulaListener;

// Enter a parse tree produced by grid_formulaParser#formulas.
grid_formulaListener.prototype.enterFormulas = function(ctx) {
};

// Exit a parse tree produced by grid_formulaParser#formulas.
grid_formulaListener.prototype.exitFormulas = function(ctx) {
};


// Enter a parse tree produced by grid_formulaParser#formula.
grid_formulaListener.prototype.enterFormula = function(ctx) {
};

// Exit a parse tree produced by grid_formulaParser#formula.
grid_formulaListener.prototype.exitFormula = function(ctx) {
};


// Enter a parse tree produced by grid_formulaParser#baseformula.
grid_formulaListener.prototype.enterBaseformula = function(ctx) {
};

// Exit a parse tree produced by grid_formulaParser#baseformula.
grid_formulaListener.prototype.exitBaseformula = function(ctx) {
};


// Enter a parse tree produced by grid_formulaParser#emptyLine.
grid_formulaListener.prototype.enterEmptyLine = function(ctx) {
};

// Exit a parse tree produced by grid_formulaParser#emptyLine.
grid_formulaListener.prototype.exitEmptyLine = function(ctx) {
};


// Enter a parse tree produced by grid_formulaParser#op.
grid_formulaListener.prototype.enterOp = function(ctx) {
};

// Exit a parse tree produced by grid_formulaParser#op.
grid_formulaListener.prototype.exitOp = function(ctx) {
};



exports.grid_formulaListener = grid_formulaListener;