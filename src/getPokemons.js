const AWS = require('aws-sdk');

const getPokemons = async(event)=>{

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const result = await dynamodb.scan({
            TableName:'pokeTable'
        }).promise()


        const pokemons = result.Items;

        return{
            status:200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4200',
                'Access-Control-Allow-Credentials': true,
            },
            body: {
                pokemons
            }
        };
        
    } catch (error) {
        console.log(error);
    }

}



module.exports = {
    getPokemons,
}