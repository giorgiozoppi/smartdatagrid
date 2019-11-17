/**
*  ========================================================================
*   Copyright (c) 2019 Karve Informatica S.L.
* ------------------------------------------------------------------------
*  @author Giorgio Zoppi <giorgio@fleetadmiral.net>
*  @date  22th Octuber 2019
*  @brief Class that saves the current grid settings to cloud.  
*  @file GridSettingSaver.js
*/

import "grpc-web";
import "../generated_code/UserConfig_pb.js"
import { UserConfigurationServiceClient } from "./generated_code/UserConfig_grpc_web_pb.js"

class GridSettingSaver
 {
     /**
      * Constructor
      * @param {*} grpcGateway Google RPC gateway to save the settings on the cloud. 
      * @param {*} user        User where you can/should save the settings
      * @param {*} token       Token to be used to authenticate the setting not used.
      */
    constructor(grpcGateway, user, token) {
        this.grpcGateway = grpcGateway
        this.user = user
        this.token = token
    }

    /**
    * Save Grid Settings to the cloud and return a promise about the result 
    * @param {*} gridName     Name of a grid.
    * @param {*} gridInstance Instance of a grid.
    */
    saveGridAsync(gridName, gridInstance, template)
    {
        console.log("GRPC Gateway " + this.grpcGateway)
        let service = new UserConfigurationServiceClient(this.grpcGateway)
        let model = this._serializeGrid(gridInstance)
        console.log("Serialzied model setting -->" + model)
        return new Promise((resolve, reject)=>{
            let saveRequest = new proto.UserConfigService.UserGridConfigSaveRequest();    
            let encoded = btoa(model)
            let metadata = ''
            saveRequest.setUsername(this.user);
            saveRequest.setGridname(gridName);
            saveRequest.setJsonserializedvalue(encoded)
            service.saveGridConfig(saveRequest,
                metadata, (err, response) => {
                    if (err !== null) {
                        reject(err);
                    } 
                    else {
                    if (response.getStatus() === 200) {
                          
                             resolve(response);
                         } else 
                         {
                           let error = response.getErrormessage()
                           reject(error)
                        }
                    }
                });
        });
    }
    

    _serializeGridWithTemplate(gridInstanc, template)
    {
            
            let model = gridInstance.getPersistData();
           
            let cols = gridInstance.columns;
            let jsonModel = JSON.parse(model)
            let modelCols = jsonModel["columns"]
            let idx = 0;
            modelCols.forEach(modelCol => {
            modelCol["headerText"] = cols[idx].headerText;
            idx++
            })

            let templateCol = 0;
            modelCols.forEach(modelCol=>{
                modelCol[tem]
                templateCol = templateCol +1;
            })


            model = JSON.stringify(jsonModel)
            return model
    }
    /** private method. In ES6 there is no private method we use this convention */
    /**
     * @param gridInstance 
     * @param {*} gridInstance 
     */
    _serializeGrid(gridInstance)
    {
        if (gridInstance == null)
        {
            throw 'Null grid to be serialized'
        }

       
        let model = gridInstance.getPersistData();
        let cols = gridInstance.columns;
        let jsonModel = JSON.parse(model)
        let modelCols = jsonModel["columns"]
        let idx = 0;
        modelCols.forEach(modelCol => {
            modelCol["headerText"] = cols[idx].headerText;
            idx++
        })
        model = JSON.stringify(jsonModel)
        return model
    }
}

export default GridSettingSaver;
