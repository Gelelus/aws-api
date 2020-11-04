import "source-map-support/register";

import { getProductById } from "./src/controllers/getByID.controller";
import { getAllProducts } from "./src/controllers/getAll.controller";

export { getAllProducts, getProductById };
