
class Entity{

    /**
     * 
     * @param {{type : string, id : string , attr: []} param0 
     * "attr" is an array of attributes.
     * Should be written in the following form
     * 
     * attr : [
     * 
     *      {
     *          name: attributeName,
     * 
     *          value: attributeValue,
     * 
     *          op : operationCode
     *      }
     * 
     * ]
     * 
     * NOTE : op is optional.
     * 
     */
    constructor({type, id, attr}){
        this.type = type;
        this.id = id;
        this.setAttr(attr);
        
    }

    /**
     * @private
     */
    setAttr(attr){
        let map = new Map();
        for (let a of attr){
            map.set(a.name, {'value' : a.value, 'op' : a.op == undefined ? "~" : a.op})
        }
        this.attr = map;
    }

    setAttrValues(attrName, {value = "" , op = "~"}){
        if(value != "")
        {
            this.attr[attrName].value = value;
        }

        this.attr[attrName].op = op;
        
    }
    
    getAttrValues(attrName){
        return this.attr[attrName];
    }

}

module.exports.Entity = Entity;