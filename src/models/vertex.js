const { Entity } = require('./entity');

class Vertex extends Entity {

    constructor({type, id , attr})
    {
        super({type: type, id: id , attr: attr});
    }


}

module.exports.Vertex = Vertex;