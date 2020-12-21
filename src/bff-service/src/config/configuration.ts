export const configuration = (): {
  api: string;
  products: string;
} => ({
  api: process.env.CART_URL,
  products: process.env.PRODUCTS_URL,
});
