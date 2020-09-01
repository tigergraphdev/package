
//import axios from 'axios';
const axios = require('axios');
const { builtinModules } = require('module');

const port = {
    rest: '14240',
    gs: '9000'
}

module.exports.setPort = ({restPort, gsPort}) => {
    port.rest = restPort;
    port.gs = gsPort;
}

module.exports.requestToken = ({baseUrl, secret}) => {
    return axios.get(`${baseUrl}:${port.gs}/requesttoken?secret=${secret}`);
}

module.exports.requestEcho = ({baseUrl, token}) => {
    return axios.get(`${baseUrl}:${port.gs}/echo`,{
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
}

module.exports.requestDeleteVerticesByType = ({baseUrl, token, graphName = '', vertexType}) => {
    let url = `${baseUrl}:${port.gs}/graph/${graphName}/delete_by_type/vertices/${vertexType}`;
    
    if(graphName == '')
    {
        url = `${baseUrl}:${port.gs}/graph/delete_by_type/vertices/${vertexType}`;
    }

    return axios.delete(url, {
        "headers": {
            "Authorization": `Bearer ${token}`,
        },
    });
}

module.exports.requestStats = ({baseUrl, graphName, token, func, type}) => {
    let url = `${baseUrl}:${port.gs}/builtins/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:${port.gs}/builtins`;
    }

    let data = JSON.stringify({
        "function" : func,
        "type" : type
    });


    return axios({
        method: 'post',
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : 'application/json'
        },
        data: data
    });
        
}

module.exports.requestUpsertData = ({baseUrl = '', token = '', graphName = '', data = {}, parameters = {}}) => {

    let url = `${baseUrl}:${port.gs}/graph/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:${port.gs}/graph`;
    }

    return axios({
        url: url,
        method: 'post',
        headers : {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        data: data,
        params: parameters
    });

}

module.exports.requestRunInterpretedQuery = ({baseUrl, username, password, query, parameters = {}}) => {

    let url = `${baseUrl}:${port.rest}/gsqlserver/interpreted_query`;

    return axios({
        url: url,
        method: 'post',
        auth : {
            username: username,
            password: password
        },
        data: query,
        params: parameters
    });
}

module.exports.requestQueryRunningList = ({baseUrl, token ,graphName }) => {
    let url = `${baseUrl}:${port.gs}/showprocesslist`;
    if(graphName == '')
    {
        url = `${baseUrl}:${port.gs}/showprocesslist`;
    }

    return axios({
        method: 'get',
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

}

module.exports.requestAbortQuery = ({baseUrl, token,graphName, requestId }) => {
    
    let url = `${baseUrl}:${port.gs}/abortquery/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:${port.gs}/abortquery`;
    }

    return axios({
        method: 'get',
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        params : {
            'requestid' : requestId
        }
    });
}

module.exports.requestAbortQueryByEndpoint = ({baseUrl, token,endpoint, graphName}) => {
    
    let url = `${baseUrl}:${port.gs}/abortquery/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:${port.gs}/abortquery`;
    }

    return axios({
        method: 'get',
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        params : {
            "url" : `/${endpoint}.*`
        }
    });
}

module.exports.requestSchema = ({baseUrl, username, password, graphName , type = ""}) => {

    let url = `${baseUrl}:${port.rest}/gsqlserver/gsql/schema`
    const parameters = {
        'graph': graphName
    }

    if(type != '')
    {
        parameters['type'] = type; 
    }

    return axios({
        method: 'get',
        url:url,
        auth: {
            username: username,
            password: password
        },
        params: parameters
    });
}
