import { HttpRequestError } from "./index";
import Validator from "js-object-validation";

interface Product  {
  title: string
  description: string
  price: number
  count: number
};

const productRequestValidation = (rawBody: string) => {
  const body = JSON.parse(rawBody) as Product;
  const validations = {
    price: {
      number: true,
      required: true,
    },
    count: {
      numeric: true,
      required: true,
    },
    description: {
      minlength: 1,
      required: true,
    },
    title: {
      alphanumeric: true,
      required: true,
    },
  };

  const { isValid, errors } = Validator(body, validations);
  if (!isValid) {
    let errorsText = "";
    for (var prop in errors) {
      errorsText += errors[prop] + "\n";
    }
    throw new HttpRequestError(400, errorsText);
  }

  return {
    price: body.price,
    count: body.count,
    description: body.description,
    title: body.title,
  } 
};



export { productRequestValidation, Product };
