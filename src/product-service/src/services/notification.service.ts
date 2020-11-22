import { Product } from "../helpers/validation";
import { SNS } from "aws-sdk";

export default async (products: Product[]) => {
  const sns = new SNS({ region: "eu-west-1" });
  if (products.length === 0) {
    return;
  }

  const { PRODUCT_TOPIC_ARN } = process.env;
  await sns
    .publish({
      Subject: "Products created",
      Message: JSON.stringify(products),
      TopicArn: PRODUCT_TOPIC_ARN,
    })
    .promise();

  const lowStockProducts = products.filter((product) => product.count <= 5);

  if (lowStockProducts.length > 0) {
    await sns
      .publish({
        Subject: "Low stock products",
        Message: JSON.stringify(lowStockProducts),
        MessageAttributes: {
          lowStock: { DataType: "String", StringValue: "true" },
        },
        TopicArn: PRODUCT_TOPIC_ARN,
      })
      .promise();
  }
};
