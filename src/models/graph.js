
const { getUpsertVertex, getUpsertVertices, getUpsertEdge, getUpsertEdges } = require('../logic/upsert');
const requester = require('../requests');

class Graph {

    constructor({host = "localhost", graphName, restPort = "14240", gsPort = "9000", username, password, secret,token}){
        this.credentials = {
            host : host,
            token: token,
            secret: secret,
            graph: graphName,
            restPort: restPort,
            gsPort: gsPort,
            username: username,
            password: password
        }
        
    }
    
    

    async getToken(){
        try {
            requester.setPort({
                restPort: this.credentials.restPort,
                gsPort: this.credentials.gsPort
            });
            
            const response = await requester.requestToken({
                baseUrl: this.credentials.host,
                secret: this.credentials.secret
            });
            
            console.log(response.data);
            
        } catch (error) {
            console.log(error);
            
            return false;
        }
    }
    
    async echo() {

        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        
        try {
            const response = await requester.requestEcho({
                baseUrl: this.credentials.host,
                token: this.credentials.token
            });
            
            console.log(response.data);

            return true;
            
        } catch (error) {
            
            console.log(error.response.data.message);

            return false;
        }
        
    }
    
    
    async deleteVerticesByType({vertexType=''}){
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        
        try {
            
            const response = requester.requestDeleteVerticesByType({
                baseUrl: this.credentials.host,
                token: this.credentials.token,
                graphName: this.credentials.graph,
                vertexType: vertexType
            });
            
            console.log(response.data)
            
        } catch (error) {
            
            console.log(error.response.data);
            
            return false;
        }
    } 
    
    
    async getStats({func, type}){
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        try {
            
            const response = await requester.requestStats({
                baseUrl: this.credentials.host,
                token: this.credentials.token,
                graphName: this.credentials.graph,
                func: func,
                type: type
            });
            
            let err = response.data.error;
            if(!err)
            {
                console.log(response.data.results);
                return response.data.results;
            }else{
                console.log(response.data.message);
                return false;
            }
            
            
        } catch (error) {
            
            console.log(error);
            
            return false;
        }
    }
    
    
    async getProcessList(){
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        try {
            
            const response = await requester.requestQueryRunningList({
                baseUrl: this.credentials.host,
                token: this.credentials.token,
                graphName: this.credentials.graph
            });
            
            return response.data.results;
            
        } catch (error) {
            
            return false;
        }
    }
    
    async upsertVertex (vertex){    
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        try {
            
            const data = getUpsertVertex(vertex);
            const response = await requester.requestUpsertData({
                baseUrl: this.credentials.host,
                token: this.credentials.token,
                graphName: this.credentials.graph,
                data: data,
            })
            
            return response.data.results["accepted_vertices"];
            
            
        }catch(error){
            console.log(error)
            
            return false;
            
        }
    }
    
    
    async upsertVertices (vertices){
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        try {
            
            const data = getUpsertVertices(vertices);
            const response = await requester.requestUpsertData({
                baseUrl: this.credentials.host,
                token: this.credentials.token,
                graphName: this.credentials.graph,
                data: data,
            })
            
            return response.data.results["accepted_vertices"];
            
        }catch(error){
            console.log(error)
            
            return false;
        }
    }
    
    
    async upsertEdge(edge){
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        try {
            
            const data = getUpsertEdge(edge);
            const response = await requester.requestUpsertData({
                baseUrl: this.credentials.host,
                token: this.credentials.token,
                graphName: this.credentials.graph,
                data: data,
                parameters: {
                    'vertex_must_exist' : true
                }
            })
            
            return response.data.results["accepted_edges"];
            
            
        }catch(error){
            
            console.log(error);
            return false;
            
        }
    }
    
    
    async upsertEdges(edges){
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        try {
            
            const data = getUpsertEdges(edges);
            const response = await requester.requestUpsertData({
                baseUrl: this.credentials.host,
                token: this.credentials.token,
                graphName: this.credentials.graph,
                data: data,
                parameters: {
                    'vertex_must_exist': true
                }
            })
            
            console.log(JSON.stringify(response.data.results));
            
            return response.data.results["accepted_edges"];
            
        }catch(error){
            
            console.log(error)
            return false;
            
        }
    }
    
    
    async runInterpretedQuery({query, params}){
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        try {
            const response = await requester.requestRunInterpretedQuery({
                baseUrl: this.credentials.host,
                username: this.credentials.username,
                password: this.credentials.password,
                query: query,
                parameters: params
            });
            
            
            console.log(JSON.stringify( response.data.results));
            return response.data.results;
            
        } catch (error) {
            
            console.log(error);
            return false;
        }
        
    }
    
    
    async getSchema(type = ''){
        requester.setPort({
            restPort: this.credentials.restPort,
            gsPort: this.credentials.gsPort
        });
        try {
            
            const response = await requester.requestSchema({
                baseUrl: this.credentials.host,
                username: this.credentials.username,
                password: this.credentials.password,
                graphName: this.credentials.graph,
                type: type,
            });
            
            console.log(response.data.results);
            return response.data.results;

            
        } catch (error) {
            console.log(error);
            
            return false;
        }
    }
    
}

module.exports.Graph = Graph;