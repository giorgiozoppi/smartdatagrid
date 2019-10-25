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
*  @date  14th Octuber 2019
*  @file  ExtendedGridComponent.js  
*  @brief This a line grid application that can be used for any grid line.
*/
import * as React from 'react';
import AbstractColumnFactory from './AbstractColumnFactory.js'
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import {
    GridComponent,
    Filter,
    Inject,
    Sort,
    Selection,
    Page,
    Reorder,
    Resize,
    AggregatesDirective
} from '@syncfusion/ej2-react-grids';
class ExtendedGridMagnifier extends React.Component 
{

    constructor(props) {
        super(props)
        this.state = {
            data: new DataManager({
                url: this.props.webserviceUri,
                adaptor: new ODataV4Adaptor,
                crossDomain: true
            }),
            columns : [],
            name: this.props.name,
            webservice: this.props.webserviceUri
        };
        this.lastRowSelected = 0
        this.factory = new AbstractColumnFactory()
        this.rowSelected = this.rowSelected.bind(this)
        this.dataStateChange = this.dataStateChange.bind(this);
        this.renderComplete = this.renderComplete.bind(this)
        this.createColumns = this.createColumns.bind(this);
        this.createColumns(this.props.columns[0])
        this.filterSettings = { type: 'Menu' }
        
    }
    createColumns(columns) {
        let gridColumns = columns.Fields
        console.log("Grid Columns"+JSON.stringify(gridColumns))
        let idx = 0
        let currentCols = []
        gridColumns.forEach(col => {
            // we suppose that we have just Field Columns
            let column = this.factory.createColumn('Field', idx, col, () => {})
            idx++
            currentCols.push(column)
        })
        this.setState({ columns: currentCols})
    }
    renderComplete() {
        this.dataStateChange(this.state.data)
    }
    dataStateChange(data) {
        if (this.grid) {
            this.grid.dataSource = data
        }
    }

    loadDefault(ev)
    {
        if (this.gridInstance!=null) {
            console.log("Registering keydown and key up")
            this.gridInstance.element.addEventListener('keydown', this.keyPressHandler.bind(this)) };

    }
    keyPressHandler(args)
    {
        let pageSize = this.gridInstance.pageSettings.pageSize
        if (args.code == 40)
        {
           this.lastRowSelected= (this.lastRowSelected + 1) % pageSize
           this.gridInstance.selectRow(this.lastRowSelected)
    
        }
        if (args.code == 38)
        {
            this.lastRowSelected= (this.lastRowSelected - 1) % pageSize

            if (this.lastRowSelected > 0)
            {
                this.gridInstance.selectRow(this.lastRowSelected)        
            }
            else 
            {
                this.lastRowSelected = 0
            }
        }
    }
    rowSelected(ev) {
       
        let selectedrecords = null;
        if (this.grid) {
            /** Get the selected records. */
            selectedrecords = this.grid.getSelectedRecords();
            this.props.selectionEvent(selectedrecords)
        }
        console.log("Call select")
        return selectedrecords;
    }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        // this.gridInstance.dataSource = nextProps.model.dataSource
        //  this.gridInstance.refresh()
        //        this.grid.dataSource = nextProps.model.dataSource
        this.setState({ data: nextProps.data })
    }
    rowDoubleClick(ev) {

        console.log("Selected records " + JSON.stringify(ev))
        let selectedrecords = null;
        if (this.grid) {
            /** Get the selected records. */
            selectedrecords = this.grid.getSelectedRecords();
            console.log("Selected records "+ JSON.stringify(selectedrecords))
            this.props.selectionEvent(selectedrecords)
        }
    }
    render() {
        this.rowSelected = this.rowSelected.bind(this);
        this.rowDoubleClick = this.rowDoubleClick.bind(this)
        this.loadDefault = this.loadDefault.bind(this)
        return (
            <GridComponent id={this.state.name} dataSource={this.state.data} 
                           ref={g => this.grid = g} 
                enableVirtualization={false}
                allowPaging={true}
                load={this.loadDefault}
                allowFiltering={true}
                filterSettings={this.filterSettings}
                columns={this.state.columns}
                recordDoubleClick={this.rowDoubleClick}
                rowSelected={this.rowSelected}>
                <Inject services={[Page, Selection, Filter, Sort, Reorder, Resize ]}  />
                        </GridComponent>
                );
    }
}
export default ExtendedGridMagnifier;

