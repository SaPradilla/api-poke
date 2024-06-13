const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addPokemon = async(event)=>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const id = v4();
    const { name,pknum,weight,height,image_url,category,abilities,types,stats  } = JSON.parse(event.body);

    const newPokemon = {
        id,
        name,
        pknum,
        weight,
        height,
        image_url,
        category,
        abilities,
        types,
        stats,
    }
    

    await dynamodb.put({
        TableName:'pokeTable',
        Item:newPokemon
    }).promise()

    return{
        statusCode:200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(newPokemon)
    }

};


module.exports = {
    addPokemon,
}