import { getDbConfig } from "../helpers";
import { Client } from "pg";
import format from "pg-format";
import { Product } from "../helpers/validation";

export default async (products: Product[]) => {
  const client = new Client(getDbConfig());
  await client.connect();
  try {
    await client.query("BEGIN");

    const valuesProducts = products.map((product) => {
      return [product.title, product.description, product.price];
    });
    const insertProductsText = format(
      "insert into products (title, description, price) values %L returning id",
      valuesProducts
    );
    const res = await client.query(insertProductsText);

    const valuesStocks = products.map((product, i) => {
      return [res.rows[i].id, product.count];
    });
    const insertStockText = format(
      "insert into stocks (product_id, product_count) values %L",
      valuesStocks
    );
    await client.query(insertStockText);

    await client.query("COMMIT");
    return products
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.end();
  }
  
};
