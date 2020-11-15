import { S3 } from "aws-sdk";


export default async (fileName: string) => {
  const IMPORT_SERVICE_BUCKET = "import-service-bucket";
  const UPLOAD_DIRECTORY = "uploaded";

  const s3 = new S3({ region: "eu-west-1" });

  const params = {
    Bucket: IMPORT_SERVICE_BUCKET,
    Key: `${UPLOAD_DIRECTORY}/${fileName}`,
    Expires: 60,
    ContentType: "text/csv",
  };

  const url = await s3.getSignedUrlPromise("putObject", params);
  return url
};
