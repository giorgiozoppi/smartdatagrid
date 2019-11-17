/**
*  ========================================================================
*   Copyright (c) 2019 Karve Informatica S.L.
* ------------------------------------------------------------------------
*  @author Giorgio Zoppi <giorgio.zoppi@karveinformatica.com>
*  @date  30th November 2019
*  @brief Given a resolved parsing tree compute the formula value. Requires JavaScript ES6  
*  @file ExpressionEvaluator.js
*/

export default class ExpressionEvaluator
{
  /**
   * Constructor 
   * @param {} grid Grid instance to be used for the evaluation 
   */
    constructor(grid)
    {
         this.visitChildren = this.visitChildren.bind(this)
         this.eval  = this.eval.bind(this)
         this.getKeys = this.getKeys.bind(this)
         this.clearState = this.clearState.bind(this)
         this.vals = []
         this.ops = []
         this.gridInstance = grid;
         this.lastVisitedRow = 0;
         this.lastOp = ""
    }
    /**
     * This clear the state of the formula evaluator
     */
    clearState()
    {
      this.vals = []
      this.ops = []
    }
    /**
     *  Parsing tree to be used. Return 0 in case of undefined behaviour.
     * @param {*} parserTree   Parsing tree 
     * @param {*} rowIndex     Row index 
     */
    eval(parserTree, rowIndex)
    {
        this.lastVisitedRow = rowIndex;
        console.log("Eval row " + this.lastVisitedRow)
        this.visitChildren(parserTree, this.lastVisitedRow)
        if (this.vals.length > 0) {
            let ret = this.vals.pop()
            this.vals = []
            this.ops = []
            
            console.log("Eval result" + ret)
            return ret
        }
        return 0
    }
    /**
     * Generators are for evaluating the things.
     * @param {*} parserTree parser tree to be used.
     * @param {*} rowMax     row max to be used.
     */
    * multiEval(parserTree, rowMax)
    {
       for (let rowIndex = 0; rowIndex < rowMax; rowIndex++)
       {
        this.lastVisitedRow = rowIndex;
        this.visitChildren(parserTree)
        yield this.vals.pop()
        this.vals = []
        this.ops = [] 
      }
    }
    /**
     * Get the column names for a given row
     * @param {*} gridInstance  grid instance to be used
     * @param {*} rowIndex      rowIndex to be used.
     */
    getKeys(gridInstance)
    {
      let size = gridInstance.dataSource.length;
      var row = null
      // case of the size we get the value of the following up 
      // since we are adding at the top
      row = gridInstance.columns.map(x=>x.field) 
      return row.filter(x=>!x.includes("Button")).sort()
    }
  
    /**
     * Evaluation of a row for a formula
     * @param {*} ctx       parser tree used for the evaluation 
     * @param {*} rowIndex  rowIndex to be used.
     */
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
             
              if ((textValue!='') && (textValue!="<EOF>")){

               let current = null
                
               if (!isNaN(textValue)){
                 let parsedInteger = parseInt(textValue)
                 let keys = this.getKeys(this.gridInstance)
                 console.log("Evaluation Keys " + JSON.stringify(keys))
                 let simpleKey = keys[parsedInteger]
                 current = this.gridInstance.dataSource[this.lastVisitedRow][simpleKey]
               
                 console.log("Value to exect" + current)
               }
               else {
                 current = textValue
               }
            
               if (current!=null){
                 
                if (current==="(") ;
                else if (current==="+") this.ops.push(current);
                else if (current==="*") this.ops.push(current);
                else if (current==="/") this.ops.push(current);
                else if (current==="-") this.ops.push(current);
                else if (current==="%") this.ops.push(current);
                else if (current===")"){
                let op = this.ops.pop();
                let op1 = this.vals.pop()
                let op2 = this.vals.pop()
                // useful for determinate which is the neutral element in case of null
               
                if (op === "+") this.vals.push(op2 + op1 )
                else if (op === "*") this.vals.push(op2 * op1)
                else if (op === "/") this.vals.push(op2 / op1);
                else if (op === "-") this.vals.push(op2 - op1);
                else if (op === "%") this.vals.push((op2 * 0.001) * op1);
                }
                else if (isNaN(current))
                {
                  console.error("Invalid formula provided " + current)
                }
                else {
                  this.vals.push(current);
                }
               } 
              }
             }
          });
        }
    }
}