# Karve LineGrid Component.
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
