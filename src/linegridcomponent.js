/**
*  ========================================================================
*   Copyright (c) 2019 Karve Informatica S.L.
*   Licensed under the Karve License to our customers. 
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   EVERY USE IS STRICTLY FORBIDDEN WITHOUT A WRITTEN AGREMENT WITH Karve Informatica S.L.
* ------------------------------------------------------------------------
*  @author Giorgio Zoppi <giorgio@fleetadmiral.net>
*  @date  24th October 2019
*  @file  LineGridComponent.js  
*  @brief This a line grid application that can be used for any grid line.
*/

import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import ExtendedGridMagnifier from './ExtendedGridMagnifier.jsx';
import GridSettingSaver from './GridSettingSaver.js'
import GridSettingLoader from './GridSettingLoader.js'
import CodeResolver from './CodeResolver.js'
import { defaultDecimal, defaultRecord, defaultData, defaultIdValue, padLeft } from './helpers.js';
import { QueryBuilderComponent, ColumnsModel, RuleModel, QueryBuilder, RuleChangeEventArgs } from '@syncfusion/ej2-react-querybuilder';
import { Query, Predicate, DataManager } from '@syncfusion/ej2-data';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Container } from 'reactstrap';
import {InputStream, CommonTokenStream} from 'antlr4'
import { grid_formulaLexer } from './grid_formula/grid_formulaLexer';
import { grid_formulaParser } from './grid_formula/grid_formulaParser';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Edit,
    Filter,
    GridComponent,
    ContextMenu,
    Clipboard,
    Reorder,
    Resize,
    Inject,
    Page,
    Selection,
    Toolbar,
    ExcelExport,
    PdfExport,
    Sort
} from '@syncfusion/ej2-react-grids';

/**
 * Expression evaluator
 */

import ExpressionEvaluator from './grid_formula/ExpressionEvaluator.js'

/**
 * LineGridComponent. 
 * The component line grid component holds the responsability to extend 
 * and provide cut and paste features and cross references to other webservices
 * The description should be done via a JSON. 
 * From a JSON it generates automagically columns in the Syncfusion EJ2 component.
 * 
 */
class LineGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: this.props.isShowing, /**  dictionary that holds state of the modal open/close */
            columns: this.props.columns, /**  column description            */
            data: this.props.model.items, /**  data source                   */
            id: this.props.model.id, /**  identifier of the grid        */
            currentUser: this.props.model.currentUser, /**  current user                  */
            modals: this.props.modals, /**  list of the modal              */
            locale: this.props.model.locale, /**  locale/culture of the application */
            vatCol: this.props.vatCol,
            modalsToggleHandler:
                this.props
                    .modalsToggleHandler, /**  vector of booleans to open/close any modal associated to the grid */
            editMode: this.props.model.editMode, /**  true if the grid is edit mode */
            grpcGateway: this.props.model.grpcGateway, /**  grpcGateway for saving the grid data */
            grpcToken: this.props.model.grpcToken, /**  grpcToken for saving the grid data  */
            formula: this.props.model.formula,          /** formula to be used */
            parsedFormula: this.props.parsedFormula,    /** parsed formula to be used */
            newIdUrl : this.props.newIdUrl      /* url to fetch a new line identifier */
        }
        // rule  to import
    

       
        /**
         * Handler to be used while editing
         */
        this.actionBegin = this.actionBegin.bind(this)
        this.actionComplete = this.actionComplete.bind(this)
        this.updateShow = this.updateShow.bind(this)
        this.updateGrid = this.updateGrid.bind(this)
        this.selectionEvent = this.selectionEvent.bind(this)
        this.hideModal = this.hideModal.bind(this)
        /** Handlers for the load/save grid */
        this.saveGridSettings = this.saveGridSettings.bind(this)
        this.loadGridSettings = this.loadGridSettings.bind(this)
        // keyboard stuff to do the copy and paste.
        this.registerKeyDownHandler = this.registerKeyboardHandler.bind(this)
        this.createQueryArray = this.createQueryArray.bind(this)
        this.onGridCreated = this.onGridCreated.bind(this) 
        this.gridSelectedRecords = [];
        this.gridQueryBuilderFields = []
        this.keyDownState = false
        this.filterSettings = { type: 'Menu' }
        this.lastCutCopyPaste = "none"
        this.serializeBack = this.serializeBack.bind(this)
        this.updateFormula = this.updateFormula.bind(this)

        this.selectionSettingsModel = { mode: 'Both', type: 'Multiple' };
        // @todo to be localized

        this.contextMenuItems =
        [
            'Copy', {
                text: 'Cut',
                iconCss: 'e-cm-icons e-cut',
                id: 'cut'
            }, 'Edit', 'Delete', {
                text: 'Insert',
                iconCss: 'e-cm-icons e-insert',
                id: 'insert'
            }, {
                text: 'Paste',
                iconCss: 'e-cm-icons e-paste',
                id: 'paste'
            }
            ];

      
        // check the null state and assign a default value
        if (this.state.editMode == null) {
            this.state.editMode = false
        }
        if (this.state.isShowing == null) {
            let valueDict = {}
            this.state.isShowing = { count: 0, values: valueDict }
        }
        if (this.state.currentUser == null) {
            // the default user in the system
            this.state.currentUser = "CV"
        }

        /**
         * Grid saver amd grid settings loader. 
         */
        this.gridSaver = new GridSettingSaver(this.state.grpcGateway, this.state.currentUser, this.state.grpcToken);
        this.gridLoader = new GridSettingLoader(this.state.grpcGateway, this.state.currentUser, this.state.grpcToken);
        this.colResolver = new CodeResolver()
        this.reloadButtonTemplate = this.reloadButtonTemplate.bind(this)
        this.modalIndex = 1;
        this.state.data = JSON.parse(atob(this.state.data))
        let configData = atob(this.props.model.colsConfig)
        // we get the columns configuration.
        this.configGrid = JSON.parse(configData)
        let columns = this.configGrid.Columns
        this.columnConfig = columns
       
        this.state.formula = this.configGrid.Formula
        this.state.totalCol = this.configGrid.TotalCol
        this.state.resultCol = this.configGrid.ResultCol
        this.state.switchColName = this.configGrid.Included
        this.state.vatCol = this.configGrid.VatCol


        if (this.state.modalsToggleHandler == null) {
            this.state.modalsToggleHandler = []
        }
        if (this.state.modals == null) {
            this.state.modals = []
        }

        this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel', 'Update'];
        this.toastPosition = { X: 'Right' };
        this.selectionColumnsTemplate = []
        this.modalColumnsTemplate = []
        this.editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.dispatcher =
        {
            'Standard': (idx, col, callback) => this.createStandardColFromJson(idx, col, callback),
            'Checkbox': (idx, col, callback) => this.createCheckBoxColFromJson(idx, col, callback),
            'Selection': (idx, col, callback) => this.createSelectColFromJson(idx, col, callback),
            'SingleCodeName': (idx, col, callback) => this.createSingleCodeNameColFromJson(idx, col, callback),
            'CodeName': (col, callback) => this.createCodeNameColFromJson(col, callback)
        }
        this.nextId = this.nextId.bind(this)
        let cols = this.createColumnsFromJson(columns)
        // create modals metadata
        this.state.modals = this.createModals(this.modalColumnsTemplate)
        this.createQueryArray(cols)
        this.state.columns = cols
       
        // evaluator of expression.
       
        this.onClickContextMenu = this.onClickContextMenu.bind(this)
        this.setRecordId = this.setRecordId.bind(this)
        this.pasteRecords = this.pasteRecords.bind(this)
        this.cutRecords = this.cutRecords.bind(this)
        this.initColumnsData = this.initColumnsData.bind(this)
        this.initQueryBuilderFields = this.initQueryBuilderFields.bind(this)
        this.gridQueryBuilderFields = this.initQueryBuilderFields(columns)
        this.query = new Query().select(this.gridQueryBuilderFields)
        this.updateRule = this.updateRule.bind(this)
        this.columnsDataQueryBuilder = this.initColumnsData(columns)
        this.defaultDecimal = defaultDecimal.bind(this)
        this.state.parsedFormula = this.createParsedFormula(this.state.formula)
        this.updateFormulaEvaluation = this.updateFormulaEvaluation.bind(this)   
        this.shallUpdate = this.shallUpdate.bind(this)
        this.shallUpdateRow = this.shallUpdateRow.bind(this)
        this.getNumericComponent = this.getNumericComponent.bind(this)
        this.setNumericComponent = this.setNumericComponent.bind(this)

        this.setState({ columns: cols })
     
    }
    /**
     * Initialize the vector for the query builder component.
     * It puts the columns from the JSON template in the querable fields to be used 
     * by the QueryBuilder component
     * @param {} queryColumns   List of columns to be used from the query builder
     */

    initQueryBuilderFields(queryColumns) {
        let queryBuilderFields = []
        queryColumns.forEach(column => {
            column.Fields.forEach(field => {
                queryBuilderFields.push(field.Name)
            })
        })
        return queryBuilderFields
    }
    /**
     * Get the total component
     * @param {} name name of the component
     */
    getNumericComponent(name) {
        let totalAmount = (this.state.totalCol !=='undefined') ? document.getElementById(name) : null
        if (totalAmount != null) {
            let totalAmountComponent = ej.base.getComponent(totalAmount, 'numerictextbox')
            return totalAmountComponent
        }
        return null; 
    }
    /**
     * Set the EJ component numeric to a value 
     * @param {*} name   name of the component
     * @param {*} value  value of the component
     */
    setNumericComponent(name, value)
    {
        if ((name !=='undefined') && (value!=='undefined'))
        {
        let component = this.getNumericComponent(name)
        if (component != null){
            component.value = value
        }
        }
    }

    /**
     * Handler associated to an edit action
     * @param {*} args 
     */
    actionBegin(args) {
        let grid = this.gridInstance;

        if (args.requestType === "add") {
        // set default sto record
            defaultRecord(args.data)
        
        if (args.data.hasOwnProperty("Code")) {
                args.data["Code"] = this.nextId();

            
        } else if (args.hasOwnProperty("Id")) {
                args.data["Id"] = this.nextId();
            
        }
       }
        /*
        if (grid.pageSettings.currentPage !== 1 && grid.editSettings.newRowPosition === 'Top') {
            args.index = (grid.pageSettings.currentPage * grid.pageSettings.pageSize) -
                grid.pageSettings.pageSize;
        } else if (grid.editSettings.newRowPosition === 'Bottom') {
            args.index = (grid.pageSettings.currentPage * grid.pageSettings.pageSize) - 1;
        }*/
    }

    updateFormula()
    {
        let total = this.updateFormulaEvaluation()
        let vatValue = total * 0.21;
        let totalAmount = total + vatValue
        this.setNumericComponent(this.state.resultCol, total)
        this.setNumericComponent(this.state.vatCol, vatValue)
        this.setNumericComponent(this.state.totalCol, totalAmount)
    }

    /**
     * Handler associated to a complete action
     * @param {*} ev 
     */
    actionComplete(ev) {
        switch (ev.requestType) {
        case "beginEdit":{
            // calling registeredEvents.
            this.colResolver.registerEvents(ev)
            this.tobeSaved = true;
            //this.gridInsstartEdit()
            break;
        }
        case "refresh":
            {
                
            break;  
            }
        case "add":{
            this.tobeSaved = true;
            break;
        }
        case "delete":
        case "save":{
            if (this.tobeSaved === true)
            {
                this.gridInstance.endEdit()

                this.tobeSaved = false;
                let total = this.updateFormulaEvaluation()
                let vatValue = total * 0.21;
                let totalAmount = total + vatValue
                this.setNumericComponent(this.state.resultCol, total)
                this.setNumericComponent(this.state.vatCol, vatValue)
                this.setNumericComponent(this.state.totalCol, totalAmount)
               
             }

            
            // update total, subtotal and vat
          //  let total = this.updateFormulaEvaluation()
          //  console.log("Total formula " + total)

           // let vatValue = total * 0.21;
           // let totalAmount = total + vatValue
            /* set the external values for vat, value, total if they exists*/
           // this.setNumericComponent(this.state.resultCol, total)
          //  this.setNumericComponent(this.state.vatCol, vatValue)
          //  this.setNumericComponent(this.state.totalCol, totalAmount)  
            break;
            }
        }
    }

    /**
     * Cut the records.
     */
    cutRecords() {
        this.lastCutCopyPaste = "cut"
        // here we are storing the selected records 
        this.gridSelectedRecords = this.gridInstance.getSelectedRecords();
        // here we are deleting the selected records to perform cut opeartion 
        this.gridInstance.deleteRecord();
    }

    /**
     * Initalize the data for the columns.
     * @param {*} columns Columns to be used. 
     */

    initColumnsData(columns)
    {
        let columnData = []
        columns.forEach(cols => {
            cols.Fields.forEach(field => {
                let currentField = {
                    field: field.Name,
                    label: field.Header,
                    type: field.DataType,
                    operators: [
                        { key: 'equal', value: 'equal' },
                        { key: 'greaterthan', value: 'greaterthan' },
                        { key: 'lessthan', value: 'lessthan' }
                    ]
                }
                columnData.push(currentField)
            })
        })
        return columnData;
    }
    /**
     * Update the grid cell value
     * @param {*} primary  primary key to be used.
     * @param {*} colName  column name to be used.
     * @param {*} data     data to be used.
     */
    shallUpdateRow(index, colName, data) { 
          // this.gridInstance.endEdit()
        // Find the row index with the primary key value 
       // console.log("PrimaryKey" + primary)   
        var rowIndex = index; 
        // Get the current row data for the index and store it 
           var rowData = this.gridInstance.dataSource[rowIndex]; 
          
        // Modify the column values in the stored row data 
           rowData[colName] = data; 
        // Update the grid row with the updated row data 
           this.gridInstance.updateRow(rowIndex, rowData); 
    } 
    /**
     * Update the grid cell value
     * @param {*} primary  primary key to be used.
     * @param {*} colName  column name to be used.
     * @param {*} data     data to be used.
     */
    shallUpdate(primary, colName, data) { 
     let rowIndex = this.gridInstance.getRowIndexByPrimaryKey(primary);
     if ((rowIndex >= 0))
     {
        let rowData = this.gridInstance.currentViewData[rowIndex];
        if (rowData!=null)
        {
            if (rowData.hasOwnProperty(colName))
            {
                rowData[colName] = data;  
                this.gridInstance.updateRow(rowIndex, rowData);
            }
        }
     }
  } 

    /**
     * This method goes through the grid rows and update all the partials,
     * evaluationg end applying the formula
     */
    updateFormulaEvaluation()
    {
        let total = 0;
        var code = 0;
        if ((this.expressionEvaluator != null) && (this.gridInstance!=null)) {
           
            let partialResult = 0;
            let included = true
            let size = this.gridInstance.dataSource.length;
            for (let index = 0; index < size; ++index) {
                partialResult = this.expressionEvaluator.eval(this.state.parsedFormula, index)
                code = defaultIdValue(this.gridInstance.dataSource[index])
                let rowObjects = this.gridInstance.getRowsObject()
                if (rowObjects !== 'undefined') {
                    let rowIndex = rowObjects[index]
                    if (rowIndex!=null)
                    {
                    let currentRowGridData = rowIndex.data;
                    if (currentRowGridData.hasOwnProperty(this.state.resultCol)) {
                       
                        
                        if (!isNaN(partialResult)) {
                            let id = defaultIdValue(currentRowGridData)
                           
                           this.shallUpdateRow(index, this.state.resultCol, partialResult.toString())
                          // this.shallUpdate(id, this.state.resultCol, partialResult.toString())
                            /*
                            let resultElement = this.gridInstance.getContentTable().querySelector('tbody').querySelector(this.state.resultCol)
                            if ((resultElement !== null) && (resultElement !=='undefined')) {
                                resultElement.value = partialResult 
                            }*/
                            this.gridInstance.refresh()
                        }
                    }
                    // if there is a checkbox included.
                    if ((this.state.includedCol) && (currentRowGridData.hasOwnProperty(this.state.includedCol))) {
                        let element = this.gridInstance.getContentTable().querySelector('tbody').querySelector(this.state.includedCol)
                        if ((element !== null) && (element !=='undefined')) {
                            included = element.value 
                        }
                    }
                    }
                }
                if (included && (!isNaN(partialResult))) {
                 total+=partialResult
                }
            }
        }
        return total
    }
    /**
     * Event to handle the rule.
     * @param {*} args 
     */
    updateRule(args) {
        let predicate = this.qbObj.getPredicate(args.rule);
        if (isNullOrUndefined(predicate)) {
            this.gridInstance.query = new Query().select(this.gridQueryBuilderFields);
        }
        else {
            this.gridInstance.query = new Query().select(this.gridQueryBuilderFields)
                .where(predicate);
        }
        this.gridInstance.refresh();
    }

    /**
     * Event handler that handles the context menu.
     * @param {*} args argument to be used. 
     */
    onClickContextMenu(args) {
        
        if (this.gridInstance && args.item.id.endsWith('copy'))
        {
            this.gridSelectedRecords = this.gridInstance.getSelectedRecords(); 
        }
        if (this.gridInstance && args.item.id === 'insert') {
            let nextId = this.nextId()
            var index = this.gridInstance.selectedRowIndex + 1
            let selectedRecords = this.gridInstance.getSelectedRecords();
            // deep clone
            if (selectedRecords.length > 0) {
                let record = { ...this.gridInstance.getSelectedRecords()[0] };
                // set the dfault values after cloning and before handling

                defaultRecord(record)
                if (record.hasOwnProperty("Code")) {
                    record.Code = nextId;
                } else if (record.hasOwnProperty("Id")) {
                    record.Id = nextId;
                }
                this.gridInstance.addRecord(record, index);
                this.updateFormula()
            }
            index++

           // this.gridInstance.addRecord(newRecord)
        }
        if (this.gridInstance && args.item.id === 'cut') {
            this.cutRecords()
            this.updateFormula()
        }
        if (this.gridInstance && args.item.id === 'paste') {
            this.pasteRecords()
            this.updateFormula()
        }

    }
    /**
     * Create an array of fields to be queries 
     * @param {any} cols  columns to be used
     */
    createQueryArray(cols) {
        let queryArray = []
        cols.forEach(col =>
            queryArray.push(col.field))
        let notNullArray = queryArray.filter(item => {
            if (item != null) {
                return item
            }
        })
       this.query = new Query().select(notNullArray);
    }
    /**
     * Create a formula to be used.
     * @param {*} input Input to be used.
     */
    createParsedFormula(input)
    {
   
        let tree = null
        if (input !=='undefined')
        {
        let chars = new InputStream(input);
        let lexer = new grid_formulaLexer(chars);
        let tokens  = new CommonTokenStream(lexer);
        let parser = new grid_formulaParser(tokens);
        parser.buildParseTrees = true;
        tree = parser.formulas()
        }
        return tree
    }
   

     
    nextCodeId(rowItem)
    {
        if (typeof(row)==='string')
        {
            let number = parseInt(rowItem, 10) + 1;
            return padLeft(number.toString())
        } 
        else if (typeof(rowItem)==='numeric')
        {

           let number2 = rowItem + 1;
           return padLeft(number2.toString())                    
        }
    }
    /**
     * Return the next id for the new column
     */
    nextId()
    {
        this.nextCodeId = this.nextCodeId.bind(this)
        let rows = this.gridInstance.dataSource
        let max = -1
        let defaultCodeLen = 0;
        rows.forEach(row=>{
            if (row.hasOwnProperty("Code"))
            {
                let currentRowValue = row['Code'].toString()
                defaultCodeLen = currentRowValue.length
                max = parseInt(currentRowValue.toString(),10) > max ? parseInt(currentRowValue,10) : max; 
            } 
            else if (row.hasOwnProperty("Id"))
            {
                let currentRowValue1 = row['Id'].toString()
                defaultCodeLen = currentRowValue1.length
                max = parseInt(currentRowValue1,10) > max ? parseInt(currentRowValue1,10) : max; 
            }
        })
        max = max + 1
        return padLeft(max.toString(),defaultCodeLen)
    }
    /**
     * Key handler for pressing
     * @param {any} args    Arguments to be done.
     */
    keyPressHandler (args) { 
        this.nextId = this.nextId.bind(this)
        // this is an insertion just after the current selected item
        if (args.ctrlKey && args.code == 'Space')
        {
            this.gridInstance.startEdit()
        }
        if (args.ctrlKey && args.code=='KeyA')
        {
            let nextId = this.nextId()
            var index = this.gridInstance.selectedRowIndex + 1 
            // deep clone
            let record = { ...this.gridInstance.getSelectedRecords()[0] };
            
            // set the dfault values after cloning and before handling
            defaultRecord(record)
            
            this.gridInstance.addRecord(record, index);
            if (record.hasOwnProperty("Code"))
                {
                    this.shallUpdateRow(index, "Code", nextId)
                } 
                else if (record.hasOwnProperty("Id"))
                {
                    this.shallUpdateRow(index, "Id", nextId)
                }
            
            index++
            //this.gridInstance.selectRow(index);
		    //this.gridInstance.startEdit();
        }
        // this is the copy just after the current copies.
        if (args.ctrlKey  && args.code === 'KeyC') { 
        // here we are storing the selected records to perform copy operation 
            this.gridSelectedRecords = this.gridInstance.getSelectedRecords(); 
          this.lastCutCopyPaste  = "copy"
        } 
        // this is th copy after the key.
        if (args.ctrlKey  && args.code === 'KeyX') { 
            this.lastCutCopyPaste  = "cut"
            // here we are storing the selected records 
            this.gridSelectedRecords = this.gridInstance.getSelectedRecords(); 
        // here we are deleting the selected records to perform cut opeartion 
            this.gridInstance.deleteRecord(); 
        } 
        // this is the copy after the V
        if (args.ctrlKey  && args.code === 'KeyV') { 
            this.pasteRecords()
        }
    }
    /**
     * Paste the records 
     */
    pasteRecords() {
        var index = this.gridInstance.selectedRowIndex + 1;
        // pasting the records using addRecord method 
        if (this.gridSelectedRecords.length) {
            this.gridSelectedRecords.forEach((record) => {
                // we suppose that the primary key is code or id.
                let cloned = { ...record }
                if (this.lastCutCopyPaste == "copy") {
                    this.setRecordId(cloned)
                }
                
                this.gridInstance.addRecord(cloned, index);
                index++
            })
        }
    }
    /**
     * Set the record
     * @param {*} record set the records. 
     */
    setRecordId(record) {
        if (record.hasOwnProperty("Code")) {
            record.Code = this.nextId() + 1;
        }
        else if (record.hasOwnProperty("Id")) {
            record.Id = this.nextId() + 1;
        }
        return record
    }
         
    /**
     * Configure the main grid at at startup
     */
    gridStartup()
    {
        this.registerKeyboardHandler()
        
    }
    
    /**
     *  Register keyboard press events
     * */
    registerKeyboardHandler(){
        if (this.gridInstance!=null) {
          this.gridInstance.element.addEventListener('keydown', this.keyPressHandler.bind(this)) 
        };
    }
    
    /**
     * Update the modals state
     * @param {any} modalId  a sentence that starts with "modal"+number and it is unique.
     */
    updateShow(modalId)
    {
        let idx = modalId
        // ok when we start modal we want to end the edit mode.
        if (this.gridInstance != null)
        {
            this.gridInstance.endEdit()
        }
        // here we assume that any modal has an id that starts with the modal sentence
        let substring = modalId.substring(modalId.indexOf("l")+1)
        this.state.isShowing.values[idx]=!this.state.isShowing.values[idx];
        this.state.isShowing.count = this.state.isShowing.count++
        this.state.modals[substring].showingState = !this.state.modals[substring].showingState;
        // do the rerendering  
        this.setState({
            isShowing: this.state.isShowing,
            modals: this.state.modals
        });
    }
    /**
     * Hide the current modal that it is on topscreen
     */
    hideModal() {
        this.state.isShowing.count = this.state.isShowing.count--
        let values = this.state.isShowing.values
        let indx = 0;
        Object.keys(values).map((key, value) => {
	        values[key] = values[key] ? false : false;
            this.state.modals[indx].showingState = this.state.modals[indx].showingState ? false : false;
            indx++
        });
        this.setState({
	        isShowing: this.state.isShowing,
	        modals: this.state.modals
        });
    }
    /**
     * Create the modal columns and as side effect set the state of the their toggles.
     * @param {any} modals list of modals
     */
    createModals(modals)
    {
        var currentIdx = 0;
        let configuredModals = []
        modals.forEach((item) => {
            let modalId = "modal" + currentIdx
            let className = "modalclass" + currentIdx
            this.state.isShowing.values[modalId]=false;
            this.state.isShowing.count = currentIdx
            this.state.modalsToggleHandler.push(()=>this.updateShow(modalId))
            configuredModals.push({
                id: modalId, 
                modalCId: item.args.ModalCId,
                modalWebService: item.args.WebserviceUri,
                modalName: item.args.ModalGridId,
                modalTitle: item.args.modalTitle,
                modalSize: item.args.ModalSize,
                modalCols: item.args.ModalCols.Columns,
                showingState:  this.state.isShowing.values[modalId],
                className: className,
                componentToggle:this.state.modalsToggleHandler[currentIdx]})
            currentIdx++;
        })
        return configuredModals
    }

    /**
     *  Post mounting initialization is needed to associate the template to the columns.
     *  In particular we associate the selection columns in the grid to their templates
     *  and the modal button templates.
     */
     async componentDidMount() {
      //  await this.loadGridSettings()  
//        this.gridInstance.dataSource = this.state.i
        console.log("*** begin mount **** ")   
        var currentIndex = -1;
        this.selectionColumnsTemplate.forEach(cols => {  
                let index = 0
            // in case of moving the columns i should find the selection column to be treated specially.
                this.gridInstance.columns.forEach(currentCol => {
                    if (currentCol.field == cols.gridFieldName) {
                        currentIndex = index
                    } 
                    index++
                })
                // the index will negative if we dont find a match in the column
                if (currentIndex > 0) {
	               // currentIndex = currentIndex + 1
                    this.gridInstance.columns[currentIndex].template = () => {
		                let reactOptions = []
		                let hash = {}
		                cols.args.forEach(option => {
			                let key = "key_" + option
			                if (!hash.hasOwnProperty(key)) {
				                let domOption = React.createElement("option", { value: key }, option)
				                hash[key] = domOption
				                reactOptions.push(domOption)
			                }
		                })
		                let selectHtml = React.createElement("select", { 'key': 'selection' }, reactOptions)
		                return (selectHtml)
                    }
                    this.gridInstance.columns[currentIndex].editTemplate = () => {
		                let reactOptions = []
		                let hash = {}
		                cols.args.forEach(option => {
			                let key = "key_" + option
			                if (!hash.hasOwnProperty(key)) {
				                let domOption = React.createElement("option", { value: key }, option)
				                hash[key] = domOption
				                reactOptions.push(domOption)
			                }
		                })
		                let selectHtml = React.createElement("select", { 'key': 'selection' }, reactOptions)
		                return (selectHtml)
	                }
                }
        })
       
            this.reloadButtonTemplate()
            // expression evaluator
            this.expressionEvaluator = new ExpressionEvaluator(this.gridInstance)
           
            // ok we update the computation for each rows. Evaluating the formula.
            /*
            let total = this.updateFormulaEvaluation()
            let vatValue = total * 0.21;
            let totalAmount = total + vatValue
            this.setNumericComponent(this.state.resultCol, total)
            this.setNumericComponent(this.state.vatCol, vatValue)
            this.setNumericComponent(this.state.totalCol, totalAmount)
            */
           console.log("*** end mount **** ") 
        //   await this.loadGridSettings()  
        //   this.gridInstance.refresh()
        }
    

    reloadButtonTemplate()
    {

        let currentModal = 0;  
        this.modalColumnsTemplate.forEach(cols =>{
            let handler = this.state.modalsToggleHandler[currentModal++]
            this.gridInstance.columns[cols.index].width="80"
     		this.gridInstance.columns[cols.index].template =()=>{ 
                 return(
                     <div class="modalgrid">
                     <Button color="primary" minwidth="80" class="btn btn-primary btn-sm" onClick={handler}>
                         <i class="material-icons">search</i>
                     </Button>
                  
                </div>)
            };
            this.gridInstance.columns[cols.index].width="80"
            this.gridInstance.columns[cols.index].editTemplate = () => {
	            return (
	            <div>
		            <Button color="primary" minwidth="80" class="btn btn-primary btn-sm" onClick={handler}>
		            <i class="material-icons">search</i>
		            </Button>

		            </div>)
            };
            })
           

    }

    /***
     * Setting the query builder after grid creation
     */
    onGridCreated() {
	    this.updateRule({ rule: this.qbObj.getValidRules(this.qbObj.rule) });
        //setTimeout(this.loadGridSettings(), 50);
    }

    /***
     * Create grid modal columns from the list of columns.
     * @param columns Column list to be created.
     */
    createColumnsFromJson(columns) {

	    let skip = 0;
        let gridColumns = []
        let idx = 0
        // we store the boundary 
        let currentLen = columns.length 
        columns.forEach(column=>{
            let type = column.Type;
                // in this case the dispatcher create three columns
                // theoretically could produce more.
                // @todo move the columns step in the json description
            if (column.Type == 'CodeName') {

                // at least i have a code, a name, a button
                idx = (idx + 3 < currentLen) ? idx + 3 : currentLen

            }
            else if (column.Type == 'SingleCodeName') {
	            idx = (idx + 1 < currentLen) ? idx + 1 : currentLen

            }
                // @fixme not sure about a null callack in this case.
                let createdCol = this.dispatcher[type](idx++, column, ()=>{})
                if (createdCol != null)
                {
                if  (Array.isArray(createdCol))
                {
                        createdCol.forEach(item=>
                        {
                            // just cloone it
                            gridColumns.push({ ...item })
                        })
                    }
                    else 
                    {
                        gridColumns.push(createdCol)
                    }
                }
        })
        return gridColumns
    }


    serializeBack() {
        let items = JSON.stringify(grid.dataSource)
        let inputType = document.getElementById(this.configGrid.JsonField)
        if (inputType != null) {
            inputType.value = items
        }
    }

    /**
     * Create a list of columns from a deserialized json descriptor.
     * The list of columns is : textbox1, textbox2, ..., button
     * The button will raise a modal with a grid that referes 
     * to a remote webservice
     * @param {*} idx       index to be used. 
     * @param {*} col       column descriptor.
     * @param {*} callback  modal callback
     */
    createCodeNameColFromJson(idx, col, callback) {

	    let columns = []
        let index = 0
 	    if (col.Fields.length > 0) {
		    // here we create 
		    col.Fields.forEach(field => {
			    let currentWidth = field.Width == null ? 120 : field.Width;
			   // if (!field.Hidden) {
				    let fieldColumn = {
					    field: field.Name,
					    headerText: field.Header,
                        width: currentWidth,
                        visible: !field.Hidden,
					    allowEditing: true,
					    type: field.DataType,
					    editType: field.DataType
				    }
				    columns.push(fieldColumn);
			    //}
            })

            /*
            *  Here we prepare for the future resolution, for the moment we suppose that there is just a 2 field CodeName 
            */ 
            if (col.Fields.length === 2)
            {
                this.colResolver.addCodeName(col.Fields[0].Name, col.Fields[1].Name, col.WebserviceUri)
            }
            let buttonField = "ButtonField" + (idx + 2)
            let columnTemplate = { headerText: "Busca", field: buttonField, allowFiltering: false }
		    columns.push(columnTemplate)
		    if (col.ModalGridId == null) {
			    col.ModalGridId = "modalGridId" + idx
		    }
		    let fieldNames = []
		    col.Fields.forEach(field => {
			    fieldNames.push(field.Name)
		    })

		    let cacheValue = {
			    index: idx - 1,
			    args: col,
			    modalState: false,
			    codeNameFields: fieldNames
            }
            this.modalColumnsTemplate.push(cacheValue)
		    return columns
	    }

    }

    /**
     * Create a list of columns from a deserialized json descriptor.
     * The list of columns is : textbox1, textbox2, ..., button
     * The button will raise a modal with a grid that referes 
     * to a remote webservice
     * @param {*} idx       index to be used. 
     * @param {*} col       column descriptor.
     * @param {*} callback  modal callback
     */
    createSingleCodeNameColFromJson(idx, col, callback) {
        let columns = []
		let index = 0
        if (col.Fields.length > 0) {
	        let field = col.Fields[0]
	        let currentWidth = field.Width == null ? 120 : field.Width;

	        let fieldColumn = {
		        field: field.Name,
		        headerText: field.Header,
		        width: currentWidth,
                allowEditing: true,
                visible: !field.Hidden,
                type: field.DataType,
		        editType: field.DataType
	        }
	        columns.push(fieldColumn);
	        // create fields.
	        let buttonField = "ButtonField" + idx
	        let columnTemplate = { headerText: "Busca", field: buttonField, allowFiltering: false }
            columns.push(columnTemplate)
	        if (col.ModalGridId == null) {
		        col.ModalGridId = "modalGridId" + idx
	        }
	        let fieldNames = []
	        col.Fields.forEach(field => {
		        fieldNames.push(field.Name)
	        })

	        let cacheValue = {
		        index: idx,
		        args: col,
		        modalState: false,
		        codeNameFields: fieldNames
	        }
	        this.modalColumnsTemplate.push(cacheValue)
        }
        return columns
	}
    /**
     * Create a checkbox column from JSON.
     * @param {*} idx       Index
     * @param {*} col       Column 
     * @param {*} callback  Callback
     */
    createCheckBoxColFromJson(idx, col, callback)
    {
        if ((col.Fields.length) > 0) {
            let field = col.Fields[0]            
            let columnTemplate = { field: field.Name, headerText: col.Header, allowEditing: true, type: "boolean", editType: "booleanedit", displayAsCheckBox: "true" }
            return columnTemplate;
	    }
    }

    /**
     * createSelectColFromJson
     * It has a side effect to fill the selection columns template
     * @param {*} idx       Index of the column
     * @param {*} col       Column to be done
     * @param {*} callback  Callback.
     */
    createSelectColFromJson(idx, col, callback)
    {
        if (col.Fields.length > 0) 
        {
            let field = col.Fields[0]
            let currentWidth = field.Width == null ? 120 : field.Width;
            let columnTemplate = { field: field.Name, headerText: col.Header, width: currentWidth, type: field.DataType, editType: field.DataType, allowEditing: false }
            let cacheValue = { index: idx, gridFieldName: field.Name, func: this.selectionTemplate, args: col.Fields[0].SelectionValues }
            this.selectionColumnsTemplate.push(cacheValue)
            if (callback != null)
            {
                callback(columnTemplate)
            }
            return columnTemplate   
        }
    }
    /**
     * Create a standard column from Json
     * A standard column is simply a column with just one textbox that can be of any supported type: (date, numeric, string,..)
     * Here we use a convention that if the name is Code or Id it is assumed that it is a primary key. 
     * @param {*} idx  Index of the column
     * @param {*} col  Description of the column
     * @param {*} callback Callback
     */
    createStandardColFromJson(idx, col, callback) {
       
        if (col.Fields.length > 0) 
        {

            let field = col.Fields[0]
            let currentWidth = field.Width == null ? 120 : field.Width;
            let columnTemplate = {}
            if ((field.Name != 'Code') && (field.Name != 'Id')) {
                // i assume that aa primary key is a code or and id.
	            columnTemplate = {
                    field: field.Name,
                    allowEditing: true,
		            headerText: col.headerText,
		            width: currentWidth,
		            type: field.DataType,
                    editType: field.DataType,
                    format: field.Format,
                    visible: !field.Hidden
	            }
            } else
            {
                columnTemplate = {
	                isPrimaryKey : true,
		            field: field.Name,
		            headerText: col.headerText,
		            width: currentWidth,
                    type: field.DataType,
                    format: field.Format,
                    allowEditing: false,
                    editType: field.DataType,
	                visible: !field.Hidden
	            }
            }
            if (callback != null)
            {
                callback(columnTemplate)
            }
            
            return columnTemplate   
        }
    }
    /**
     * Event to be selected, This is a callback that gets calls 
     * when the modal select an item.
     * When the modal select the line passes the selected row to the selectionEvent
     * When the grid is updated it hide the modal. 
     * @param {*} data 
     */
    selectionEvent(data) {

            let idx = data.id
            let modalSelection = data.rows[0]
          
            //this.gridInstance.query = null;
            let selectedrecords = this.gridInstance.getSelectedRecords();
            if (selectedrecords != null) {
                this.modalColumnsTemplate.forEach(col => {
                    if ((col.args.ModalCols != null) &&
                        (col.args.ModalCols.Columns.length > 0)) {
                        if ((col.args.ModalCId!=null) && (col.args.ModalCId === idx)){

                            let selectedFields = col.args.ModalCols.Columns[0].Fields
                            for (let pos = 0; pos < selectedFields.length; pos++) {
                                if (pos < col.codeNameFields.length) {
                                    let name = col.codeNameFields[pos]
                                    let selectedName = selectedFields[pos].Name
                                    if (modalSelection[selectedName] != null) {
                                        this.updateGrid(name, modalSelection[selectedName])
                                    }
                                }
                            }
                        }

                    }
                })
            }
            // this.gridInstance.query = savedQuery
            this.hideModal()
    }

    /**
     * Update the first selected row. If none is selected the first line will be updated
     * @param {*} name    Name of the cell to be selected 
     * @param {*} value   Value of the cell to be selected
     */
    updateGrid(name, value) {
        
        if ((name == null) || (value == null))
        {
            throw 'Name and Value of the cell should be provided'
        }
        var selectedrowindex = this.gridInstance.getSelectedRowIndexes(); // get the selected row indexes.
        var correctGridIndex = selectedrowindex[0]
        if (correctGridIndex == null) {
            correctGridIndex = 0
        }
	    // in case we are in edit mode we shall exit from them before replacing the selection
	    var currentName = name
        if ((currentName != null) && (value != null)) {
  
		    this.gridInstance.endEdit();
		    if (!this.state.isEditMode) {
			    var currentRowGridData = this.gridInstance.getRowsObject()[correctGridIndex].data;
			    if (currentRowGridData.hasOwnProperty(currentName)) {
                    // currentRowGridData[currentName] = {..value }
                    let id = defaultIdValue(currentRowGridData)
                    this.shallUpdate(id, currentName, value)
                    this.gridInstance.refresh()
                }
		    }
	    }
    }

    /**
     * Cargo los grid settings.
     */
    async loadGridSettings()
    {
        console.log("**** Grid settings **** ")   
 
        let gridId = this.state.id
        if (gridId == null)
        {
            throw 'Grid identifier should defined'
        }
        try 
        {
            
            await this.gridLoader.loadGridAsync(gridId, this.gridInstance)
          // this.reloadButtonTemplate()
            return true

        } 
        catch(error)
        {
            console.log("Grid settings load error:"+ error)
             
        }
        console.log("**** End Grid settings **** ")   
        return false
    }
    /**
     *  save the current grid setting deserializing the grid itself. 
     */
    async saveGridSettings() {
        event.preventDefault();
        let gridId = this.state.id;
        if (gridId == null)
        {
            throw 'Grid identifier should defined'
        }
        try 
        {
            await this.gridSaver.saveGridAsync(gridId, this.gridInstance);
            this.notifySuccessToastNotification()
        } 
        catch(error)
        {
            this.notifyErrorToastNotification(error)
        }
    }
    
    /**
    * Save the notification 
    */
    
    notifySuccessToastNotification()
    {
        this.toastObj.show({
            title: 'Grid Tool',
            content: "Grid guardada con exito",
            icon: 'e-save',
        });
    }
    /**
    * Save the notification.
    * @param {*} error error to be notified. 
    */
    notifyErrorToastNotification(error)
    {
        this.toastObj.show({
            title: 'Grid Tool',
            content: error,
            icon: 'e-save',
        });
    }
    onToastClose(args) {
        let btnEleHide = document.getElementById('toastBtnHide')
        if (e.toastContainer.childElementCount === 0) {
            btnEleHide.style.display = 'none'
        }
    }

    render() {
        this.gridStartup = this.gridStartup.bind(this)
	    return (
            <div className="Parent" >
                <div className='control-section'>
                <ToastComponent ref={(toast) => { this.toastObj = toast }}
                    id='toast_default'
                    position={this.toastPosition}
                    close={this.onToastClose.bind(this)}>
                    </ToastComponent>
                    <Container>
                    <Row>
                            <Col xs="12">

                                <QueryBuilderComponent width='100%'
                            dataSource={this.state.data}
                            columns={this.columnsDataQueryBuilder}
                            ruleChange={this.updateRule.bind(this)}
                            ref={(scope) => { this.qbObj = scope; }}>
                                </QueryBuilderComponent>
                            </Col>

                        </Row>
                        <Row>
                        <ButtonComponent cssClass='e-primary'
onClick={this.saveGridSettings}>
    Guarda Impostaciones</ButtonComponent>
                            <GridComponent ref={grid => this.gridInstance = grid}
                                dataSource={this.state.data} 
                        id={this.state.id}            
                        modal = {this.state.modal}
                        allowFiltering={true}
                        allowPaging={true}
                        allowReordering={true}
                        load={this.gridStartup}
                        allowResizing={true}
                        allowSorting={true}
                        actionComplete={this.actionComplete}
                        actionBegin={this.actionBegin}
                        selectionSettings={this.selectionSettingsModel}
                        contextMenuItems={this.contextMenuItems}
                        contextMenuClick={this.onClickContextMenu}
                        allowReordering={true}
                        toolbar={this.toolbarOptions}
                        allowSelection={true}
                        create={this.onGridCreated}
                        filterSettings={this.filterSettings}
                        editSettings={this.editOptions}
                        columns={this.state.columns}>
                        <Inject services={[Filter,Sort,Page,ContextMenu,Selection, Resize,Reorder, Edit, Resize,Toolbar,Clipboard, ExcelExport, PdfExport]} />
                    </GridComponent>
                        </Row>
                    </Container>
                </div>
                <div className="modal">
                    {this.state.modals.map(item => (

                           // Without the `key`, React will fire a key warning
                <React.Fragment key={item.id}>
                            <Modal isOpen={item.showingState} size={item.modalSize} toggle={item.componentToggle} className={item.className}>
                            <ModalHeader toggle={item.componentToggle}>{item.modalTitle}</ModalHeader>
                            <ModalBody>
                                <ExtendedGridMagnifier
									ref={(modalGrid) => { this.modalGrid = modalGrid }}
                                    webserviceUri={item.modalWebService}
                                        name={item.modalGridId}
                                        cid={item.modalCId}
                                    columns={item.modalCols}
                                    selectionEvent={this.selectionEvent}/>
                                </ModalBody>
					<ModalFooter>
                    <Button color="primary" onClick={item.componentToggle}>Seleccione</Button>{' '}
                    <Button color="secondary" onClick={item.componentToggle}>Cancela</Button>
                </ModalFooter>
                </Modal>
                </React.Fragment>))}
                </div>
                    
    </div>

        );
    }
}
export default LineGridComponent;
ReactDOM.render(	
    <LineGridComponent model={gridModel} modal={false} ref={(linegrid) => { window.linegrid = linegrid }} />, document.getElementById('appId'));