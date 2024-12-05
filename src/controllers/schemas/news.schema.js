import Joi from "joi";

export const newsCreateSpec = Joi.object({
  title: Joi.string().required(),
  sub_title: Joi.string().required(),
  id_user: Joi.number().required(),
  image: Joi.string().required(),
  text: Joi.string().required()
});

export const newsFindOneSpec = Joi.number().required();
