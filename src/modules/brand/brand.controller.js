import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { deleteOne, getSingleOne } from "../../handler/handler.js";
import { ApiFeature } from "../../utils/apiFeatures.js";


//add brand
const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename
  const brand = new brandModel(req.body);
  await brand.save();
  res.json({ message: "brand has been added", brand });
});


//get all Brands
const getAllBrands = catchError(async (req, res, next) => {
  let apiFeature = new ApiFeature(brandModel.find(), req.query).fields().filter().sort().pagination().search();
  let Brands = await apiFeature.mongooseQuery;
  !Brands && res.status(404).json("No Category Found");
  Brands && res.json({ message: "success", Brands });
});



// get single brand
const getSingleBrand = getSingleOne(brandModel)


//update brand
const updateBrand = catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name);
  if(req.file) req.body.logo = req.file.filename
  const brand = await brandModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !brand && res.status(404).json("No brand Found");
  brand && res.json({ message: "success", brand });
});

//delete brand
const deleteBrand = deleteOne(brandModel)

export {
  addBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
