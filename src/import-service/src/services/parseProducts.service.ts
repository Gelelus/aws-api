import { S3EventRecord } from "aws-lambda";
import { S3, SQS } from "aws-sdk";
import * as csv from "csv-parser";
import {
  IMPORT_BUCKET,
  UPLOAD_PATH,
  PARSE_PATH,
  QUEUE_URL,
} from "../../config";
import { parseProduct } from "../helpers";

export default (Records: S3EventRecord[]) => {
  const s3 = new S3({ region: "eu-west-1" });
  const sqs = new SQS();

  Records.forEach((record) => {
    const s3Stream = s3
      .getObject({
        Bucket: IMPORT_BUCKET,
        Key: record.s3.object.key,
      })
      .createReadStream();

    s3Stream
      .pipe(csv())
      .on("data", async (data) => {
        const product = parseProduct(data);
        if (product.price >= 0) {
          await sqs
            .sendMessage({
              QueueUrl: QUEUE_URL,
              MessageBody: JSON.stringify(product),
            })
            .promise();
        }
      })
      .on("end", async () => {
        const copyFrom = `${IMPORT_BUCKET}/${record.s3.object.key}`;
        const copyTo = record.s3.object.key.replace(UPLOAD_PATH, PARSE_PATH);

        await s3
          .copyObject({
            CopySource: copyFrom,
            Bucket: IMPORT_BUCKET,
            Key: copyTo,
          })
          .promise();

        await s3
          .deleteObject({
            Bucket: IMPORT_BUCKET,
            Key: record.s3.object.key,
          })
          .promise();
      });
  });
};
