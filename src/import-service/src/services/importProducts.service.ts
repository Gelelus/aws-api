import { S3 } from "aws-sdk";
import { IMPORT_BUCKET, UPLOAD_PATH } from "../../config"

export default async (fileName: string) => {

  const s3 = new S3({ region: "eu-west-1" });

  const params = {
    Bucket: IMPORT_BUCKET,
    Key: `${UPLOAD_PATH}/${fileName}`,
    Expires: 60,
    ContentType: "text/csv",
  };

  const url = await s3.getSignedUrlPromise("putObject", params);
  return url
};
