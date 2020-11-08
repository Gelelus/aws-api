import { APIGatewayProxyEvent } from "aws-lambda";

export default (event: APIGatewayProxyEvent) =>{
console.log(`----------------------------------------------------------------------------------------------------------------
request url: ${event.httpMethod} ${event.path} 
request body: ${JSON.stringify(event.body)}
request query parameters: ${JSON.stringify(event.queryStringParameters)}
request path parameters: ${JSON.stringify(event.pathParameters)}
------------------------------------------------------------------------------------------------------------------------------`);
}