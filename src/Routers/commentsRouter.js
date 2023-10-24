import { Router } from "express";
import { create, createReply, getAllByProduct, remove, removeReply, update, updateReply } from "../Controllers/comments.js";
import { checkToken } from "../middlewares/checkPermission.js";

const routerComments = Router();

routerComments.get('/', getAllByProduct);

routerComments.post('/', checkToken, create);
routerComments.put('/:id', checkToken, update);
routerComments.delete('/:id', checkToken, remove);

routerComments.post('/:commentId/replies', checkToken, createReply);
routerComments.put('/:commentId/replies/:replyId', checkToken, updateReply);
routerComments.delete('/:commentId/replies/:replyId', checkToken, removeReply);

export default routerComments;