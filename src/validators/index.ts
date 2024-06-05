import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
});

export const postSchema = Joi.object({
  title: Joi.string().max(255).required(),
  body: Joi.string().required(),
  authorId: Joi.number().required(),
});