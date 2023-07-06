const Joi = require('joi');


exports.regValidSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required().messages({
        "string.min": `Username should be at least 3 characters long`,
        "string.empty": `Username cannot be an empty field`,
        "any.required": `Username is a required field`,
    }),

    email: Joi.string().email().required().messages({
        "string.email": `Invalid email address`,
        "string.empty": `Email cannot be an empty field`,
        "any.required": `Email is a required field`,
    }),
    
    password: Joi.string().pattern(new RegExp('^[a-zA-z0-9]{8,30}$')).required().messages({
        "string.pattern.base": `Password must be at least 8 characters long, must contain at   least one uppercase letter, one lowercase letter and one number`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
     }),
})

exports.logValidSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": `Invalid email address`,
        "string.empty": `email cannot be an empty field`,
        "any.required": `email is a required field`,
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-z0-9]{8,30}$')).required().messages({
        "string.pattern.base": `Password must be at least 8 characters long, must contain at least one uppercase letter, one lowercase letter and one number`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
     }),
})