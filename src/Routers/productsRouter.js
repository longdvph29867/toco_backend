import { Router } from "express";
import { create, getAll, getDetail, remove, update } from "../Controllers/products.js";


const routerProducts = Router();

routerProducts.get('/', getAll)
routerProducts.get('/:slug', getDetail)
routerProducts.post('/', create)
routerProducts.put('/:id', update)
routerProducts.delete('/:id', remove)

export default routerProducts;