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
    environment: {
      PG_HOST: "***********",
      PG_PORT: 1111,
      PG_DATABASE: "***********",
      PG_USERNAME: "***********",
      PG_PASSWORD: "***********",
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
  },
};

module.exports = serverlessConfiguration;
