const getHeaders = () => {
  return {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "https://d1mv4b218fitsr.cloudfront.net",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
};

const generateErrorResponse = (err: Error) => {
  return {
    statusCode: 500, //err.status ||
    body: JSON.stringify({ err: err.message }),
    headers: getHeaders(),
  };
};

const generateSuccessResponse = (result: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: getHeaders(),
  };
};

export { generateSuccessResponse, generateErrorResponse };
