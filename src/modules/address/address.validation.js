import Joi from "joi";

const addAddressVal = Joi.object({
  street: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
});

const paramsVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateAddressVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  street: Joi.string().trim(),
  city: Joi.string().trim(),
  phone: Joi.string().trim(),
});

export { addAddressVal, paramsVal, updateAddressVal };
