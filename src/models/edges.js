const { Entity } = require("./entity");
const { Vertex } = require("./vertex");

class Edge extends Entity {

    constructor({ sourceVertex = new Vertex(), targetVertex = new Vertex(), type = "", attr = []}){
        super({type: type, attr: attr});
        this.sourceVertex = sourceVertex;
        this.targetVertex = targetVertex;
    }
}

module.exports.Edge = Edge;