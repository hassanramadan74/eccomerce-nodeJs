import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { productModel } from "../../../database/models/product.model.js";
import { deleteOne, getSingleOne } from "../../handler/handler.js";
import { ApiFeature } from "../../utils/apiFeatures.js";


const addProduct = catchError(async (req, res, next) => {
  
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  const product = new productModel(req.body);
  product.createdBy=req.user._id;
  await product.save();
  res.json({ message: "product has been added", product });
});

//get all products
const getAllProducts = catchError(async (req, res, next) => {
  let apiFeature = new ApiFeature(productModel.find(), req.query).fields().filter().sort().pagination().search();
  let products = await apiFeature.mongooseQuery;
  !products && res.status(404).json("No product Found");
  products && res.json({ message: "success", products });
});

const getSingleProduct = getSingleOne(productModel);

//update product
const updateProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((img) => img.filename);
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !product && res.status(404).json("No product Found");
  product && res.json({ message: "success", product });
});
//delete product
const deleteProduct = deleteOne(productModel);

export {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
