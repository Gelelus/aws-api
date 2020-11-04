import products from "../data/products";
import { HttpRequestError } from "../helpers";

export default async (id: string) => {
    const product = products.find((a) => a.id === id);
    if (!product) {
      throw new HttpRequestError(404, "Product not found");
    }
    return product
  };
  