import type { Serverless } from "serverless/aws";
import {IMPORT_BUCKET, UPLOAD_PATH} from "./config"

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
    environment: {
      QUEUE_URL: {
        "Fn::ImportValue": "CatalogItemsQueueUrl",
      },
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: "arn:aws:s3:::rs-import-bucket",
      },
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: "arn:aws:s3:::rs-import-bucket/*",
      },
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: {
          "Fn::ImportValue": "CatalogItemsQueueArn",
        },
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
            bucket: IMPORT_BUCKET,
            event: "s3:ObjectCreated:*",
            rules: [
              {
                prefix: `${UPLOAD_PATH}/`,
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
