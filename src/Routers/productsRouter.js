import { Router } from "express";
import { getAll, getDetail } from "../Controllers/products.js";


const routerProducts = Router();

routerProducts.get('/', getAll)
routerProducts.get('/:slug', getDetail)

export default routerProducts;