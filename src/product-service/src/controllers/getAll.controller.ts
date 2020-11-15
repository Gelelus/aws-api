import { APIGatewayProxyHandler } from "aws-lambda";

import getAll from "../services/getAll.service";
import { generateErrorResponse, generateSuccessResponse } from "../helpers";
import logger from '../helpers/logger'

export const getAllProducts: APIGatewayProxyHandler = async (event) => {
  logger(event)
  try {
    const result = await getAll();
    return generateSuccessResponse(result);
  } catch (e) {
    return generateErrorResponse(e);
  }
};
