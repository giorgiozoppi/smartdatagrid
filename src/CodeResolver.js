/**
*  ========================================================================
*   Copyright (c) 2019 Karve Informatica S.L.
* ------------------------------------------------------------------------
*  @author Giorgio Zoppi <giorgio@fleetadmiral.net>
*  @date  31th Octuber 2019
*  @brief Class that has the single resposibility to resolve code and name. 
          It register an event directly and 
*  @file CodeResolver.js
*/

export default class CodeResolver
{
    constructor() {
        
        this.interpolatedCodeArray = []
        this.codeArray = []
        this.registerEvents = this.registerEvents.bind(this)
        this.addCodeName = this.addCodeName.bind(this)
    }
    /**
     * Add a code name box to the array
     * @param {*} codeValue         Field to be the code of a CodeName column in the grid
     * @param {*} nameValue         Field to be the name of a CodeName column in the grid
     * @param {*} endpointValue     OData endpont for the resolution
     */
    addCodeName(codeValue, nameValue, endpointValue)
    {
        this.codeArray.push({code: codeValue, name: nameValue, endpoint: endpointValue})
    }
    /**
     * Register events associated to the code press.
     */
    registerEvents(ev)
    {
        
        this.interpolatedCodeArray = this.codeArray.map(item=>{ 
            let inCode="input[name=" + item.code +"]"
            let inName="input[name=" +item.name +"]"
            return { inputCode: inCode , inputName: inName, inputEndpoint:  item.endpoint }
        })
        this.interpolatedCodeArray.forEach(item=>{
                    // resolver code.
                    let inputEle = ev.form.querySelector("tbody").querySelector(item.inputCode); 
                    inputEle.addEventListener("focusout", async keyEvent => { 
                        var tbody = keyEvent.target.closest("tbody"); 
                        let stateBody = keyEvent.currentTarget.form.querySelector("tbody").querySelector(item.inputCode); 
                        let newValue = tbody.querySelector(item.inputName).value
                        let resolutionStatus = await this.resolveCode(stateBody.value, item.inputEndpoint)
                        if (resolutionStatus.state == 0) {
                            // todo check sizes.
                            let currentValue = resolutionStatus.data.value[0]
                            let keys = Object.keys(currentValue)
                            if (keys.length > 1) {
                                let valueKey = keys[1]
                                newValue = currentValue[valueKey]
                            }
                        }
                        tbody.querySelector(item.inputName).value = newValue
                        })       
            });
    
    }
    /**
     * Resolves the name remotely validating the key. 
     * @param {*} keyPress  Argument to be used
     * @param {*} endpoint  Endpoint to be used  
     */
    async resolveCode(code, endpoint) {
        let completeUriPath = endpoint + "?$filter=Code eq " + "'" + code + "'"
        try
        {
            let requestDictionary = {
                method: 'GET',
                headers: new Headers(),
                mode: 'cors',
                cache: 'default'
            }; 
            let response = await fetch(completeUriPath, requestDictionary)
            if (response.ok) {
                let data = await response.json()
                return { 'state': 0, 'data': data }
            }
            else 
            {
                return { 'state': -1, 'error' : response.statusText }
            }
            
        }
        catch (error) {
            return { 'state': -1, 'error' : error }
        }
    }
}