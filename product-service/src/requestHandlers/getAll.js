import products from '../data/products.json';

export const getAllProducts = async event => {
    return {
        statusCode: 200,
        body: JSON.stringify(products)
    };
};
