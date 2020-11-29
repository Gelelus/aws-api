import type { Serverless } from "serverless/aws";
import { IMPORT_BUCKET, UPLOAD_PATH } from "./config";

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

  plugins: ["serverless-webpack", "serverless-pseudo-parameters"],
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
  resources: {
    Resources: {
      GatewayResponseDefault400: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
          },
          ResponseType: "DEFAULT_4XX",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
        },
      },
    },
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
            authorizer: {
              name: "tokenAuthorizer",
              arn:
                "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:authorization-service-dev-basicAuthorizer",
              resultTtlInSeconds: 0,
              identitySource: "method.request.header.Authorization",
              type: "token",
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
