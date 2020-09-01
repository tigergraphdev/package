const { Graph } = require("./src/models/graph");

/**
 * 
 * Requires credentials to establish a connection to the graph
 * Returns a connection to the graph.
 */
module.exports.connnectToGraph = async ({host = "localhost", graphName = "", restPort = "14240", gsPort = "9000", username= "tigergraph", password="tigergraph", secret, token}) => {

    let graph = new Graph({
        host: host,
        graphName: graphName,
        restPort: restPort,
        gsPort: gsPort,
        username: username, 
        password: password,
        secret: secret,
        token: token
    });


    let check = await graph.echo();

    if(check){
        return graph;
    }else{
        console.log("");
        return null;
    }
    
}




const main = async () => {
    
    const graph = this.connnectToGraph({
        host:'https://socialfriendsfinder.i.tgcloud.io',
        graphName: 'connectivity',
        username: 'tigergraph',
        password: '1098101We',
        secret: '0qmtoqmg9fne56kb04hlcumbfbaqqqj4',
        //token: '5kvav6hsgai647e81q3nrrb6m6fl3kua'
        token: '5kvav6hsgai647e81q3nrrb6m6fl3k'
    });


}

main();