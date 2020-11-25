import { APIGatewayTokenAuthorizerHandler } from "aws-lambda";
import { generatePolicy } from "../helpers";

import basicAuthorizerService from "../services/basicAuthorizer.service";

export const basicAuthorizer: APIGatewayTokenAuthorizerHandler =  (
  { type, methodArn, authorizationToken },
  _ctx,
  cb
) => {
  if(type != 'TOKEN'){
    cb(`Unauthorized`)
  }
  try {
    const result = basicAuthorizerService(authorizationToken);
    cb(null, generatePolicy(result.encodedCreds, methodArn, result.effect));
  } catch (e) {
    cb(`Unauthorized: ${e.message}`);
  }
};
