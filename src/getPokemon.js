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
            body: pokemon
        };

}



module.exports = {
    getPokemon,
}