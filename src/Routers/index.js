import { Router } from "express";
import routerAuth from "./authRouter.js";
import routerCarts from "./cartsRouter.js";
import routerCategories from "./categoriesRouter.js";
import routerComments from "./commentsRouter.js";
import routerProducts from "./productsRouter.js";
import routerToppings from "./toppingsRouter.js";
import routerUsers from "./usersRouter.js";

const router = Router();

router.use('/categories', routerCategories);
router.use('/products', routerProducts);
router.use('/users', routerUsers);
router.use('/auth', routerAuth);
router.use('/toppings', routerToppings);
router.use('/carts', routerCarts);
router.use('/comments', routerComments);

export default router;