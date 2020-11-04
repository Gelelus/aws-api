import {APIGatewayProxyHandler} from "aws-lambda";

import products from '../data/products';
import { getHeaders } from '../helpers/index'

export const getAllProducts : APIGatewayProxyHandler = async ()  => {
    return {
        statusCode: 200,
        body: JSON.stringify(products),
        headers: getHeaders(),
    };
};
