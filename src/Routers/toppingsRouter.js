import { Router } from "express";
import { create, getAll, getDetail, remove, update } from "../Controllers/toppings.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerToppings = Router();

routerToppings.get('/', getAll);
routerToppings.get('/:id', getDetail);
routerToppings.post('/', checkPermission, create);
routerToppings.put('/:id', checkPermission, update);
routerToppings.delete('/:id', checkPermission, remove);

export default routerToppings;