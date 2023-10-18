import { Router } from "express";
import routerCategories from "./categoriesRouter.js";

const router = Router();

router.use('/categories', routerCategories);

export default router;