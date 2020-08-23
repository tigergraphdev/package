
//import axios from 'axios';
const axios = require('axios');
let secret = "jkat6nvhnip6c2c2gtqoeukm31lqunfr";
let token = "epgavo88obs878tl8qrah8vrmhqeqlvv";
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
        const response = await axios.get(`${server}:9000/requesttoken?secret=${secret}`);
        token = response.data.token ;
        console.log(response.data);

        
    } catch (error) {
           console.log(error.response.data);
    }
}

const getPostToken = async() => {

    try {
        const response = await axios.post(`${server}:9000/requesttoken?secret=${secret}`);
        token = response.data.token ;
        console.log(response.data);

        
    } catch (error) {
           console.log(error.response.data);
    }
}

const echo = async () => { 

    try {
        const response = await axios.get(`${server}:9000/echo`,{
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        
        console.log(response);

    } catch (error) {
        
        console.log(error.response.data)
    }

}

const getVertices = async () => {
    //curl -X GET "http://server_ip:9000/graph/{graph_name}/vertices/{vertex_type}[/{vertex_id}]

    try {
        const response = await axios.get(`${server}:9000/graph/vertices/Person`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            params : {
                "limit" : "3"
            }
        }); 

        console.log(response.data);
    } catch (error) {
        console.log(error);
    }

}

const getVersion = async () => {

    try {
        const response = await axios.get(`${server}:9000/version`,{
            headers : {
                "Authorization": `Bearer ${token}`,
            },
        });
        
        console.log(response.data);

    } catch (error) {
        
        console.log(error.response.data)
    }

}

const deleteVerticesByType = async ({graph_name = '', vertex_type = ''}) => {

    try {
        let url = `${server}:9000/graph/${graph_name}/delete_by_type/vertices/${vertex_type}`;
        if(graph_name == '')
        {
            url = `${server}:9000/graph/delete_by_type/vertices/${vertex_type}`;
        }

        const response = await axios.delete(url, {
            "headers": {
                "Authorization": `Bearer ${token}`,
            },
        });

        console.log(response.data)
        
    } catch (error) {
        
        console.log(error.response.data);
    }
} 
// curl -X POST 'http://localhost:9000/builtins/socialNet' -d  '{"function":"stat_vertex_attr","type":"Person"}'
const getStats = async ({graph_name = "", func, type}) => {

    try {

        let url = `${server}:9000/builtins/${graph_name}`;
        if(graph_name == '')
        {
            url = `${server}:9000/builtins`;
        }

        let data = JSON.stringify({
            "function" : func,
            "type" : type
        });


        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type" : 'application/json'
            },
            data: data
        });

        console.log(response.data);
        
    } catch (error) {
        
        console.log(error);
    }
}

const getProcessList = async ({graph_name = "", func, type}) => {

    try {

        let url = `${server}:9000/showprocesslist`;
        if(graph_name == '')
        {
            url = `${server}:9000/showprocesslist`;
        }

        const response = await axios({
            method: 'get',
            url: url,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        console.log(response.data);
        
    } catch (error) {
        
        console.log(error.response.data);
    }
}

const upsertVertices = async ({graph_name = ""}) => {

    try {
        let url = `${server}:9000/graph/${graph_name}`;
        if(graph_name == '')
        {
            url = `${server}:9000/builtins`;
        }

        let data = JSON.stringify({

        });


        const response = await axios.post(url, {
            "headers": {
                "Authorization": `Bearer ${postToken}`,
            },
        });

        console.log(response)
        
    } catch (error) {
        
        console.log(error);
    }
}




const main = async () => {
    //await getToken();
    //await echo();
    await getProcessList({});
    //await getVertices();
    //await getPostToken();
    //await upsertVertices({});
}

main();