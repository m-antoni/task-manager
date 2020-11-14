const Joi = require('joi');

// auth schema
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

// user schema
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.ref('password')
});


module.exports = {
    authSchema,
    userSchema
}