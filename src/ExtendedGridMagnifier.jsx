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
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import GridSettingSaver from './GridSettingSaver.js'
import GridSettingLoader from './GridSettingLoader.js'
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import {
    GridComponent,
    Filter,
    Inject,
    Sort,
    Selection,
    Page,
    Reorder,
    Resize
} from '@syncfusion/ej2-react-grids';
class ExtendedGridMagnifier extends React.Component 
{
    
    constructor(props) {
        super(props)
       
        this.state = { data: new DataManager({
                url: this.props.webserviceUri,
                adaptor: new ODataV4Adaptor,
                crossDomain: true
            }),
            cid: this.props.cid,
            columns : [],
            name: this.props.name,
            webservice: this.props.webserviceUri,
            grpcGateway: this.props.grpcGateway,
            currentUser: this.props.currentUser,
            grpcToken: this.props.grpcToken
        };
        this.lastRowSelected = 0
        this.factory = new AbstractColumnFactory()
        this.rowSelected = this.rowSelected.bind(this)
        this.dataStateChange = this.dataStateChange.bind(this);
        this.renderComplete = this.renderComplete.bind(this)
        this.createColumns = this.createColumns.bind(this);
        this.state.columns = this.createColumns(this.props.columns[0])
        this.filterOptions = { type: 'Menu' }
        this.toastPosition = { X: 'Right' }
      
        this.saveGridSettings = this.saveGridSettings.bind(this)
        this.loadGridSettings = this.loadGridSettings.bind(this)
        this.gridSaver = new GridSettingSaver(this.state.grpcGateway, this.state.currentUser, this.state.grpcToken);
        this.gridLoader = new GridSettingLoader(this.state.grpcGateway, this.state.currentUser, this.state.grpcToken);
        
    }
    createColumns(columns) {
        let gridColumns = columns.Fields
        let idx = 0
        let currentCols = []
        gridColumns.forEach(col => {
            // we suppose that we have just Field Columns
            let column = this.factory.createColumn('Field', idx, col, () => {})
            if (col.DataType === "date")
            {
                if (this.columnsReformat == null) {
                    this.columnsReformat = [{ 'col': idx, 'format': col.Format }]
                } else {
                    this.columnsReformat.push({ 'col': idx, 'format': col.Format })
                }
            }
            console.log(JSON.stringify("col "+col))
            idx++
            currentCols.push(column)
        })
        return currentCols;
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
       
        if (this.grid!=null) {
            this.grid.element.addEventListener('keydown', this.keyPressHandler.bind(this)) };
        if (this.columnsReformat != null) {
            this.columnsReformat.forEach(colFormat => {
                if (colFormat !== null) {
                    this.grid.columns[colFormat.col].format = { type: 'date', format: colFormat.format }

                }
            }) 
        }

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
    onToastClose(args) {
        let btnEleHide = document.getElementById('toastBtnExtendedHide')
        if (e.toastContainer.childElementCount === 0) {
            btnEleHide.style.display = 'none'
        }
    }
    rowSelected(ev) {
       
        let selectedrecords = null;
        if (this.grid) {
            /** Get the selected records. */
            selectedrecords = this.grid.getSelectedRecords();
            this.props.selectionEvent({ 'id': this.state.cid, 'rows': selectedrecords })
        }
       
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

        let selectedrecords = null;
        if (this.grid) {
            /** Get the selected records. */
            selectedrecords = this.grid.getSelectedRecords();
            this.props.selectionEvent({ 'id': this.state.cid, 'rows': selectedrecords })
        }
    }
    loadGridSettings() {

    }
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
    
    render() {
        this.rowSelected = this.rowSelected.bind(this);
        this.rowDoubleClick = this.rowDoubleClick.bind(this)
        this.loadDefault = this.loadDefault.bind(this)
        return (
            <div className="modalext">
            <ToastComponent ref={(toast) => { this.toastObj = toast }}
                            id='toast_default_extended'
                            position={this.toastPosition}
                            close={this.onToastClose.bind(this)}>
            </ToastComponent>
               
                <ButtonComponent cssClass='e-primary'
                                 onClick={this.saveGridSettings}>
                        Guarda Impostaciones</ButtonComponent>
                    <GridComponent id={this.state.name} dataSource={this.state.data} 
                           ref={g => this.grid = g} 
                    enableVirtualization={false}
                    
                allowPaging={true}
                allowSorting={true}
                allowReordering={true}
                load={this.loadDefault}
                allowFiltering={true}
                allowResizing={true}
                filterSettings={this.filterOptions}
                columns={this.state.columns}
                recordDoubleClick={this.rowDoubleClick}
                rowSelected={this.rowSelected}>
                    <Inject services={[Filter, Sort, Page, Selection, Resize, Reorder]}  />
                </GridComponent>
                </div>
                
                );
    }
}
export default ExtendedGridMagnifier;

