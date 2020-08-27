
const axios = require('axios');
const { Verify } = require('crypto');
const { getUpsertVertex, getUpsertVertices, getUpsertEdge, getUpsertEdges } = require('./src/logic/upsert');
const { Edge } = require('./src/models/edges');
const { Vertex } = require('./src/models/vertex');
const requester = require('./src/requests');
let secret = "jkat6nvhnip6c2c2gtqoeukm31lqunfr";
let token = "96dl509vgh9rmptnka18l1ug6n87r766";
let postToken = 'r90ehrhbaeme6tktjhmpbimlv9015akr';
let server = "https://socialfriendsfinder.i.tgcloud.io";


module.exports.credentials = ({address, sec}) => {
    server = address;
    sec = secret;
};

const errorHandler =() => {

}


const getToken = async () => {
    try {

        const response = await requester.requestToken({
            baseUrl: server,
            secret: secret
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const echo = async () => { 

    try {
        const response = await requester.requestEcho({
            baseUrl: server,
            token: token
        });
        
        console.log(response.data);

    } catch (error) {
        
        console.log(error.response.data)
    }

}

const deleteVerticesByType = async ({graphName = '', vertexType = ''}) => {

    try {
       
        const response = requester.requestDeleteVerticesByType({
            baseUrl: server,
            token: token,
            graphName: graphName,
            vertexType: vertexType
        });
        
        console.log(response.data)
        
    } catch (error) {
        
        console.log(error.response.data);
    }
} 
// curl -X POST 'http://localhost:9000/builtins/socialNet' -d  '{"function":"stat_vertex_attr","type":"Person"}'
const getStats = async ({graphName = "", func, type}) => {

    try {

        const response = await requester.requestStats({
            baseUrl: server,
            token: token,
            graphName: graphName,
            func: func,
            type: type
        });

        console.log(response.data);
        
    } catch (error) {
        
        console.log(error);
    }
}

const getProcessList = async ({graphName = ""}) => {

    try {

        const response = await requester.requestQueryRunningList({
            baseUrl: server,
            token: token,
            graphName: graphName
        });

        console.log(response.data);
        
    } catch (error) {
        
        console.log(error.response.data);
    }
}

const upsertVertex = async (vertex, graphName = "") => {
    try {

        const data = getUpsertVertex(vertex);
        const response = await requester.requestUpsertData({
            baseUrl: server,
            token: token,
            graphName: graphName,
            data: data,
        })

        console.log(JSON.stringify(response.data.results));
        

    }catch(error){
        console.log(error)

    }
}

const upsertVertices = async (vertices, graphName = "") => {
    try {

        const data = getUpsertVertices(vertices);
        const response = await requester.requestUpsertData({
            baseUrl: server,
            token: token,
            graphName: graphName,
            data: data,
        })

        console.log(JSON.stringify(response.data.results));
        

    }catch(error){
        console.log(error)

    }
}

const upsertEdge = async (edge, graphName = "") => {
    try {

        const data = getUpsertEdge(edge);
        const response = await requester.requestUpsertData({
            baseUrl: server,
            token: token,
            graphName: graphName,
            data: data,
        })

        console.log(JSON.stringify(response.data.results));
        

    }catch(error){
        console.log(error)

    }
}

const upsertEdges = async (edges, graphName = "") => {
    try {

        const data = getUpsertEdges(edges);
        const response = await requester.requestUpsertData({
            baseUrl: server,
            token: token,
            graphName: graphName,
            data: data,
        })

        console.log(JSON.stringify(response.data.results));
        

    }catch(error){
        console.log(error)

    }
}

const runInterpretedQuery = async ({query, params}) => {

    try {
        let username = "tigergraph";
        let password = "1098101We";
        const response = await requester.requestRunInterpretedQuery({
            baseUrl: server,
            username: username,
            password: password,
            query: query,
            parameters: params
        });

        console.log(response.data);
        console.log(JSON.stringify( response.data.results));

    } catch (error) {
        console.log(error);
        
    }

}

const getShortestPath = ({sourceVertices = [], targetVertices = [], vertexFilter, edgeFilter, maxLength}) => {

}




const main = async () => {
    
}

main();