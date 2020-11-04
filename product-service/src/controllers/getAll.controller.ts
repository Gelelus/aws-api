import { APIGatewayProxyHandler } from "aws-lambda";

import getAll from "../services/getAll.service";
import { generateErrorResponse, generateSuccessResponse } from "../helpers";

export const getAllProducts: APIGatewayProxyHandler = async () => {
  try {
    const result = await getAll();
    return generateSuccessResponse(result);
  } catch (e) {
    return generateErrorResponse(e);
  }
};
