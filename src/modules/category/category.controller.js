import slugify from "slugify";
import { categoryModel } from "../../../database/models/category.model.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getSingleOne } from "../../handler/handler.js";
import { ApiFeature } from "../../utils/apiFeatures.js";

const addCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename
  const category = new categoryModel(req.body);
  category.createdBy = req.user._id
  await category.save();
  res.json({ message: "category has been added", category });
});

//get all categories
const getAllCategories = catchError(async (req, res, next) => {
  let apiFeature = new ApiFeature(categoryModel.find(), req.query).fields().filter().sort().pagination().search();
  let categories = await apiFeature.mongooseQuery;
  !categories && res.status(404).json("No Category Found");
  categories && res.json({ message: "success", categories });
});

const getSingleCategory = getSingleOne(categoryModel)

//update category
const updateCategory = catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name);
  if(req.file) req.body.image = req.file.filename
  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !category && res.status(404).json("No Category Found");
  category && res.json({ message: "success", category });
});
//delete category
const deleteCategory = deleteOne(categoryModel)

export {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
