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
import { QueryBuilderComponent, ColumnsModel, RuleModel, QueryBuilder, RuleChangeEventArgs } from '@syncfusion/ej2-react-querybuilder';
import { Query, Predicate, DataManager } from '@syncfusion/ej2-data';
import { MouseEventArgs } from '@syncfusion/ej2-base';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Edit,
    Filter,
    GridComponent,
    ContextMenu,
    Clipboard,
    Reorder,
    Resize,
    RowDD,
    Inject,
    Page,
    Selection,
    Toolbar,
    ExcelExport,
    PdfExport,
    Sort
} from '@syncfusion/ej2-react-grids';

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
            isShowing: this.props.isShowing,                      /**  dictionary that holds state of the modal open/close */
            columns: this.props.columns,                          /**  column description            */
            data: this.props.model.items,                         /**  data source                   */
            id: this.props.model.id,                              /**  identifier of the grid        */
            currentUser: this.props.model.currentUser,            /**  current user                  */
            modals: this.props.modals,                            /**  list of the modal              */
            locale: this.props.model.locale,                      /**  locale/culture of the application */
            modalsToggleHandler: this.props.modalsToggleHandler,  /**  vector of booleans to open/close any modal associated to the grid */
            editMode: this.props.model.editMode,                  /**  true if the grid is edit mode */
            grpcGateway: this.props.model.grpcGateway,            /**  grpcGateway for saving the grid data */
            grpcToken: this.props.model.grpcToken                 /**  grpcToken for saving the grid data  */  
        }
        // rule  to import
        this.importRules = {
	        'condition': 'or',
	        'rules': [{
		        'label': 'Code',
		        'field': 'Code',
		        'type': 'string',
		        'operator': 'equal',
		        'value': ''
	        }]
        }
        this.updateShow = this.updateShow.bind(this)
        this.updateGrid = this.updateGrid.bind(this)
        this.selectionEvent = this.selectionEvent.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.saveGridSettings = this.saveGridSettings.bind(this) 
        this.loadGridSettings = this.loadGridSettings.bind(this)
        // keyboard stuff to do the copy and paste.
        this.registerKeyDownHandler = this.registerKeyboardHandler.bind(this)
        this.createQueryArray = this.createQueryArray.bind(this)
        this.gridSelectedRecords = []; 
        this.keyDownState = false
        this.filterSettings = { type: 'Menu' }
        this.lastCutCopyPaste = "none"
        this.selectionSettingsModel = { mode: 'Both' , type: 'Multiple' };
        // @todo to be localized
        this.state.contextMenuItems = ['Copy', 'Edit', 'Delete', 'Save'];
        // check the null state and assign a default value
        if (this.state.editMode == null) {
	        this.state.editMode = false
        }
        if (this.state.isShowing == null)
        {
            let valueDict = {}
            this.state.isShowing = { count: 0, values: valueDict}
        }
        if (this.state.currentUser == null) {
            // the default user in the system
	        this.state.currentUser = "CV"
        }
        // the grid token is ok.
        this.gridSaver = new GridSettingSaver(this.state.grpcGateway, this.state.currentUser, this.state.grpcToken);
        this.gridLoader = new GridSettingLoader(this.state.grpcGateway, this.state.currentUser, this.state.grpcToken);
        this.modalIndex = 1;
        this.state.data = JSON.parse(atob(this.state.data))
        // we get the columns configuration.
        let columns = JSON.parse(atob(this.props.model.colsConfig)).Columns
        console.log("JSON column description " + JSON.stringify(columns))
        if (this.state.modalsToggleHandler == null)
        {
            this.state.modalsToggleHandler = []
        }
        if (this.state.modals == null)
        {
            this.state.modals = []
        }
        
        this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel', 'Update'];
        this.toastPosition = { X: 'Right' };
        this.selectionColumnsTemplate = []
        this.modalColumnsTemplate = []
        this.editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.dispatcher = 
        {
            'Standard': (idx, col, callback) => this.createStandardColFromJson(idx,col, callback),
            'Checkbox': (idx, col, callback) => this.createCheckBoxColFromJson(idx, col, callback),
            'Selection': (idx, col, callback) => this.createSelectColFromJson(idx, col, callback),
            'CodeName': (col, callback) => this.createCodeNameColFromJson(col, callback)   
        }
        let cols = this.createColumnsFromJson(columns)
        // create modals metadata
        this.state.modals = this.createModals(this.modalColumnsTemplate)
        this.createQueryArray(cols)
        this.state.columns = cols
        this.setState({columns: cols})
    };

    /**
     * Create an array of fields to be queries 
     * @param {any} cols  columns to be used
     */
    createQueryArray(cols) {
        let queryArray = []
        cols.forEach(col =>
            queryArray.push(col.field))
        console.log(JSON.stringify(queryArray))
        let notNullArray = queryArray.filter(item => {
            if (item != null) {
                return item
            }
        })
       this.query = new Query().select(notNullArray);
    }
    defaultRecord(record)
    {
        for (var key in record) {
            if (record.hasOwnProperty(key)) {
                /* useful code here */
                switch(typeof(record[key]))
                {
                    case 'string': {
                        Reflect.set(record, key, '');
                        break;
                    }
                    case 'number': {
                        Reflect.set(record, key, 0);
                        break;
                    }
                    case 'boolean': {
                        Reflect.set(record, key, false);
                        break;
                    }
                    default:
                        Reflect.set(record, key, false);
                }
            }
        }   
    }
    nextId()
    {
        let rows = this.gridInstance.getRows()
        let candidate = rows.length
        let max = candidate + 1
        rows.forEach(row=>{
            if (row.hasOwnProperty("Code"))
            {
                max = Math.max(max, row.Code) + 1
            } 
            else if (row.hasOwnProperty("Id"))
            {
                max = Math.max(max, row.Id) + 1
               
            }
        })
        return max
    }
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
            this.defaultRecord(record)
            if (record.hasOwnProperty("Code"))
                {
                    record.Code = nextId;
                } 
                else if (record.hasOwnProperty("Id"))
                {
                    record.Id = nextId;
                }
            console.log(JSON.stringify(record))
            this.gridInstance.addRecord(record, index);
            index++
            console.log("Selected row" + index)
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
          var index = this.gridInstance.selectedRowIndex; 
        // pasting the records using addRecord method 
           if (this.gridSelectedRecords.length) { 
            this.gridSelectedRecords.forEach((record , index)=> {
                // we suppose that the primary key is code or id.
                if (this.lastCutCopyPaste == "copy")
                {       
                if (record.hasOwnProperty("Code"))
                {
                    record.Code = this.gridSelectedRecords.length + 1;
                } 
                else if (record.hasOwnProperty("Id"))
                {
                    record.Id = this.gridSelectedRecords.length + 1;
                }
                }
              this.gridInstance.addRecord(record, index); 
              index++ 
            }) 
        }
    }    
    } 
         
    /**
     * Configure the main grid at at startup
     */
    gridStartup()
    {
        this.registerKeyboardHandler()
    
        this.gridInstance.element.addEventListener('focusout', this.focusHandler.bind(this))
        this.gridInstance.addEventListener('CellSelected', this.cellSelected.bind(this))    
        // let instance = this.gridInstance;
        // enable editin
        /*instance.element.addEventListener('mousedown', function (e) {
	        if (e.target.classList.contains("e-rowcell")) {
		        if (instance.isEdit)
			        instance.endEdit()
		        let index= parseInt(e.target.getAttribute("Index"))
		        instance.selectRow(index);
		        instance.startEdit();
	        };
        });*/
    }

    cellSelected(args)
    {
        console.log("Cell Selected"+JSON.stringify(args))
    }
    focusHandler()
    {

        let selectedCell = this.gridInstance.getSelectedRowCellIndexes();
        console.log("grid outfocus +" + JSON.stringify(selectedCell))
    }
    /** register */
    registerKeyboardHandler(){
        if (this.gridInstance!=null) {
          console.log("Registering keydown and key up")
          this.gridInstance.element.addEventListener('keydown', this.keyPressHandler.bind(this)) };
       //   this.gridInstance.element.addEventListener('keydown', this.keyDownHandler);
      //    this.gridInstance.element.addEventListener('keyup', this.keyUpHandler);
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
        console.log("Modals "+JSON.stringify(modals))
        modals.forEach((item) => {
            console.log("Item " + JSON.stringify(item))
            let modalId = "modal" + currentIdx
            let className = "modalclass" + currentIdx
            this.state.isShowing.values[modalId]=false;
            this.state.isShowing.count = currentIdx
            console.log("lastvalue "+ currentIdx)
            this.state.modalsToggleHandler.push(()=>this.updateShow(modalId))
            configuredModals.push({
                id: modalId,
                modalWebService: item.args.WebserviceUri,
                modalName: item.args.ModalGridId,
                modalTitle: item.args.modalTitle,
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
    componentDidMount() {   
        /** the load logic should respect that template. */
        //   this.loadGridSettings();
        var currentIndex = -1;

        this.selectionColumnsTemplate.forEach(cols => {  
                console.log("Name of the field  :" + cols.gridFieldName)  
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
                    console.log("Index " + currentIndex + "Columns " + JSON.stringify(this.gridInstance.columns))
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
       
        let currentModal = 0;  
        console.log("Modals " + this.modalColumnsTemplate.length)
        this.modalColumnsTemplate.forEach(cols =>{
            let handler = this.state.modalsToggleHandler[currentModal++]
            this.gridInstance.columns[cols.index].template =()=>{ 
                 return(
                     <div class="modalgrid">
                     <Button color="primary" minwidth="80" class="btn btn-primary btn-sm" onClick={handler}>
                         <i class="material-icons">search</i>
                     </Button>
                  
                </div>)
            };
            this.gridInstance.columns[cols.index].editTemplate = () => {
	            return (
	            <div class="modalgrid">
		            <Button color="primary" minwidth="80" class="btn btn-primary btn-sm" onClick={handler}>
		            <i class="material-icons">search</i>
		            </Button>

		            </div>)
            };
            }) 
            // ok in this case we load the settings.
        }


    /***
     * Created rule.
     */
    onGridCreated() {
	   // this.updateRule({ rule: this.qbObj.getValidRules(this.qbObj.rule) });
    }
    /***
     * Create grid modal columns from the list of columns.
     * @param columns Column list to be created.
     */

    createColumnsFromJson(columns) {

        console.log("JSON cols :" +  JSON.stringify(columns))
        let gridColumns = []
        let idx = 0
        // decode the model.
    
        columns.forEach(column=>{
            let type = column.Type;
                // in this case the dispatcher create three columns
                // theoretically could produce more.
                // @todo move the columns step in the json description
                if (column.Type == 'CodeName')
                {
                    // at least i have a code, a name, a button
                   
                    idx = idx + 3
                }
                // @fixme not sure about a null callack in this case.
                let createdCol = this.dispatcher[type](idx++, column, ()=>{})
                if (createdCol != null)
                {
                if  (Array.isArray(createdCol))
                    {
                        createdCol.forEach(item=>
                        {
                            gridColumns.push(item)
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

    
    /**
     * Create a list of columns from a deserialized json descriptor.
     * The list of columns is : textbox1, textbox2, ..., button
     * The button will raise a modal with a grid that referes 
     * to a remote webservice
     * @param {*} idx       index to be used. 
     * @param {*} col       column descriptor.
     * @param {*} callback  modal callback
     */
    createCodeNameColFromJson(idx,col, callback)
    {
        
        let columns = []
	
        if (col.Fields.length > 0) 
        {
            // create fields.
            col.Fields.forEach(field => {
                let currentWidth = field.Width == null ? 120 : field.Width;
                if (!field.Hidden) {
	                let fieldColumn = {
		                field: field.Name,
		                headerText: field.Header,
		                width: currentWidth,
		                allowEditing: true,
		                type: field.DataType,
		                editType: field.DataType
	                }
	                columns.push(fieldColumn);
                }
            })
            
            let columnTemplate = {  headerText: "Busca",  gridFieldName:'ButtonField' }
            columns.push(columnTemplate)
            if (col.ModalGridId == null) {
                col.ModalGridId = "modalGridId"+idx
            }
            let fieldNames = []
            col.Fields.forEach(field => {
                fieldNames.push(field.Name)
            })
           
            let cacheValue = {
                index: idx - 1,
                args: col,
                modalState: false,
                codeNameFields : fieldNames
            }
            this.modalColumnsTemplate.push(cacheValue)           
            return columns   
        }
        
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
            console.log("Selection value" + JSON.stringify(cacheValue))
            this.selectionColumnsTemplate.push(cacheValue)
            console.log("Name " + JSON.stringify(columnTemplate))
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
		            headerText: col.headerText,
		            width: currentWidth,
		            type: field.DataType,
		            editType: field.DataType
	            }
            } else
            {
                columnTemplate = {
	                isPrimaryKey : true,
		            field: field.Name,
		            headerText: col.headerText,
		            width: currentWidth,
		            type: field.DataType,
		            editType: field.DataType
	            }
            }
            if (callback != null)
            {
                callback(columnTemplate)
            }
            console.log("Name " + JSON.stringify(columnTemplate))
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
    selectionEvent(data)
    {
        let modalSelection = data[0]
        let selectedrecords = this.gridInstance.getSelectedRecords();
        if (selectedrecords != null) {
            this.modalColumnsTemplate.forEach(col => {
                if ((col.args.ModalCols != null) &&
                    (col.args.ModalCols.Columns.length > 0))
                {
                    let selectedFields = col.args.ModalCols.Columns[0].Fields
                    for (let pos = 0; pos < selectedFields.length; pos++) {
	                    if (pos < col.codeNameFields.length) {
		                    let name = col.codeNameFields[pos]
		                    let selectedName = selectedFields[pos].Name
		  
		                    this.updateGrid(name, modalSelection[selectedName])
	                    }

                    }
                }
            })
        }
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
        console.log("FieldKey " + name + "FieldName" +value)
        var selectedrowindex = this.gridInstance.getSelectedRowIndexes(); // get the selected row indexes.
        var correctGridIndex = selectedrowindex[0]
        if (correctGridIndex == null) {
            correctGridIndex = 0
        }
	    // in case we are in edit mode we shall exit from them before replacing the selection
	    let currentName = name
        if ((currentName != null) && (value != null)) {
            console.log("Close editing" + value)

		    this.gridInstance.endEdit();
		    if (!this.state.isEditMode) {
			    let currentRowGridData = this.gridInstance.getRowsObject()[correctGridIndex].data;
			    console.log("Close editing" + JSON.stringify(currentRowGridData))
			    if (currentRowGridData.hasOwnProperty(currentName)) {
				    console.log("Set cell value")
                    this.gridInstance.setCellValue(currentRowGridData.Code, currentName, value)
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
        let gridId = this.state.id
        if (gridId == null)
        {
            throw 'Grid identifier should defined'
        }
        try 
        {
            await this.gridLoader.loadGridAsync(gridId, this.gridInstance)
        } 
        catch(error)
        {
            console.log("Grid settings load error:"+ error)
        }
    }
    /**
     *  save the current grid setting deserializing the grid itself. 
     */
    async saveGridSettings() {
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
            console.error("Grid save error:"+ error)
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
    /**
     * rendering
     */
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
                    <ButtonComponent cssClass='e-primary' onClick={this.saveGridSettings}>Save Settings</ButtonComponent>
                    <GridComponent ref={grid => this.gridInstance = grid} dataSource={this.state.data} 
                        id={this.state.id}
                        modal = {this.state.modal}
                        allowFiltering={true}
                        allowPaging={true}
                        allowReordering={true}
                        allowRowDragAndDrop={true} 
                        load={this.gridStartup}  
                        allowResize={true}
                        allowSorting={true}
                        selectionSettings={this.selectionSettingsModel}
                        contextMenuItems={this.state.contextMenuItems}
                        allowReordering={true}
                        toolbar={this.toolbarOptions}
                        allowSelection={true}
                        filterSettings={this.filterSettings}
                        editSettings={this.editOptions}
                        columns={this.state.columns}>
                        <Inject services={[Filter,Sort,RowDD,Page,ContextMenu,Selection, Resize,Reorder, Edit, Resize,Toolbar,Clipboard, ExcelExport, PdfExport]} />
                    </GridComponent>
                
                </div>
                <div className="modal">
                    {this.state.modals.map(item => (
                       
             // Without the `key`, React will fire a key warning
                <React.Fragment key={item.id}>
                    <Modal isOpen={item.showingState} toggle={item.componentToggle} className={item.className}>
                            <ModalHeader toggle={item.componentToggle}>{item.ModalTitle}</ModalHeader>
                            <ModalBody>
                                <ExtendedGridMagnifier
									ref={(modalGrid) => { this.modalGrid = modalGrid }}
                                    webserviceUri={item.modalWebService}
                                    name={item.modalName}
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