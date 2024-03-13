import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getSingleOne } from "../../handler/handler.js";
import { ApiFeature } from "../../utils/apiFeatures.js";
import { reviewModel } from "../../../database/models/review.model.js";
import { AppError } from "../../utils/AppError.js";

//add review
const addReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  const isReviewExist = await reviewModel.findOne({user:req.user._id , product:req.body.product})
  if(isReviewExist) return next(new AppError('you have added review for this product before' , 403))
  const review = new reviewModel(req.body);
  await review.save();
  res.json({ message: "review has been added", review });
});

//get all subCategories
const getAllReviews = catchError(async (req, res, next) => {
  let apiFeature = new ApiFeature(reviewModel.find(), req.query)
    .fields()
    .filter()
    .sort()
    .pagination()
    .search();
  let reviews = await apiFeature.mongooseQuery;
  !reviews && res.status(404).json("No review Found");
  reviews && res.json({ message: "success", reviews });
});

// get single review
const getSingleReview = getSingleOne(reviewModel);

//update review
const updateReview = catchError(async (req, res, next) => {
  const review = await reviewModel.findOneAndUpdate({_id:req.params.id , user:req.user._id}, req.body, {
    new: true,
  });
  !review && res.status(404).json("No review Found");
  review && res.json({ message: "success", review });
});

//delete review
const deleteReview = deleteOne(reviewModel);

export {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
