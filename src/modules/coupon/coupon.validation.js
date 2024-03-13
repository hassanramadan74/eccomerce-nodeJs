import Joi from "joi";

const addCouponVal = Joi.object({
  code: Joi.string().min(3).max(300).required().trim(),
  expires: Joi.date().required(),
  discount: Joi.number().min(0).required(),
});

const paramsVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateCouponVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  code: Joi.string().min(3).max(300).trim(),
  expires: Joi.date(),
  discount: Joi.number().min(0),
});

export { addCouponVal, paramsVal, updateCouponVal };
