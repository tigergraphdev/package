
const axios = require('axios');
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

const upsertVertices = async ({graphName = ""}) => {

    try {
        let url = `${server}:9000/graph/${graphName}`;
        if(graphName == '')
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
    /*await getStats({
        graphName: "connectivity",
        func: "stat_vertex_number",
        type: "Person"
    });*/

    //await getProcessList({});
    //await upsertVertices({});
}

main();