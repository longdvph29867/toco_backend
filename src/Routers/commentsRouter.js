import { Router } from "express";
import { create, createReply, getAllByProduct, remove, removeReply, update, updateReply } from "../Controllers/comments.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerComments = Router();

routerComments.get('/', getAllByProduct);

routerComments.post('/', checkPermission, create);
routerComments.put('/:id', update);
routerComments.delete('/:id', checkPermission, remove);

routerComments.post('/:commentId/replies', checkPermission, createReply);
routerComments.put('/:commentId/replies/:replyId', updateReply);
routerComments.delete('/:commentId/replies/:replyId', checkPermission, removeReply);

export default routerComments;