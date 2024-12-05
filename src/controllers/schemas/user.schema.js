import Joi from "joi";

export const userCreateSpec = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.number().required()
});

export const userLoginSpec = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

export const userFindOneSpec = Joi.number().required();
