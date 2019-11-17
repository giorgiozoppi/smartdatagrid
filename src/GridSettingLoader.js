/**
*  ========================================================================
*   Copyright (c) 2019 Karve Informatica S.L.
* ------------------------------------------------------------------------
*  @author Giorgio Zoppi <giorgio@karveinformatica.com>
*  @date  22th Octuber 2019
*  @brief Class that load the current grid settings from the cloud.  
*  @file GridSettingLoader.js
*/
import "grpc-web";
import "./generated_code/UserConfig_pb.js"
import { UserConfigurationServiceClient } from "./generated_code/UserConfig_grpc_web_pb.js"

class GridSettingLoader
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
    * Load Grid Settings to the cloud and return a promise about the result 
    * @param {*} gridName     Name of a grid.
    * @param {*} gridInstance Instance of a grid.
    */
    loadGridAsync(gridName, gridInstance)
    {
        console.log("GRPC Gateway " + this.grpcGateway)
        // this are paramteres optionals 
        let metadata = {};
    
        return new Promise((resolve, reject)=>
        {    
            var service = new UserConfigurationServiceClient(this.grpcGateway)
            let request = new proto.UserConfigService.UserGridConfigRequest();
            request.setUsername(this.user);
            request.setGridname(gridName);
            service.getGridConfig(request, metadata, (err, response) => {                
                if (err) 
                {
                    reject({ code: err.code, state: err.message })
                }
                else 
                {
                    let status = response.getStatus()
                    if (status === 200) {
                            let bsonSerialized = response.getJsonserializedvalue_asB64()
                            if (bsonSerialized != null) {
                                    console.log("Retrieval with success " + bsonSerialized)
                                    let model = atob(bsonSerialized);
                                    console.log("Model from JSON Ok :" + model)
                                    let data = new ej.data.DataUtil.parse.parseJson(model);
                                    // deep copy
                                   

                                   
                                    if (gridInstance != null) {
                                        console.log("Setting inst properties")
                                        gridInstance.setProperties(data);
                                        console.log("Model set");
                                        gridInstance.refresh();
                                    }
                                resolve({code: 200, state:'Grid loaded with success'})
                        }
                    }
                    else 
                    {
                        let errMessage = response.getErrormessage()
                        reject({ code: status, state: errMessage })
                    }                    
                }
            })            
        });
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
        console.log("Model" + JSON.stringify(jsonModel))
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
export default GridSettingLoader;
