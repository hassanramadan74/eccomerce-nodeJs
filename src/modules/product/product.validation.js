import Joi from "joi";

const addProductVal = Joi.object({
  title: Joi.string().min(2).max(200).required().trim(),
  description: Joi.string().min(10).max(2000).required().trim(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().positive().optional().min(0),
  quantity: Joi.number().positive().optional().min(0),
  category: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).optional(),

  imgCover: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/jpg")
          .required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
      })
    )
    .required(),


    images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/jpg")
          .required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
      })
    )
    .required(),




});

const paramsVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateProductVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(2).max(200).trim(),
  description: Joi.string().min(10).max(2000).trim(),
  price: Joi.number().min(0),
  priceAfterDiscount: Joi.number().positive().optional().min(0),
  quantity: Joi.number().positive().optional().min(0),
  category: Joi.string().hex().length(24),
  subcategory: Joi.string().hex().length(24),
  brand: Joi.string().hex().length(24),
  createdBy: Joi.string().hex().length(24).optional(),





  imgCover: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/jpg")
          .required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
      })
    ),
    images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/jpg")
          .required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
      })
    )
});

export { addProductVal, paramsVal, updateProductVal };
