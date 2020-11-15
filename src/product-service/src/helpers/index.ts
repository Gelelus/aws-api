import { ClientConfig } from "pg";

class HttpRequestError extends Error {
  constructor(public statusCode: number, public message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const getHeaders = () => {
  return {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "https://d1mv4b218fitsr.cloudfront.net",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
};

const getDbConfig = () => {
  const {
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
    PG_USERNAME,
    PG_PASSWORD,
  } = process.env;
  const config: ClientConfig = {
    host: PG_HOST,
    port: +PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
  };
  return config;
};

const generateErrorResponse = (err: HttpRequestError) => {
  return {
    statusCode: err.statusCode || 500,
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

export {
  generateSuccessResponse,
  generateErrorResponse,
  HttpRequestError,
  getDbConfig,
};
