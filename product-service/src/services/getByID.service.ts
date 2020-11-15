import { getDbConfig } from "../helpers";
import { Client } from "pg";

export default async (id: string) => {
  const client = new Client(getDbConfig());
  await client.connect();
  const getAllProductText =
    "select p.id, title, description, price, product_count from products p inner join stocks s on p.id = s.product_id where p.id = $1";
  const res = await client.query(getAllProductText, [id]);
  client.end();
  return res.rows[0];
};
