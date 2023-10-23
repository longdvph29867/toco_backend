import Joi from "joi";

export const toppingValid = Joi.object({
    toppingName: Joi.string().required().min(3).max(255).messages({
        "string.empty": "Tên topping không để trống",
        "any.required": "Tên topping là bắt buộc",
        "string.min": "Tên topping phải có ít nhất 3 ký tự",
        "string.max": "Tên topping phải có ít hơn 255 ký tự",
    }),
    toppingPrice: Joi.number().greater(0).required().messages({
        "number.empty": "Giá không được để trống!",
        "any.required": "Giá là bắt buộc!",
        'number.base': "Giá là số nguyên!",
        'number.greater': "Giá phải lớn 0!",
    }),
}).options({ abortEarly: false })