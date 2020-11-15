import type { Serverless } from "serverless/aws";
const IMPORT_SERVICE_BUCKET = "import-service-bucket";
const UPLOAD_DIRECTORY = "uploaded";

const serverlessConfiguration: Serverless = {
  service: {
    name: "import-service",
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },

  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    profile: "gelelus",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: "arn:aws:s3:::import-service-bucket",
      },
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: "arn:aws:s3:::import-service-bucket/*",
      },
    ],
  },
  functions: {
    importProductsFile: {
      handler: "main.importProductsFile",
      events: [
        {
          http: {
            method: "get",
            path: "import",
            request: {
              parameters: {
                querystrings: {
                  name: true,
                },
              },
            },
          },
        },
      ],
    },
    parseProducts: {
      handler: "main.parseProducts",
      events: [
        {
          s3: {
            bucket: IMPORT_SERVICE_BUCKET,
            event: "s3:ObjectCreated:*",
            rules: [
              {
                prefix: `${UPLOAD_DIRECTORY}/`,
                suffix: "",
              },
            ],
            existing: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
