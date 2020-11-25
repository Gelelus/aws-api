interface Product {
  title: string;
  description: string;
  price: number;
  count: number;
}

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

const parseProduct = (data): Product => {
  const title = data.title || "";
  const description = data.description || "";
  const count = Number.isNaN(+data.price) ? 0 : +data.price;
  const price = Number.isNaN(+data.price) ? -1 : +data.price;

  return { title, description, price, count };
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
  parseProduct,
};
