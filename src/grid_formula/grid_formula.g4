grammar grid_formula;
    formulas
    : formula EOF
    ;
    formula
        :   '(' formula op formula ')' |  NUMBER       
        ;
    op 
        :  '/' | '+' | '*' | '-' | '%'
        ;
    NUMBER
        : [0-9]+
        ;