import { APIGatewayProxyHandler } from "aws-lambda";

import importProducts from "../services/importProducts.service";
import { generateErrorResponse, generateSuccessResponse } from "../helpers";


export const importProductsFile: APIGatewayProxyHandler = async (event) => {

  try {
    const result = await importProducts(event.queryStringParameters.name);
    return generateSuccessResponse(result);
  } catch (e) {
    return generateErrorResponse(e);
  }
};
