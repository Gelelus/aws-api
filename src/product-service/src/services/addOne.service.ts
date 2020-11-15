import { getDbConfig } from "../helpers";
import { Client } from "pg";

export default async (data: {
  title: string;
  description: string;
  price: number;
  count: number;
}) => {
  const client = new Client(getDbConfig());
  await client.connect();

  try {
    await client.query("BEGIN");
    const insertProductText =
      "insert into products (title, description, price) values ($1, $2, $3) RETURNING id";
    const res = await client.query(insertProductText, [
      data.title,
      data.description,
      data.price,
    ]);

    const insertStockText =
      "insert into stocks (product_id, product_count) values ($1, $2)";
    await client.query(insertStockText, [res.rows[0].id, data.count]);

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.end();
  }
  return { message: "product was added successfully" };
};
