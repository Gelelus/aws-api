import { APIGatewayProxyHandler } from "aws-lambda";

import getByID from "../services/getByID.service";
import { generateErrorResponse, generateSuccessResponse } from "../helpers";
import logger from '../helpers/logger'

export const getProductById: APIGatewayProxyHandler = async (event) => {
  logger(event)
  try {
    const result = await getByID(event.pathParameters.productId);
    return generateSuccessResponse(result);
  } catch (e) {
    return generateErrorResponse(e);
  }
};
