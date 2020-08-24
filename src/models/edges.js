const { Vertex } = require("./vertex");

class Edge {

    constructor({ sourceVertex = new Vertex() , targetVertex = new Vertex(), type = "", attr = {}}){
        this.sourceVertex = sourceVertex;
        this.targetVertex = targetVertex;
        this.type = type;
        this.attr = attr;
    }
}

module.exports.Edge = Edge;