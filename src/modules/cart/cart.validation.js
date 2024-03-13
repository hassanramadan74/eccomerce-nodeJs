import Joi from "joi";

const addToCartVal = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().options({ convert: false }),
});

const paramsVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateQTYVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().options({ convert: false }).required(),
});

export { addToCartVal, paramsVal, updateQTYVal };
