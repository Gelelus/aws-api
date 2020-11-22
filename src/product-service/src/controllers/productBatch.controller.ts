import { SQSHandler } from "aws-lambda";
import { Product } from "../helpers/validation";
import productBatchService from '../services/productBatch.service'
import notifyService from '../services/notification.service'

export const productBatch: SQSHandler = async ({ Records }) => {
  try {
    const productRecords =  Records.map((item) => {
      return JSON.parse(item.body) as Product
    });
    const products = await productBatchService(productRecords);
    await notifyService(products)
  } catch (e) {
    console.error(e);
  }
};
