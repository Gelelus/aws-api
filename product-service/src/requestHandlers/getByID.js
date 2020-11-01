import products from '../data/products.json';
import { getHeaders, generateErrorResponse } from '../helpers/index.js'

export const getProductById = async event => {
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
