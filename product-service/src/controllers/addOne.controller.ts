import { APIGatewayProxyHandler } from "aws-lambda";

import addOne from "../services/addOne.service";
import { generateErrorResponse, generateSuccessResponse } from "../helpers";
import { productRequestValidation } from "../helpers/validation";
import logger from '../helpers/logger'

export const addOneProduct: APIGatewayProxyHandler = async (event) => {
  logger(event)
  try {
    const params = productRequestValidation(event.body);
    const result = await addOne(params);
    return generateSuccessResponse(result);
  } catch (e) {
    return generateErrorResponse(e);
  }
};
