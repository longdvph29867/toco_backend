import Joi from "joi";

export const cartsValid = Joi.object({
    account: Joi.string().required().messages({
        "string.empty": "Tài khoản không để trống",
        "any.required": "Tài khoản là bắt buộc",
    }),
    id_product: Joi.string().required().messages({
        "string.empty": "Mã sản phẩm không để trống",
        "any.required": "Mã sản phẩm là bắt buộc",
    }),
    quantity: Joi.number().greater(0).required().messages({
        "number.empty": "Số lượng không được để trống!",
        "any.required": "Số lượng là bắt buộc!",
        'number.base': "Số lượng là số nguyên!",
        'number.greater': "Số lượng phải lớn 0!",
    }),
    id_topping: Joi.array().required().messages({
        "array.empty": "Topping không để trống!",
        "any.required": "Topping là bắt buộc!",
    }),
}).options({ abortEarly: false })

export const cartsQuantityValid = Joi.object({
    quantity: Joi.number().greater(0).required().messages({
        "number.empty": "Số lượng không được để trống!",
        "any.required": "Số lượng là bắt buộc!",
        'number.base': "Số lượng là số nguyên!",
        'number.greater': "Số lượng phải lớn 0!",
    }),
}).options({ abortEarly: false })