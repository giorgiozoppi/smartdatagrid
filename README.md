# SmartDataGrid Component.
In this folder we find the main React component for the grid, which
extends the Essential2.js React Grid by composition as mandate the “prefer
composition over inheritance”.
Here we point out the organization of the code:
1. **generated_code**. In the generated_code folder there is the support code 
for sending messages via GRPC.
2. **grid_formula** . In the grid_formula folder there is support and grammar
for the formula and its parser. It contains the EvaluatorExpression.js
2. GridSettingLoader.js is a class for fetching stored grid settings via Google
GRPC at https://grpc.fleetadmiral.net
3. GridSettingSaver is class for saving the grid settings via Google GRPC
at https://grpc.fleetadmiral.net
4. ExpressionEvaluator is a formula evaluator created from a well formed
grammar. It has the task to evaluate the formula provided by JSON and
apply to the columns.
5. grid_formula/CodeResolver.js is a class used whenever we are editing a CodeName.
It has the responsibility to get the code and ask to the OData
webservice the name whenever the code has been entered in order to
provide a hint. The GridComponent will use the hint to replace the name.
6. LineGridComponent.js. It is the main component and it extends the React GridComponent at
https://ej2.syncfusion.com/react/documentation/grid/
7. ExtendedGridMagnifier.jsx. It is a react component for creating the modal.
8. helpers.js is a set of utilities.
# Column types
We provide support for the autogenerated line grid from JSON. In a line grid we support three kind of columns:
1. Standard Column. It is a textbox with primitive datatypes: string, date, numeric
2. CodeName Column. It is a row of textboxs that is finished from a button. The resposibility of the button is to show 
   a modal window with a grid with crossreference to a provided ODATA Rest Webservice, providing a selection option.
3. Checkbox Column. It is a checkbox column mapped to a boolean value.
4. Selection Column. It is an html select element mapped to a list of SelectedValues.

A comprensive example of different columns is below.
```javascript
/**
 *  This is a sample of JSON to be used for generating a grid
 *  A grid with several columns 
 */
// column 1 type standard

[ 
    { 
       "Id":"1",
       "Type":"Standard",
       "Header":"Code",
       "Width":null,
       "WebserviceUri":null,
       "ModalGridId":null,
       "ModalTitle":null,
       "ModalCols":null,
       "Fields":[ 
          { 
             "Name":"Code",
             "Header":"Unknown",
             "DataType":"string",
             "Width":null,
             "Hidden": false,
             "Format":null,
             "SelectionValues":null
          }
       ]
    },
    // column 2 type codeName. A set of textbox ended with a button that when clicked shows a modal
  { 
       "Id":"2",
       "Type":"CodeName",
       "Header":"Concept",
       "Width":null,
       "WebserviceUri":"http://api.fleetadmiral.net/odata/Concepts",
       "ModalGridId":"Desc1891",
       "ModalTitle":"Concept Listing",
       "ModalCols":{ 
           // description and fields at webserviceuri to be associated with the modal.
          "Columns":[ 
             { 
                "Id":"21",
                "Type":"Standard",
                "Header":"Code",
                "Width":null,
                "WebserviceUri":null,
                "ModalGridId":null,
                "ModalTitle":null,
                "ModalCols":null,
                "Fields":[ 
                   { 
                      "Name":"Code",
                      "Header":"Unknown",
                      "DataType":"string",
                      "Width":null,
                      "Hidden": false,
                      "Format":null,
                      "SelectionValues":null
                   },
                   { 
                      "Name":"Description",
                      "Header":"Unknown",
                      "DataType":"string",
                      "Width":null,
                      "Hidden": false,
                      "Format":null,
                      "SelectionValues":null
                   }
                ]
             }
          ]
       },
       // data trasnfer object fields to be associated to the textbox
       "Fields":[ 
          { 
             "Name":"ConceptCode",
             "Header":"Cod.Concepto",
             "DataType":"string",
             "Width":null,
             "Hidden": false,
             "Format":null,
             "SelectionValues":null
          },
          { 
             "Name":"ConceptName",
             "Header":"Nombre Concepto",
             "DataType":"string",
             "Width":null,
             "Hidden": false,
             "Format":null,
             "SelectionValues":null
          }
       ]
    },
    // column3 checkbox column
    { 
       "Id":"3",
       "Type":"Checkbox",
       "Header":"Included",
       "Width":null,
       "WebserviceUri":null,
       "ModalGridId":null,
       "ModalTitle":null,
       "ModalCols":null,
       "Fields":[ 
          { 
             "Name":"Included",
             "Header":"Unknown",
             "DataType":"boolean",
             "Width":null,
             "Hidden": false,
             "Format":null,
             "SelectionValues":null
          }
       ]
    },
    // column 5 standard column
    { 
       "Id":"5",
       "Type":"Standard",
       "Header":"Subtotal",
       "Width":null,
       "WebserviceUri":null,
       "ModalGridId":null,
       "ModalTitle":null,
       "ModalCols":null,
       "Fields":[ 
          { 
             "Name":"Subtotal",
             "Header":"Unknown",
             "DataType":"numeric",
             "Width":null,
             "Format":null,
             "SelectionValues":null
          }
       ]
    },
    // column 6
    { 
       "Id":"6",
       "Type":"Standard",
       "Header":"LastModification",
       "Width":null,
       "WebserviceUri":null,
       "ModalGridId":null,
       "ModalTitle":null,
       "ModalCols":null,
       "Fields":[ 
          { 
             "Name":"CurrentUser",
             "Header":"Unknown",
             "DataType":"string",
             "Width":null,
             "Format":null,
             "SelectionValues":null
          }
       ]
    },
    // Selection column to be used to select values, creata a select/option component with the selected values
    { 
       "Id":"7",
       "Type":"Selection",
       "Header":"Unity",
       "Width":null,
       "WebserviceUri":null,
       "ModalGridId":null,
       "ModalTitle":null,
       "ModalCols":null,
       "Fields":[ 
          { 
             "Name":"Unity",
             "Header":"Unknown",
             "DataType":"string",
             "Width":null,
             "Format":null,
             "SelectionValues":[ 
                "DAY MONTH",
                "CONDUCTOR"
             ]
          }
       ]
    }
 ]
 ```
## ASP.NET Core 2 

In ASP.net Core we provide the following objects:

   1. GridLineConfig that holds the responsibility when serialized to generate a configuration. A GridLineConfig is a set of GridLineColumns.
   2. GridLineColumn that holds the responsibility to configure the type (Standard, CheckT). A GridLineColumn is composed of one or more fields.
   2. GridLineField that holds the responsibility to define a field.
   A shortexample below
```c#
 var config = new GridLineConfig
            {
               Formula = "((1 * 2) - (10 % (1-2)))"
               Columns = new List<GridLineColumn>()
            {
                new GridLineColumn()
                {
                    Id = "1",
                    Type="Standard",
                    Header = "Code",
                    Fields = new List<GridLineField>()
                    {
                        new GridLineField()
                        {
                            DataType = "string",
                            Name= "Code"
                        }
                    }
                }}}
var json = JsonConvert.SerializeObject(config)
```

## JSON 
When the column is serialized in json the result can be as above. Any kind of possibility is allowed. You can generate any kind of column in any order.

## Features 

1. The generated grid can do drag and drop of the lines
2. The generated grid can do the resize of the lines.
3. The generated grid can save the settings to the cloud.
4. In the specification of the we can used or apply a formula provided by json.

## Attached Formula
The formula is based on the following grammar antlr:
```
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


```

