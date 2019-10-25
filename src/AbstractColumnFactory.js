/**
*========================================================================
* Copyright(c) 2019 Karve Informatica S.L.
* Licensed under the Karve License to our customers. 
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* EVERY USE IS STRICTLY FORBIDDEN WITHOUT A WRITTEN AGREMENT WITH Karve Informatica S.L.
* ------------------------------------------------------------------------
*  @author Giorgio Zoppi <giorgio@apache.org>
*  @date  14th Octuber 2019
*  @file  AbstractCoulumnFactory.js
*  @brief Factories for the creation of a dynamically generated columns
*/

/**
 * ColumnNullChecker
 * @brief       Check if the input column is null or not.
 * @constructor column to be used.
 */
class ColumnNullChecker {
    constructor(column) {
        this.column = column
    }
    enforceNotNull() {
	    if (this.column == null) {
		    throw 'Invalid column'
	    }
	    if (this.column.Fields == null) {
		    throw 'Invalid column'
	    }
    }
}
/**
 * FieldColumnFactory
 * @brief Create a string/data/numeric column with just one field.
 * @constructor column description to be used.
 */
class FieldColumnFactory {
	constructor() {

	}
	/**
	 * setParam
	 * @param {*} index    	index of the column 
	 * @param {*} column 	column name of the column
	 * @param {*} callback  callback of the column
	 */
	setParam(index, column, callback) {
		this.column = column
	}
	/**
	 * create a column template
	 */
	createColumn() {
		let field = this.column
		let currentWidth = field.Width == null ? 120 : field.Width;
		let columnTemplate = { field: field.Name, headerText: field.Header, width: currentWidth, type: field.DataType, editType: field.DataType }
		return columnTemplate
	}
}
/**
 * StandardColumnFactory
 * @brief Create a string/data/numeric column with just one field.
 * @constructor column description to be used.
 */
class StandardColumnFactory {
	constructor() {

	}
	/**
	 * CSet the parameters of the column
	 * @param {*} index  index - no used
	 * @param {*} column column description to be used
	 * @param {*} callback callback not used
	 */
	setParam(index, column, callback) {
        this.column = column
        this.checker = new ColumnNullChecker(column)
	}
	/**
	 * create a column
	 */
    createColumn()
    {
        this.checker.enforceNotNull()
	    if (this.column.Fields.length > 0) {

            let field = this.column.Fields[0]
		    let currentWidth = field.Width == null ? 120 : field.Width;
		    let columnTemplate = { field: field.Name, headerText: this.column.headerText, width: currentWidth, type: field.DataType, editType: field.DataType }
		    return columnTemplate
        }
	    return null;
    }
}
/**
 * CheckBoxColumnFactory
 * @brief Create a column to be a checkbox.
 */
class CheckBoxColumnFactory {
	constructor() {

	}
	/**
	 * Set a parameters 
	 * @param {*} index   	Index to be used
	 * @param {*} column 	Column to be used
	 * @param {*} callback  Callback
	 */
	setParam(index, column, callback) {
        this.index = index
        this.column = column
        this.callback = callback
        this.checker = new ColumnNullChecker(column)
	}
	/**
	 * createColumn
	 */
    createColumn() {
        this.checker.enforceNotNull()
        if ((this.column.Fields.length) > 0) {
	        let field = this.column.Fields[0]
	        let columnTemplate = { field: field.Name, headerText: this.column.Header, allowEditing: true, type: "boolean", editType: "booleanedit", displayAsCheckBox: "true" }
	        return columnTemplate;
        }
	}
}
/**
 * SelectionColumnFactory
 * @brief Create a column to be a selection.
 */
class SelectionColumnFactory {
	constructor() {

	}

	/**
	 * Set parameters  
	 * @param {*} index   	index to be used
	 * @param {*} column 	column to be used
	 * @param {*} callback 	callback to be used
	 */
	setParam(index, column, callback) {
        this.index = index
        this.checker = new ColumnNullChecker(column)
        this.column = column
        this.callback = callback
	}
	/**
	 * createColumn
	 */
    createColumn() {
        this.checker.enforceNotNull()
        if (this.column.Fields.length > 0) {
	        let field = this.column.Fields[0]
	        let currentWidth = field.Width == null ? 120 : field.Width;
	        let columnTemplate = {
		        field: field.Name,
		        headerText: this.column.Header,
		        width: currentWidth,
		        type: field.DataType,
		        editType: field.DataType
	        }
	        let cacheValue = { index: idx, func: this.selectionTemplate, args: this.column.Fields[0].SelectionValues }
	        if (callback != null) {
		        this.callback(cacheValue)
	        }
	        return columnTemplate
        }
    }
}
/** Code column factory */
class CodeNameColumnFactory {
    constructor() {

	}
	/**
	 * setParameters.
	 * @param {*} index		index to be used 
	 * @param {*} column 	column to be used
	 * @param {*} callback 	calback to be used after column creation
	 */
	setParam(index, column, callback) {
	    this.index = index
	    this.column = column
	    this.callback = callback
		this.checker = new ColumnNullChecker(column)
	}
	/**
	 * create a column to be used
	 * @todo localize the header text
	 */
    createColumn() {
	    this.checker.enforceNotNull()
        if (this.column.Fields.length > 0)
        {
		    let field = this.column.Fields[0]
		    let currentWidth = field.Width == null ? 120 : field.Width;
		    let columnTemplate = { field: field.Name, headerText: this.column.headerText, width: currentWidth, type: field.DataType, editType: field.DataType }
		    return columnTemplate
        }
        let columns = []
        if (this.column.Fields.length > 0) {
	        // create fields.
	        this.column.Fields.forEach(field => {
		        let currentWidth = field.Width == null ? 120 : field.Width;
		        let fieldColumn = { field: field.Name, headerText: field.Header, width: currentWidth, allowEditing: true, type: field.DataType, editType: field.DataType }
		        columns.push(fieldColumn);
	        })

	        let columnTemplate = { headerText: "Busca", allowEditing: false }
	        columns.push(columnTemplate)
	        let cacheValue = { index: idx - 1, args: this.column, modalState: false, modalTitle: this.column.ModalTitle }
	        this.callback(cacheValue)
	        return columns
        }
	}
}
/**
 * Abstract factory pattern for creating different columns.
 */
class AbstractColumnFactory
{
	/**
	 * @param index index to be used
	 * @param column column description
	 * @param callback to be used.
	 */
	constructor()
	{
		this.dispatcher = 
         {
                
            'Standard':  new StandardColumnFactory(),
            'Checkbox':  new CheckBoxColumnFactory(),
            'Selection': new SelectionColumnFactory(),
            'CodeName': new CodeNameColumnFactory(), /* Just used in codename */
            'Field': new FieldColumnFactory()        /* Just used in the modals*/
        }
	}
	/**
	 * create a column given a type
	 * @param {*} columnType 	Column type to be used.
	 * @param {*} index 		Index to be used.
	 * @param {*} column 		Column to be used.
	 * @param {*} callback 		Callback to be used
	 */
    createColumn(columnType, index, column, callback)
	{
		if (columnType == null)
		{
			throw 'Null argument exception'
		}
		if ((columnType != 'Standard') &&
			(columnType != 'Checkbox') &&
            (columnType != 'Selection') &&
			(columnType != 'Field') &&
			(columnType != 'CodeName'))
			{
				throw 'Invalid column type'
        }
        this.dispatcher[columnType].setParam(index,column, callback)
 		return this.dispatcher[columnType].createColumn()
	}
}
export default AbstractColumnFactory;
