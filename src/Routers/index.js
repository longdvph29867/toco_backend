import { Router } from "express";
import routerCategories from "./categoriesRouter.js";
import routerProducts from "./productsRouter.js";

const router = Router();

router.use('/categories', routerCategories);
router.use('/products', routerProducts);

export default router;