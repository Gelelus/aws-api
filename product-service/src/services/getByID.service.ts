import products from "../data/products";

export default async (id: string) => {
    const product = products.find((a) => a.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product
  };
  