import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "product-service",
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    profile: "gelelus",
    region: "eu-west-1",
    stage: "dev",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: {
          "Fn::GetAtt": ["CatalogItemsQueue", "Arn"],
        },
      },
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: {
          "Ref": "CreateProductTopic"
        },
      },
    ],
    environment: {
      PG_HOST: "***********",
      PG_PORT: 1111,
      PG_DATABASE: "***********",
      PG_USERNAME: "***********",
      PG_PASSWORD: "***********",
      PRODUCT_TOPIC_ARN: {
        Ref: "CreateProductTopic"
      }
    },
  },
  resources: {
    Resources: {
      CatalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "products-sqs-queue",
        },
      },
      CreateProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "create-product-topic"
        }
      },
      CreateProductSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "createProduct@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "CreateProductTopic"
          }
        }
      },
      CreateProductsLowStockSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "LowStock@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "CreateProductTopic"
          },
          FilterPolicy: {
            lowStock: ["true"]
          }
        }
      }
    },
    Outputs: {
      CatalogItemsQueue: {
        Value: {
          Ref: "CatalogItemsQueue",
        },
        Export: {
          Name: "CatalogItemsQueue",
        },
      },
      CatalogItemsQueueUrl: {
        Value: {
          Ref: "CatalogItemsQueue",
        },
        Export: {
          Name: "CatalogItemsQueueUrl",
        },
      },
      CatalogItemsQueueArn: {
        Value: {
          "Fn::GetAtt": ["CatalogItemsQueue", "Arn"],
        },
        Export: {
          Name: "CatalogItemsQueueArn",
        },
      },
    },
  },
  functions: {
    getProductsList: {
      handler: "main.getAllProducts",
      events: [
        {
          http: {
            method: "get",
            path: "products",
            cors: true,
          },
        },
      ],
    },
    getProductsById: {
      handler: "main.getProductById",
      events: [
        {
          http: {
            method: "get",
            path: "products/{productId}",
            cors: true,
          },
        },
      ],
    },
    addOneProduct: {
      handler: "main.addOneProduct",
      events: [
        {
          http: {
            method: "post",
            path: "products",
            cors: true,
          },
        },
      ],
    },
    catalogBatchProcess: {
      handler: "main.productBatch",
      events: [
        {
          sqs: {
            arn: {
              "Fn::GetAtt": ["CatalogItemsQueue", "Arn"],
            },
            batchSize: 5,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
