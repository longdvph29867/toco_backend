import { Router } from "express";
import { create, getAllByAccount, remove, updateQuantity } from "../Controllers/carts.js";

const routerCarts = Router();

routerCarts.get('/:account', getAllByAccount);
routerCarts.post('/', create);
routerCarts.delete('/:id', remove);
routerCarts.put('/:id', updateQuantity);

export default routerCarts;