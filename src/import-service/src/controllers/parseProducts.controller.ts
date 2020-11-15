import { S3Handler } from "aws-lambda";

import parseProduct from "../services/parseProducts.service";

export const parseProducts: S3Handler = async (event) => {
  try {
    await parseProduct(event.Records);
  } catch (e) {
    console.error(e);
  }
};
