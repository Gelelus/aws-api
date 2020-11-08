import { HttpRequestError } from "./index";
import Validator from "js-object-validation";

const productRequestValidation = (rawBody: string) => {
  const body = JSON.parse(rawBody);
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
    price: body.price as number,
    count: body.count as number,
    description: body.description as string,
    title: body.title as string,
  };
};

export { productRequestValidation };
