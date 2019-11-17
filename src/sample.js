/*
 we want to try the the formula associated to the grid
 the grammar defined is the following:
 min mul 10.02 10 percent 10 min mul 10.02 10
 */

 var antlr4 = require('antlr4');

 var grid_formulaLexer = require('./grid_formula/grid_formulaLexer').grid_formulaLexer;
 var grid_formulaParser = require('./grid_formula/grid_formulaParser').grid_formulaParser;
 var grid_formulaListener = require('./grid_formula/grid_formulaListener').grid_formulaListener;

 var input = "((0*1)-(2%(4*5)))" 
 var chars = new antlr4.InputStream(input);
 var lexer = new grid_formulaLexer(chars);
 var tokens  = new antlr4.CommonTokenStream(lexer);
 var parser = new grid_formulaParser(tokens);
 parser.buildParseTrees = true;
 var tree = parser.formulas()
 var columns = [10.2, 10, 20, 40,  30, 90, 120, 12]
 class Visitor {
    constructor(colsvalue)
    {
      this.columns = colsvalue;
      this.ops = []
      this.vals = []
      this.visitChildren = this.visitChildren.bind(this)
      this.getResult = this.getResult.bind(this)
      this.result = 0;
    }
    getResult()
    {
      return JSON.stringify(this.vals)
    }
    
    visitChildren(ctx) {
      if (!ctx) {
        return;
      }
  
      if (ctx.children) {
        return ctx.children.map(child => {
          if (child.children && child.children.length != 0) {  
            return child.accept(this);
          } else {
            let textValue = child.getText().trim();
           

            if ((textValue!='') && (textValue!="<EOF>"))
            {
             let current = null
             if (!isNaN(textValue))
             {
               let parsedInteger = parseInt(textValue)
               if (parsedInteger < this.columns.length)
               {
                  current = this.columns[parsedInteger]
               }
             }
             else 
             {
               current = textValue
             }
             if (current!=null)
             {
              console.log("Item visited-->" + current)
              if (current==="(") ;
              else if (current==="+") this.ops.push(current);
              else if (current==="*") this.ops.push(current);
              else if (current==="-") this.ops.push(current);
              else if (current==="%") this.ops.push(current);
              else if (current===")")
              {
              let op = this.ops.pop();
              console.log("Valuation " + op)
              if (op === "+") this.vals.push(vals.pop() + vals.pop())
              else if (op==="*") this.vals.push(this.vals.pop() * this.vals.pop())
              else if (op == "/") this.vals.push(this.vals.pop() / this.vals.pop());
              else if (op == "-") this.vals.push(this.vals.pop() - this.vals.pop());
              else if (op == "%") this.vals.push((this.vals.pop() * 0.001) * this.vals.pop());
              }
              else this.vals.push(parseFloat(current));
             }
            }
           }
        });
      }
    }
  }
  var visitor = new Visitor(columns)  
  tree.accept(visitor);
  console.log("Visitor--->" + visitor.getResult())

