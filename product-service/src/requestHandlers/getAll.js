import products from '../data/products.json';
import { getHeaders } from '../config/index.js'

export const getAllProducts = async event => {
    return {
        statusCode: 200,
        body: JSON.stringify(products),
        headers: getHeaders(),
    };
};
