import products from '../data/products';
import { getHeaders, generateErrorResponse } from '../helpers'
import {APIGatewayProxyHandler} from "aws-lambda";

export const getProductById: APIGatewayProxyHandler  = async event => {
    try {
        const id = event.pathParameters.productId;
        const product = products.find(a => a.id === id);
        if (!product) {
            throw new Error("Product not found");
        }
        return {
            statusCode: 200,
            body: JSON.stringify(
                products[0]
            ),
            headers: getHeaders(),
        }
    } catch (e) {
        return generateErrorResponse(e, 404)
    }
};
