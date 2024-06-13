const AWS = require('aws-sdk');

const searchPokemons = async (event) => {
    console.log('Function is starting'); // Log inicial

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const queryParams = event.queryStringParameters || {};

        console.log('Query parameters:', queryParams);

        let filterExpression = '';
        let expressionAttributeNames = {};
        let expressionAttributeValues = {};

        const [field, value] = Object.entries(queryParams)[0] || [];

        if (field && value) {
            console.log(`Searching by ${field} with value ${value}`);
            switch (field) {
                case 'name':
                    filterExpression = 'contains(#name, :name)';
                    expressionAttributeNames['#name'] = 'name';
                    expressionAttributeValues[':name'] = value;
                    break;
                case 'number':
                    filterExpression = 'contains(#pknum, :pknum)';
                    expressionAttributeNames['#pknum'] = 'pknum';
                    expressionAttributeValues[':pknum'] = value;
                    break;
                case 'type':
                    filterExpression = 'contains(#types, :types)';
                    expressionAttributeNames['#types'] = 'types';
                    expressionAttributeValues[':types'] = value;
                    break;
                default:
                    console.error('Invalid search parameter:', field);
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ error: 'Invalid search parameter' })
                    };
            }
        } else {
            console.error('No search parameter provided');
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'No search parameter provided' })
            };
        }

        const params = {
            TableName: 'pokeTable',
            FilterExpression: filterExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues
        };

        console.log('DynamoDB scan parameters:', params);

        const result = await dynamodb.scan(params).promise();

        console.log('DynamoDB scan result:', result);

        const pokemons = result.Items;

        return {
            statusCode: 200,
            body: JSON.stringify({ pokemons })
        };

    } catch (error) {
        console.error('Error occurred:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

module.exports = {
    searchPokemons,
};