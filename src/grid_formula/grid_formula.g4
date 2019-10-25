grammar grid_formula;
    formulas
        :  (formula|emptyLine)* EOF
        ;
    formula
        :   ( op baseformula) | ( op baseformula baseformula) | (baseformula)  | ('percent' NUMBER baseformula) 
        ;
    baseformula
        : (op 'col' NUMBER NL+) |  (op 'col' NUMBER NUMBER NL+)  
        ;
    emptyLine
        : NL
        ;
    op 
        :  'div' | 'sum' | 'mul' | 'min'
        ;
    NL
        : '\r' | '\n' 
        ;
    NUMBER
        : [0-9.]+
        ;