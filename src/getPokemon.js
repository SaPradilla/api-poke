const AWS = require('aws-sdk');

const getPokemon = async(event)=>{


        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;



        const result = await dynamodb.scan({
            TableName:'pokeTable',
            Key:{
                id
            }
        }).promise()


        const pokemon = result.Items;

        return{
            status:200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4200',
                'Access-Control-Allow-Credentials': true,
            },
            body: pokemon
        };

}



module.exports = {
    getPokemon,
}