import slugify from "slugify";
import { subcategory as SubcategoryModel  } from "../../../database/models/subCategory.model.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getSingleOne } from "../../handler/handler.js";
import { ApiFeature } from "../../utils/apiFeatures.js";



//add subCategory
const addSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const subcategory = new SubcategoryModel(req.body);
  await subcategory.save();
  res.json({ message: "subcategory has been added", subcategory });
});



//get all subCategories
const getAllSubCategories = catchError(async (req, res, next) => {

  let filter = {};
  if(req.params.categoryID){
    filter.category=req.params.categoryID;
  }

  let apiFeature = new ApiFeature(SubcategoryModel.find(filter), req.query).fields().filter().sort().pagination().search();
  let subCategories = await apiFeature.mongooseQuery;
  !subCategories && res.status(404).json("No subcategory Found");
  subCategories && res.json({ message: "success", subCategories });
});



// get single subCategory
const getSingleSubCategory = getSingleOne(SubcategoryModel)



//update subCategory
const updateSubCategory = catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name);
  const subcategory = await SubcategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !subcategory && res.status(404).json("No subcategory Found");
  subcategory && res.json({ message: "success", subcategory });
});


//delete subCategory
const deleteSubCategory = deleteOne(SubcategoryModel)

export {
  addSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
