import { Router } from "express";
import { create, getAll, getDetail, remove, update } from "../Controllers/users.js";
import { checkPermission } from "../middlewares/checkPermission.js";


const routerUsers = Router();

routerUsers.get('/', getAll)
routerUsers.get('/:id', getDetail)
routerUsers.post('/', checkPermission, create)
routerUsers.put('/:id', checkPermission, update)
routerUsers.delete('/:id', checkPermission, remove)

export default routerUsers;