const Joi = require('joi');


exports.prodValidSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `Product name is required`,
    }),
    price: Joi.number().min(0).required().messages({
        "number.min": `Price must be greater than 1`,
        "number.base": `Price must be a number`,
        "any.required": `Price is required`,
    }),
    description: Joi.string().required().messages({
        "any.required": `Description is required`,
    }),
    quantity: Joi.number().min(0).required().messages({
        "number.min": `Quantity must be greater than or equal to 0`,
        "number.base": `Quantity must be a number`,
        "any.required": `Quantity is required`,
    }),
    CategoryId: Joi.number().min(0).required().messages({
        "number.min": `Category must be greater than or equal to 0`,
        "number.base": `Category must be a number`,
        "any.required": `Category is required`,
    }),
})
