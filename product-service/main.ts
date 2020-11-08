import "source-map-support/register";

import { getProductById } from "./src/controllers/getByID.controller";
import { getAllProducts } from "./src/controllers/getAll.controller";
import { addOneProduct } from "./src/controllers/addOne.controller";

export { getAllProducts, getProductById, addOneProduct };
