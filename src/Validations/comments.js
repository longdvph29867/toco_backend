import Joi from "joi";

export const commentValid = Joi.object({
    fullName: Joi.string().required().messages({
        "string.empty": "Tên người dùng không để trống!",
        "any.required": "Tên người dùng là bắt buộc!",
    }),
    id_product: Joi.string().required().messages({
        "string.empty": "Mã sản phẩm không để trống!",
        "any.required": "Mã sản phẩm là bắt buộc!",
    }),
    text: Joi.string().required().messages({
        "string.empty": "Nội dung không để trống!",
        "any.required": "Nội dung là bắt buộc!",
    }),

}).options({ abortEarly: false });

export const commentReplyValid = Joi.object({
    fullName: Joi.string().required().messages({
        "string.empty": "Tên người dùng không để trống!",
        "any.required": "Tên người dùng là bắt buộc!",
    }),
    text: Joi.string().required().messages({
        "string.empty": "Nội dung không để trống!",
        "any.required": "Nội dung là bắt buộc!",
    }),

}).options({ abortEarly: false });