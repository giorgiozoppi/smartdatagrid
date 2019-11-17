 /** It may happen */
export const defaultDecimal = (value)=>(value==null) ? 0 : value
export const defaultRecord = (record)=>
    {
    for (var key in record) {
        if (key === 'Subtotal') {
            record['Subtotal'] = 0;
        }
        if (key === 'Price') {
            record['Price'] = 0;
        }
        if (key === 'Discount') {
            record['Discount'] = 0;
        }
        if (key === 'Quantity') {
            record['Quantity'] = 0;
        }
        if (key === 'ConceptCode') {
            record['ConceptCode'] = "";
        }
        if (key === 'ConceptName') {
            record['ConceptName'] = "";
        }
            if (record.hasOwnProperty(key)) {
                /* useful code here */
                switch(typeof(record[key]))
                {
                    case 'string': {
                        Reflect.set(record, key, '');
                        break;
                    }
                    case 'numeric': {
                        Reflect.set(record, key, 0);
                        break;
                    }
                    case 'date': {
                        let date = new Date()                        
                        Reflect.set(record, key, date);
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
                        Reflect.set(record, key, null);
                }
            }
        }   
    }
export const defaultData = (columns)=>
{
    let record = {}
    columns.forEach(field => {
        record[field.Name]= defaultRecord(field.Type)
    });
    let addData = []
    addData.push(firstData);
    return addData
}
export const padLeft= (n, width) =>{
        n = n + ''; 
        return n.length >= width ? n :  
            new Array(width - n.length + 1).join('0') + n; 
}
export const setDefaultIdValueWhenNull = (record, value) => {

    if (record.hasOwnProperty("Id")) {
        let idValue = record["Id"]
        if (idValue == null) {
            record["Id"] = value
        }
        return idValue
    }
    if (record.hasOwnProperty("Code")) {
        let codeValue = record["Code"]
        if (codeValue == null) {
            record["Code"] = value
        }
        return codeValue
    }
}
export const defaultIdValue = (record) =>{
    if (record == null)
    {
        return 0
    }
    if (record.hasOwnProperty("Id"))
    {
        let idValue = record["Id"] 
        return idValue 
    }
    if (record.hasOwnProperty("Code"))
    {
        let codeValue = record["Code"] 
        return codeValue
    }
    return 0;
}

