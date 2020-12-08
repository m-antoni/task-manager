const Joi = require('joi');

// auth
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

// user
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string()
});

// create task
const createTaskSchema = Joi.object({
    title: Joi.string().max(50).required(),
    description: Joi.string().max(150).required(),
});

module.exports = {
    authSchema,
    userSchema,
    createTaskSchema
}