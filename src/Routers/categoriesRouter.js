import { Router } from "express";
import { create, getAll, getDetail } from "../Controllers/categories.js";

const routerCategories = Router();

routerCategories.get('/', getAll);
routerCategories.get('/:id', getDetail);
routerCategories.post('/', create);

export default routerCategories;