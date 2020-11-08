import { getDbConfig } from "../helpers";
import { Client } from "pg";

export default async () => {
  const client = new Client(getDbConfig());
  await client.connect();
  const getAllProductText =
    "select p.id, title, description, price, product_count from products p inner join stocks s on p.id = s.product_id";
  const res = await client.query(getAllProductText);
  client.end();
  return res.rows;
};
