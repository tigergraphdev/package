const { Vertex } = require("../models/vertex");


const dataCheck = (object, dataToCheck) => {
    if(object[dataToCheck] == undefined){
        object[dataToCheck] = {};
    }
    return object;
}



/**
 * 
 * @param {Vertex} vertex 
 */
module.exports.getUpsertVertex = (vertex) => {

    return this.getUpsertVertices([vertex]);
}

module.exports.getUpsertVertices = (vertices) => {

    let object = {};
    object['vertices'] = {};

    for(let vertex of vertices){
        object['vertices'] = dataCheck(object['vertices'], vertex.type);
        object['vertices'][vertex.type] = dataCheck(object['vertices'][vertex.type], vertex.id);
        
        for(let [key, value] of vertex.attr)
        {
            object['vertices'][vertex.type][vertex.id][key] = value;
        }
    }

    return object;

}

module.exports.getUpsertEdge = (edge) =>{

    return this.getUpsertEdges([edge]);

}

module.exports.getUpsertEdges = (edges) => {
    let object = {};
    object['edges'] = {};

    for(let edge of edges){
        object['edges'] = dataCheck(object['edges'], edge.sourceVertex.type);
        object['edges']
        [edge.sourceVertex.type] = dataCheck(
            object['edges'][edge.sourceVertex.type],
            edge.sourceVertex.id);
        

        object['edges']
        [edge.sourceVertex.type]
        [edge.sourceVertex.id] = dataCheck(
            object['edges']
            [edge.sourceVertex.type]
            [edge.sourceVertex.id],
            edge.type);

        object['edges']
        [edge.sourceVertex.type]
        [edge.sourceVertex.id]
        [edge.type] = dataCheck(
            object['edges']
            [edge.sourceVertex.type]
            [edge.sourceVertex.id]
            [edge.type],
            edge.targetVertex.type);

        object['edges']
        [edge.sourceVertex.type]
        [edge.sourceVertex.id]
        [edge.type] 
        [edge.targetVertex.type]= dataCheck(
            object['edges']
            [edge.sourceVertex.type]
            [edge.sourceVertex.id]
            [edge.type]
            [edge.targetVertex.type],
            edge.targetVertex.id);

        
        for(let [key, value] of edge.attr)
        {
            object['edges']
            [edge.sourceVertex.type]
            [edge.sourceVertex.id]
            [edge.type] 
            [edge.targetVertex.type]
            [edge.targetVertex.id]
            [key] = value
        }
    }

    return object;
}
