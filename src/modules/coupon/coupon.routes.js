import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controllers.js";
import {
  addCoupon,
  deleteCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
} from "./coupon.controller.js";
import {
  addCouponVal,
  paramsVal,
  updateCouponVal,
} from "./coupon.validation.js";

const couponRouter = express.Router();

// couponRouter.use(protectedRoutes,allowedTo('user' , 'admin')) for all couponRouter routes

couponRouter
  .route("/")
  .post(protectedRoutes,allowedTo('user' , 'admin'), validation(addCouponVal), addCoupon)
  .get(getAllCoupons);

couponRouter
  .route("/:id")
  .put(
    protectedRoutes
    ,allowedTo('user' , 'admin'),
    validation(updateCouponVal),
    updateCoupon
  )
  .delete(
    protectedRoutes,
    allowedTo("user", "admin"),
    validation(paramsVal),
    deleteCoupon
  )
  .get(validation(paramsVal), getSingleCoupon);

export default couponRouter;
