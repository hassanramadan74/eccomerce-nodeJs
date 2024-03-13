import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getSingleOne } from "../../handler/handler.js";
import { ApiFeature } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { couponModel } from "../../../database/models/coupon.model.js";

//add coupon
const addCoupon = catchError(async (req, res, next) => {
  req.body.createdBy = req.user._id;

  const isCouponExist = await couponModel.findOne({ code: req.body.code });
  if (isCouponExist) return next(new AppError("coupon already exists", 403));

  const coupon = new couponModel(req.body);
  await coupon.save();
  res.json({ message: "Coupon has been added", coupon });
});

//get all coupons
const getAllCoupons = catchError(async (req, res, next) => {
  let apiFeature = new ApiFeature(couponModel.find(), req.query)
    .fields()
    .filter()
    .sort()
    .pagination()
    .search();
  let coupons = await apiFeature.mongooseQuery;
  !coupons && res.status(404).json("No Coupon Found");
  coupons && res.json({ message: "success", coupons });
});

// get single coupon
const getSingleCoupon = getSingleOne(couponModel);

//update coupon
const updateCoupon = catchError(async (req, res, next) => {
  const coupon = await couponModel.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  !coupon && res.status(404).json("No coupon Found");
  coupon && res.json({ message: "success", coupon });
});

//delete coupon
const deleteCoupon = deleteOne(couponModel);

export {
  addCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
