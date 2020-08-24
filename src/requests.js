
//import axios from 'axios';
const axios = require('axios');

module.exports.requestToken = ({baseUrl, secret}) => {
    return axios.get(`${baseUrl}:9000/requesttoken?secret=${secret}`);
}

module.exports.requestEcho = ({baseUrl, token}) => {
    return axios.get(`${baseUrl}:9000/echo`,{
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
}

module.exports.requestDeleteVerticesByType = ({baseUrl, token, graphName = '', vertexType}) => {
    let url = `${baseUrl}:9000/graph/${graphName}/delete_by_type/vertices/${vertexType}`;
    
    if(graphName == '')
    {
        url = `${baseUrl}:9000/graph/delete_by_type/vertices/${vertexType}`;
    }

    return axios.delete(url, {
        "headers": {
            "Authorization": `Bearer ${token}`,
        },
    });
}

module.exports.requestStats = ({baseUrl, graphName, token, func, type}) => {
    let url = `${baseUrl}:9000/builtins/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:9000/builtins`;
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

module.exports.requestUpsertData = ({baseUrl, token, graphName, data, parameters}) => {

    let url = `${baseUrl}:9000/graph/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:9000/graph`;
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

module.exports.requestRunInterpretedQuery = ({baseUrl, username, password, query}) => {

    let url = `${baseUrl}:14240/gsqlserver/interpreted_query`;

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
    let url = `${baseUrl}:9000/showprocesslist`;
    if(graphName == '')
    {
        url = `${baseUrl}:9000/showprocesslist`;
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
    
    let url = `${baseUrl}:9000/abortquery/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:9000/abortquery`;
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
    
    let url = `${baseUrl}:9000/abortquery/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:9000/abortquery`;
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

module.exports.requestShortestPath = ({baseUrl, token,graphName, data}) => {
    
    let url = `${baseUrl}:9000/shortestpath/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:9000/shortestpath`;
    }

    return axios({
        method: 'get',
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: data
    });
}


module.exports.requestAllPaths = ({baseUrl, token,graphName, data}) => {
    let url = `${baseUrl}:9000/allpaths/${graphName}`;
    if(graphName == '')
    {
        url = `${baseUrl}:9000/allpaths`;
    }

    return axios({
        method: 'get',
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: data
    });

}
