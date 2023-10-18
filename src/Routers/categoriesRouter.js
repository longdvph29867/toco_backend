import { Router } from "express";
import { getAll } from "../Controllers/categories.js";

const routerCategories = Router();

routerCategories.get('/', getAll);

export default routerCategories;