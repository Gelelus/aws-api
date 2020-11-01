import products from '../data/products.json';

export const getProductById = async event => {
    // const products = JSON.parse(productsJSON)
    const id = event.pathParameters.customerId;
    const product = products.find(a => a.id === id);
    if (!product) {
      return {
        statusCode: 404
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        product
      )
    };
};
