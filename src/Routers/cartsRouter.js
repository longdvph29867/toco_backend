import { Router } from "express";
import { create, getAllByAccount, remove } from "../Controllers/carts.js";

const routerCarts = Router();

routerCarts.get('/:account', getAllByAccount);
routerCarts.post('/', create);
routerCarts.delete('/:id', remove);

export default routerCarts;