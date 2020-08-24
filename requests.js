
import axios from 'axios';
//const axios = require('axios');

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

module.exports.requestDeleteVerticesByType = ({baseUrl, graph_name = '', vertex_type}) => {
    let url = `${baseUrl}:9000/graph/${graph_name}/delete_by_type/vertices/${vertex_type}`;
    
    if(graph_name == '')
    {
        url = `${baseUrl}:9000/graph/delete_by_type/vertices/${vertex_type}`;
    }

    return axios.delete(url, {
        "headers": {
            "Authorization": `Bearer ${token}`,
        },
    });
}

module.exports.requestStats = ({baseUrl, graph_name, token, func, type}) => {
    let url = `${baseUrl}:9000/builtins/${graph_name}`;
    if(graph_name == '')
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

module.exports.requestUpsertData = ({baseUrl, token, graph_name, data, parameters}) => {

    let url = `${baseUrl}:9000/graph/${graph_name}`;
    if(graph_name == '')
    {
        url = `${baseUrl}:9000/graph`;
    }

    let jsonData = JSON.stringify(data);


    return axios({
        url: url,
        method: 'post',
        headers : {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        data: jsonData,
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

module.exports.requestQueryRunningList = ({baseUrl, token ,graph_name }) => {
    let url = `${baseUrl}:9000/showprocesslist`;
    if(graph_name == '')
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

module.exports.requestAbortQuery = ({baseUrl, token,graph_name, requestId }) => {
    
    let url = `${baseUrl}:9000/abortquery/${graph_name}`;
    if(graph_name == '')
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

module.exports.requestAbortQueryByEndpoint = ({baseUrl, token,endpoint, graph_name}) => {
    
    let url = `${baseUrl}:9000/abortquery/${graph_name}`;
    if(graph_name == '')
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

module.exports.requestShortestPath = ({baseUrl, token,graph_name, data}) => {
    
    let url = `${baseUrl}:9000/shortestpath/${graph_name}`;
    if(graph_name == '')
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


module.exports.requestAllPaths = ({baseUrl, token,graph_name, data}) => {
    let url = `${baseUrl}:9000/allpaths/${graph_name}`;
    if(graph_name == '')
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
